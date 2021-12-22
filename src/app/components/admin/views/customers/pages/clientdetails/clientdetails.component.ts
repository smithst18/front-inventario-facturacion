import { Component, ViewEncapsulation, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
//models
import { Customer } from 'src/app/models/customer';
import { Payment } from 'src/app/models/payment';
//services
import { CustomerService } from 'src/app/services/customer.service';
import { SweetAlert } from 'src/app/services/alerts';
import { InvoiceService } from 'src/app/services/invoice.service';
import Swal from 'sweetalert2';
//material
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-clientdetails',
  templateUrl: './clientdetails.component.html',
  styleUrls: ['./clientdetails.component.css']
})
export class ClientdetailsComponent implements OnInit,OnDestroy {

  //properties
  public id!:any;
  public subscriptions:Subscription [] = [];
  //models
  public customer!:Customer;
  public payments:Payment[] = [];
  //material =>
  public displayedColumns: string[] = ['date', 'product_name', 'sub_total', 'total','status','confirm','details'];
  public dataSource!: MatTableDataSource<Payment>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  //material <=
  constructor(
    private router:Router,
    private _route:ActivatedRoute,
    private _customerService:CustomerService,
    private _invoiceService:InvoiceService,
    private sweet:SweetAlert,
  ) {

  }
  ngOnInit():void{
    this.getId();
    this.getCustomer();
    this.getInvoices();
  }
  ngOnDestroy():void{
    this.subscriptions.forEach(sub =>{ sub.unsubscribe() });
  }
  //get the customer's id from the route
  getId():void{
    this.subscriptions.push(this._route.params.subscribe(
      response=>{
        if(response.id) this.id = response.id;
      }, 
      err=>{
        console.error(err);
      }
    ));
  }
  //get the customer data
  getCustomer(){
    this.subscriptions.push(this._customerService.one(this.id).subscribe(
      response =>{
        if(response.customer) this.customer = response.customer;
      },
      err =>{
        console.error(err);
      }
    ));
  }
  //get invoices by user
  getInvoices(){
    this.subscriptions.push(this._invoiceService.allInvById(this.id).subscribe(
      response =>{
        if(response.payments.length > 0){
          this.payments = response.payments;
          this.dataSource = new MatTableDataSource(this.payments);
          this.dataSource.filterPredicate = (data: Payment, filter: string) => data.Product_Payments.map( (product)=> {
            return product.paidProduct.name
          }).includes(filter);
          this.dataSource.paginator = this.paginator;
        }
      },
      err =>{
        console.error(err);
      }
    ));
  }
  //  payment confirmation
  payConfirmation(payId:any){
    Swal.fire({
      title: 'Confirmar Pago ?',
      text: "No podras revertirlo despues!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.subscriptions.push(this._invoiceService.paymentConfirmation(payId).subscribe(
          response=>{
            if(response){
              Swal.fire(
                'Pagado!',
                'La Factura a sido confirmada como pagada.',
                'success'
              );
              this. getInvoices();
            }
          },
          err=>{
            if(err){
              Swal.fire(
                'Error!',
                'No se ha podido confirmar el pago.',
                'warning'
              );
            }
          }
        ));
      }
    });
  }
  /* qr card generathor*/
  CreateQr(){
    this.subscriptions.push(
      this._customerService.CreateQr(this.customer).subscribe(
        res =>{
          if(res){
            this.customer.qrcode = res.qrcode;
          }
        },
        err =>{ 
          console.error(err);
        }
      )
    );
  }
  /*mat filter*/
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
