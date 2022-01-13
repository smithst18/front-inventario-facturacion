import { Component, ViewEncapsulation, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
//models
import { Product } from 'src/app/models/product';
import { StockMove } from 'src/app/models/stockMove';
import { User } from 'src/app/models/user';
import { Notification } from 'src/app/models/notification';
//services
import { ProductService } from 'src/app/services/product.service';
import { StockService } from 'src/app/services/stock.service';
import { UserService } from 'src/app/services/userController';
import { NotificationService } from 'src/app/services/notification.service';
import { SweetAlert } from 'src/app/services/alerts';
import { SocketService } from 'src/app/services/socket.service';
//material
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
  encapsulation : ViewEncapsulation.None,
})
export class DetailsComponent implements OnInit,OnDestroy {
  //properties
  public errorAlert:boolean;
  public id!:any;
  public subscriptions:Subscription [] = [];
  //models
  product!:Product;
  stockMove:StockMove;
  stockMoves:StockMove [] = [];
  user:User;
  notification:Notification;
  //material =>
  public displayedColumns: string[] = ['createdAt', 'operation', 'move_quantity', 'description', 'user_name'];
  public dataSource!: MatTableDataSource<StockMove>;
  public products:Product [] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  //material <=
  constructor(
    private socket: SocketService,
    private router:Router,
    private _route:ActivatedRoute,
    private _productService:ProductService,
    private _stockService:StockService,
    private _userService:UserService,
    private _notificationService:NotificationService,
    private sweet:SweetAlert,
  ) { 
    this.stockMove = new StockMove(0,"increment",1,"",0,0,"","","","");
    this.user = this._userService.getIdentity();
    this.errorAlert = false;
    this.notification = new Notification(0,5,false,0,false,
      {id:0,name:'',price:0,product_code:'',product_quantity:0,product_family:0,active_notification:false,family:'',notification:false,createdAt:'',updatedAt:''}
      ,"","");
  }

  ngOnInit(): void {
    //esto para que en seleccion de la misma ruta con distinta id si cambie la informacion
    //relacion a los ciclos de vida de angular (recordar)
      this.subscriptions.push(
        this._route.params.subscribe(
        (params) => {
          this.getId();
          this.getOneProduct();
          this.getStockMoves();
        }
      )
    );
  }
  ngOnDestroy(): void{
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
  //data del producto
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
  getOneProduct(){
    this.subscriptions.push(this._productService.getOne(this.id).subscribe(
      response =>{
        if(response.product){
          this.product = response.product;
        }
      },
      err =>{
        console.error(err.error.message)
        this.router.navigateByUrl("/admin/products/list");
      }
    ));
  }
  //movimientos de stock
  getStockMoves(){
    this.subscriptions.push(this._stockService.getAllByProduct(this.id).subscribe(
      response =>{
        if(response){
          //cargar data a la tabla 
          this.stockMoves = response.stockMoves;
          this.dataSource = new MatTableDataSource(this.stockMoves);
          this.dataSource.paginator = this.paginator;
        }
      },
      err =>{
        console.error(err.error.message);
      }
    ));
  }
  saveStockMove(form:any){
    this.stockMove.product_id = this.product.id ;
    this.stockMove.user_id = this.user.id;

    this.subscriptions.push(this._stockService.operation(this.stockMove).subscribe(
      response=>{
        if(response){
          //si ok guardar el movimiento de stock en base de datos 
          this._stockService.saveMove(this.stockMove).subscribe(
            response =>{
              if(response){
                this.getStockMoves();
                if(this.product.active_notification == true){
                  this.desacNotification(false);
                }
                form.reset();
                this.sweet.stockMoveOk();
                this.errorAlert = false;
              }
            },
            err =>{
              console.error(err.error.message);
              this.errorAlert = true;
            }
          );
          //resetear valores en vista
          this.getOneProduct();
        }
      },
      err =>{
        console.error(err.error.message);
        this.errorAlert = true;
      }
    ));
  }
  //gestion de notificaciones 
  //activar notificacion
  activNotification(){
    this.notification.desactive = false;
    this.notification.product_id = this.id;
    this.subscriptions.push(this._notificationService.set(this.notification).subscribe(
      response =>{
        if(response){
          this.sweet.activeNotification();
          this.getOneProduct();
        }
      },
      error =>{
        console.error(error);
      }
    ));
  }
  //desactivar notificacion
  desacNotification(showSweet:boolean = true){
    this.notification.desactive = true;
    this.notification.product_id = this.id;
    this.subscriptions.push(this._notificationService.set(this.notification).subscribe(
      response =>{
        if(response){
          if(showSweet == true) this.sweet.desactiveNotification();
          this.getOneProduct();
          this.socket.emitEvent();
        }
      },
      error =>{
        console.error(error);
      }
    ));
  }
  //material
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}