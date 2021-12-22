import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Subscription} from 'rxjs';
//MATERIAL 
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
//SERVICES
import { InvoiceService } from 'src/app/services/invoice.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
//models
import { Payment } from 'src/app/models/payment';
interface Earns {
  daysGain : number,
  monthGain : number
}
@Component({
  selector: 'app-paymentlist',
  templateUrl: './paymentlist.component.html',
  styleUrls: ['./paymentlist.component.css']
})
export class PaymentlistComponent implements OnInit,OnDestroy {
  public subscriptions:Subscription [] = [];
  public payments:Payment [] = [];
  public earns!:Earns;
  //material
  public displayedColumns: string[] = ['date','name', 'client_ci', 'products', 'sub_total','total','status','confirm','details'];
  public dataSource!: MatTableDataSource<Payment>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private _paymentService:InvoiceService,
    private _route:Router,
  ){
  }
  ngOnInit(): void {
    this.getPayments();
    this.getEarnings();
  }
  ngOnDestroy():void{
    this.subscriptions.forEach(sub=>{ sub.unsubscribe() });
  }
  getPayments(){
    this.subscriptions.push(this._paymentService.allInvoices().subscribe(
      response =>{
        if(response){
          this.payments = response.payments;
          this.dataSource = new MatTableDataSource(this.payments);
          this.dataSource.filterPredicate = (data: Payment, filter: string) => data.client.name.includes(filter);
          this.dataSource.paginator = this.paginator;
        }
      },
      err =>{ 
        console.error(err);
      }
    ));
  }
  getEarnings(){
    this.subscriptions.push(this._paymentService.earnings().subscribe(
      response =>{
        if(response){
          this.earns = response.earnings;
        }
      },
      err =>{
        console.error(err);
      }
    ));
  }
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
        this.subscriptions.push(this._paymentService.paymentConfirmation(payId).subscribe(
          response=>{
            if(response){
              Swal.fire(
                'Pagado!',
                'La Factura a sido confirmada como pagada.',
                'success'
              );
              this. getPayments();
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
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}