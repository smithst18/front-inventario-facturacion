import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
//models
import { Customer } from 'src/app/models/customer';
//services
import { CustomerService } from 'src/app/services/customer.service';
import { SweetAlert } from 'src/app/services/alerts';
//angular
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit,OnDestroy {
  public subscriptions:Subscription [] = [];
  public customer:Customer;
  public customers:Customer [] = [];
  public showAlert:boolean;
  public limit: number;
  constructor(
    private _customerService:CustomerService,
    private sweet:SweetAlert,
  ){ 
    this.customer = new Customer (0,"","","","","","",false);
    this.showAlert = false;
    this.limit = 0;
  }
  ngOnInit(): void {
    this.allCustomers()
  }
  ngOnDestroy():void{
    this.subscriptions.forEach( sub => sub.unsubscribe());
  }

  saveCustomer(form:any){
    this.subscriptions.push(this._customerService.save(this.customer).subscribe(
      response =>{
        if(response){
          this.sweet.savedCustomer();
          this.showAlert = false;
          form.reset();
          this.allCustomers();
        }
      },
      error =>{
        if(error){
          if(error.error.message == "the customer is already registered"){
            this.sweet.errorCustomer();
          }
          if(error.error.err.name == "SequelizeValidationError"){
            this.showAlert = true;
            this.sweet.badDataCustomer();
          }
        }
      }
    ));
  }

  allCustomers(){
    this.subscriptions.push(this._customerService.all().subscribe(
      response =>{
        if(response.customers.length > 5){
          //esta condicion permite cargar solamente los ultimos 5 productos registrados
          //la variable limit limita la cantidad de filas que se van a mostrar en la lista
          this.limit = response.customers.length - 5;
        }
        if(response.customers.length > 1){
          this.customers = response.customers;
        }
      },
      err =>{
        console.log(err)
      }
    ));
  }
}
