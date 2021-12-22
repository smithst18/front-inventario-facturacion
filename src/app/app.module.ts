import { NgModule , LOCALE_ID} from '@angular/core';//date en espa;ol
import { BrowserModule } from '@angular/platform-browser';
//formularios y http
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
//app.component
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//components
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
//servides
import { SweetAlert } from './services/alerts';
import { UserService } from 'src/app/services/userController';
//material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
//ESP;OL
import localEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { ScanModule } from './components/user/views/scan/scan.module';

registerLocaleData(localEs, 'es');
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    ScanModule,
  ],
  providers: [SweetAlert,UserService,{provide:LOCALE_ID,useValue:'es'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
