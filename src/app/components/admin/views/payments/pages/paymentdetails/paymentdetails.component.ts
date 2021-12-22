import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
//models
import { Payment } from 'src/app/models/payment';
//services
import { InvoiceService } from 'src/app/services/invoice.service';
@Component({
  selector: 'app-paymentdetails',
  templateUrl: './paymentdetails.component.html',
  styleUrls: ['./paymentdetails.component.css']
})
export class PaymentdetailsComponent implements OnInit,OnDestroy {
  //models
  public payment!:Payment;
  //parameters
  subscriptions : Subscription [] = [];
  id!:number;
  constructor(
    private _invoiceService:InvoiceService,
    private _activeRouter:ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.getId();
    this.getInvoice();
  }
  ngOnDestroy():void{
    this.subscriptions.forEach( sub =>{ sub.unsubscribe() } );
  }
  getId():void{
    this.subscriptions.push(this._activeRouter.params.subscribe(
      response=>{
        if(response.id) this.id = response.id;
      }, 
      err=>{
        console.log(err);
      }
    ));
  }
  getInvoice(){
    this.subscriptions.push(
      this._invoiceService.oneInvById(this.id).subscribe(
        response =>{
          if(response && response != null && response != undefined){
            this.payment = response.payment;
          }
        },
        err =>{
          console.error(err);
        }
      )
    )
  }
}
