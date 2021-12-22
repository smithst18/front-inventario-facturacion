import { Component, OnInit, AfterViewInit, ViewChild,OnDestroy} from '@angular/core';
import { Subscription} from 'rxjs';
//MATERIAL 
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
//providers
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
//models
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListComponent implements OnInit, AfterViewInit,OnDestroy{
  //material
  public subscriptions:Subscription [] = [];
  public displayedColumns: string[] = ['product_code', 'name', 'price', 'stock', 'family'];
  public dataSource!: MatTableDataSource<Product>;
  public products:Product [] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _productService:ProductService,
    private _route:Router,
  ) {
  }

  ngOnInit(): void {
    this.getProducts();
  }
  ngAfterViewInit():void {
  }
  ngOnDestroy():void{
    this.subscriptions.forEach(sub=>{sub.unsubscribe();});
  }

  getProducts(){
    this.subscriptions.push(this._productService.all().subscribe(
      response =>{
        this.products = response.products;
        this.dataSource = new MatTableDataSource(this.products);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      err =>{
        console.log(err);
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
  details(row:any){
    this._route.navigateByUrl(`/admin/products/details/${row}`);
  }
}

