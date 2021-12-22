import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScanRoutingModule } from './scan-routing.module';
import { ActivateComponent } from './pages/activate/activate.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { MaterialModule } from 'src/app/material.module';


@NgModule({
  declarations: [
    ActivateComponent,
  ],
  imports: [
    CommonModule,
    ScanRoutingModule,
    ZXingScannerModule,
    MaterialModule
  ]
})
export class ScanModule { }
