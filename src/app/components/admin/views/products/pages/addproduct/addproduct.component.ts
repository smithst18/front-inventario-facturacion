import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductType } from 'src/app/models/productType';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { ProductTypeService } from 'src/app/services/product-type.service';
import { UserService } from 'src/app/services/userController';
import { SweetAlert } from 'src/app/services/alerts';
@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit, OnDestroy {
  public subscriptions:Subscription [] = [];
  public messageSuccess!:string;
  public messageError!:string;
  public token:string;
  public products:Product[] = [];
  public limit:number;
  public product!:Product;
  public productTypes:ProductType [] = [];
  public product_type:ProductType;
  constructor(
    private sweet:SweetAlert,
    private _userService:UserService,
    private _productService:ProductService,
    private _productTypeService:ProductTypeService,
  ) { 
    this.token = _userService.getToken();
    this.product = new Product(0,"",0,"",0,0,false,'',false,'','');
    this.product_type = new ProductType(0,"");
    this.limit = 0;
  }

  ngOnInit(): void {
    this.getProductFamily();
    this.allProducts();
  }
  ngOnDestroy():void{
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
  getProductFamily(){
    this.subscriptions.push(this._productTypeService.getTypes(this.token).subscribe(
      response=>{
        if(response){
          this.productTypes = response.product_types;
        }
      },
      err =>{
        console.log(err.error.message);
      }
    ));
  }

  addFamily(form:any){
    this.subscriptions.push(this._productTypeService.addType(this.token,this.product_type).subscribe(
      response =>{
        if(response.status = 200){
          //setear nuevamente el array de product types
          this.getProductFamily();
          this.messageSuccess = response.message;
          form.reset();
          this.messageError = '';
        }else{
          this.messageError = 'error';
          this.messageSuccess = '';
        }
      },
      err =>{
          this.messageError = "campo vacio o familia ya registrada";
          this.messageSuccess = '';
          console.error(err);
      }
    ));
  }
  addProduct(form:any){
    this.subscriptions.push(this._productService.add(this.product).subscribe(
      response =>{
        if(response){
          console.log(response.message);
          this.allProducts();
          this.sweet.PsavedAlert();
        }
      },
      err =>{
        if(err){
          if(err.error.message == "The Product is already registered"){
            this.sweet.PAlert();
          }else{
            this.sweet.PsavedErrorAlert();
            console.error(err);
          }
        }
      }
    ));
  }
  allProducts(){
    this.subscriptions.push(this._productService.all().subscribe(
      response =>{
        if(response.products.length > 5){
          //esta condicion permite cargar solamente los ultimos 5 productos registrados
          //la variable limit limita la cantidad de filas que se van a mostrar en la lista
          this.limit = response.products.length - 5;
        }
        if(response.products.length > 1){
          this.products = response.products;
        }
      },
      err =>{
        console.log(err);
      }
    ));
  }
}
