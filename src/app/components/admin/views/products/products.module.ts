import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
//components 
import { ProductsRoutingModule } from './products-routing.module';
import { AddproductComponent } from './pages/addproduct/addproduct.component';
import { DetailsComponent } from './pages/details/details.component';
import { ListComponent } from './pages/list/list.component';
//material
import { MaterialModule } from 'src/app/material.module';

@NgModule({
  declarations: [
    AddproductComponent,
    ListComponent,
    DetailsComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    FormsModule,
    MaterialModule
  ],
})
export class ProductsModule { }
