import { Component, ViewChild , OnInit, OnDestroy,DoCheck } from '@angular/core';
import { BarcodeFormat } from '@zxing/library';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
//material
import { MatProgressSpinner } from '@angular/material/progress-spinner'; 
//services
import { SweetAlert } from 'src/app/services/alerts';
import { CustomerService } from 'src/app/services/customer.service';
//models
import { Customer } from 'src/app/models/customer';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.css']
})
export class ActivateComponent implements OnInit, OnDestroy {
  //propertys
  qrstring!:string;
  public pageName!:string;
  public loader:Boolean;
  public customer:Customer;
  public subscriptions: Subscription [] = [];
  //qr scan
  allowedFormats = [ BarcodeFormat.QR_CODE ];
  @ViewChild('scanner', { static: false })
  scanner!: ZXingScannerComponent;
  constructor(
    private sweet: SweetAlert,
    private _customerService:CustomerService,
    private _router:Router,
  ) {
    this.loader = true;
    this.customer = new Customer(0,'','','','','','',false)
   }
  ngOnInit(): void {
    if(this._router.url == '/user/scan/activate-customer'){
      this.pageName = "Activar Usuario";
    }else if(this._router.url == '/user/scan/scan-to-pay'){
      this.pageName = "Generar Factura";
    }
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach( sub => {sub.unsubscribe(); });
  }
  //se ejecuta una funcion en base a la url activada 
  scanSuccess(qrstring:string){
    if(this._router.url == '/user/scan/activate-customer'){
      this.pageName = "Activar Usuario";
      this.activateUser(qrstring);
    }else if(this._router.url == '/user/scan/scan-to-pay'){
      this.pageName = "Activar Usuario"
      this.payment(qrstring);
    }
  }
  //si viene de la ruta de activar va a activar al usuario en la base de datos 
  activateUser(qrstring:any){
    this.customer = JSON.parse(qrstring);
    this.loader = false;
    this.subscriptions.push(
      this._customerService.activate(this.customer.id).subscribe(
        res =>{
          if(res){
            this.sweet.QRCoK('activado');
            setTimeout(() =>{
              this._router.navigateByUrl('user/home');
            },3000);
          }
        },
        err =>{
          if(err){
            if(err.status == 400){
              this._customerService.desactivate(this.customer.id).subscribe(
                res =>{
                  if(res){
                    this.sweet.QRCoK('desactivado');
                    setTimeout(() =>{
                      this._router.navigateByUrl('user/home');
                    },3000);
                  }
                },
                err =>{
                  this.sweet.QRCError();
                }
              );
            }else {
              this.sweet.QRCError();
            }
          }
        }
      )
    );
  }
  //si viene de la ruta de pago ira a la interface de pago
  payment(qrstring:any){
    this.customer = JSON.parse(qrstring);
    this.loader = false;
    this._router.navigateByUrl(`user/scan/payByScan/paymentScan/add/${this.customer.id}`);
  }
  scanError(scan:any){
    console.log(scan);
  }
}
