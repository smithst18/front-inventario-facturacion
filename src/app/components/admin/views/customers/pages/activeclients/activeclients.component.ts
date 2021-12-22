import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Subscription} from 'rxjs';
//MATERIAL 
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
//SERVICES
import { CustomerService } from 'src/app/services/customer.service';
import { Router } from '@angular/router';
import { SweetAlert } from 'src/app/services/alerts';
//models
import { Customer } from 'src/app/models/customer';
@Component({
  selector: 'app-activeclients',
  templateUrl: './activeclients.component.html',
  styleUrls: ['./activeclients.component.css']
})
export class ActiveclientsComponent implements OnInit {
  public subscriptions:Subscription [] = [];
  public displayedColumns: string[] = ['name', 'ci', 'email', 'phone_number', 'active','deactivate','details'];
  public dataSource!: MatTableDataSource<Customer>;
  public customers:Customer [] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private _customerService:CustomerService,
    private _route:Router,
    private sweet:SweetAlert,
  ){
    //ASDASD
  }
  ngOnInit(): void {
    this.getActives();
  }
  ngOnDestroy():void{
    this.subscriptions.forEach(sub=>{ sub.unsubscribe() });
  }
  getActives(){
    this.subscriptions.push(this._customerService.allActives().subscribe(
      response =>{
        if(response.customers){
          this.customers = response.customers;
          this.dataSource = new MatTableDataSource(this.customers);
          this.dataSource.paginator = this.paginator;
        }
      },
      err =>{
        console.error(err);
      }
    ));
  }
  desactiveCustomer(id:any){
    this.subscriptions.push(this._customerService.desactivate(id).subscribe(
      response =>{
        if(response){
          this.sweet.statusChanged();
          this.getActives();
        }
      },
      err =>{
        console.error(err);
        this.getActives();
      }
    ));
  }
  details(row:any){
    console.log(row);
    this._route.navigateByUrl(`/admin/customers/details/${row}`);
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
