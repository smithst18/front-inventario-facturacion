import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Subscription} from 'rxjs';
//MATERIAL 
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
//SERVICES
import { CustomerService } from 'src/app/services/customer.service';
import { Router } from '@angular/router';
//models
import { Customer } from 'src/app/models/customer';
@Component({
  selector: 'app-clientlist',
  templateUrl: './clientlist.component.html',
  styleUrls: ['./clientlist.component.css']
})
export class ClientlistComponent implements OnInit, OnDestroy {
  public subscriptions:Subscription [] = [];
  public displayedColumns: string[] = ['name', 'ci', 'email', 'phone_number', 'status'];
  public dataSource!: MatTableDataSource<Customer>;
  public customers:Customer [] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _customerService:CustomerService,
    private _route:Router,
  ){
    //ASDASD
  }
  ngOnInit(): void {
    this.getCustomers();
  }
  ngOnDestroy():void{
    this.subscriptions.forEach(sub=>{ sub.unsubscribe() });
  }

  getCustomers(){
    this.subscriptions.push(this._customerService.all().subscribe(
      response =>{
        this.customers = response.customers;
        this.dataSource = new MatTableDataSource(this.customers);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      err =>{
        console.error(err);
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
    this._route.navigateByUrl(`/admin/customers/details/${row}`);
  }
}
