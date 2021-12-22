import { Component, ViewChild, OnInit, OnDestroy  } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
//material 
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
//models
import { Product } from 'src/app/models/product';
import { Customer } from 'src/app/models/customer'
import { Invoice } from 'src/app/models/invoice';
//services
import { SweetAlert } from 'src/app/services/alerts';
import { ProductService } from 'src/app/services/product.service';
import { CustomerService } from 'src/app/services/customer.service';
import { InvoiceService } from 'src/app/services/invoice.service';
import { NotificationService } from 'src/app/services/notification.service';
@Component({
  selector: 'app-addpayment',
  templateUrl: './addpayment.component.html',
  styleUrls: ['./addpayment.component.css']
})
export class AddpaymentComponent implements OnInit,OnDestroy {
  public subscriptions:Subscription [] = [];
  public id:any;
  public customer!:Customer;
  button :boolean;
  public search:any;
  public searchProduct:any;
  //arrays
  public customers:Customer []=[];
  public products:Product []=[];
  public productsSelected:Product []=[];
  //objeto de ivoicessss
  public invoice:Invoice;
  constructor(
    private router:Router,
    private _route:ActivatedRoute,
    private sweet:SweetAlert,
    private _productService:ProductService,
    private _customerService:CustomerService,
    private _invoiceService:InvoiceService,
    private _notificationService:NotificationService
  ) {
    this.button = false;
    this.customer = new Customer (0,"","","","","","",false);
    //facturacion
    this.invoice = new Invoice(
      0,0,0,'','',
      //payment propertis
      {
        id:0,
        payment_type:'',
        iva:16,sub_total:0,
        total:0,status:false,
        createdAt:'',updatedAt:'',
        customer_id:0,
        client:{id:0,name:'',ci:'',email:'',phone_number:'',address:'',qrcode:'',active:false},
        Product_Payments:[],
      },
      []
    );
  }
  //material
  public displayedColumns: string[] = ['code', 'name', 'price', 'quantity','-'];
  public dataSource!: MatTableDataSource<Product>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  // <== material

  ngOnInit(): void {
    this.getId();
    this.getCustomer();
  }
  ngOnDestroy(): void{
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
  //coming from qr
  getId():void{
    this.subscriptions.push(this._route.params.subscribe(
      response=>{
        if(response){ 
          this.id = response.id;
        }
      }, 
      err=>{
        console.log(err);
      }
    ));
  }
  //get the customer if the id ! undefined
  getCustomer(){
    if (this.id && this.id != undefined){
      console.log(this.id)
      this.subscriptions.push(this._customerService.one(this.id).subscribe(
        response =>{
          if(response.customer){
            this.customer = response.customer;
            this.button = true;
          }
        },
        err =>{
          console.log(err);
        }
      ));
    }
  }
  //finders para botones <======================================================
  serchCustomer(){
    this.subscriptions.push(this._customerService.search(this.search).subscribe(
      response =>{
        if(response.customers) this.customers = response.customers;
      },
      err =>{
        console.log("any customer found");
      }
    ));
  }
  serchProduct(){
    this.subscriptions.push(this._productService.search(this.searchProduct).subscribe(
      response =>{
        if(response){
          this.products = response.products;
        }
      },
      err =>{
        console.log("any product found");
      }
    ));
  }
  //=========================================================================>
  //add items to product list // customer to form<==========
  addProductToList(product:any){
    let addProduct = this.productsSelected.findIndex(
      selec => selec.product_code === product.product_code
    );
    //if the product is not listed we add it to list 
    if(addProduct === -1){
      product.product_quantity = 1;

      this.productsSelected.push(product);
      this.dataSource = new MatTableDataSource(this.productsSelected);
      this.dataSource.paginator = this.paginator;
    }else this.sweet.badsearch();
  }
  removeFromList(position:any){
    //find the product position
    //remove that position from the list
    this.productsSelected.splice(position,1);
    //set data source and paginator
    this.dataSource = new MatTableDataSource(this.productsSelected);
    this.dataSource.paginator = this.paginator;
  }
  //customer
  addCustomer(customer:any){
    this.customer = customer;
  }
  //add items to list ==========> 
  //facturation
  addpayment(){
    Swal.fire({
      title: 'Estas Seguro ?',
      text: "No podras modificar la factura si continuas",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'rgb(0, 128, 0)',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Guardar'
    }).then((result) => {
      if (result.isConfirmed) {
        //set object
        this.invoice.payment.customer_id = this.customer.id;
        this.invoice.products = this.productsSelected.slice();
        //http request
        this.subscriptions.push(this._invoiceService.add(this.invoice).subscribe(
          response =>{
            if(response){
              Swal.fire(
                'Guardado!',
                'La Factura se ha Guardado Correctamente.',
                'success'
              );
              //setear la tabla 
              this.productsSelected = [];
              //this._notificationService.getAll();
              this.dataSource = new MatTableDataSource(this.productsSelected);
              this.dataSource.paginator = this.paginator;
            }
          },
          err =>{
            if(err){
            Swal.fire(
              `${err.error.message}`,
              `La Factura no se ha podido Guardar.`,
              'warning'
            );
          }
          }
        ));
      }
    });
  }
}
