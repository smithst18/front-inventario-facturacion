import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SesionAlertComponent } from './sesion-alert.component';




@NgModule({
  declarations: [
    SesionAlertComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[SesionAlertComponent]
})
export class SesionModule { }