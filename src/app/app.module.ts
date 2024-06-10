import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { provideHttpClient, withFetch } from "@angular/common/http";
import { VerifyOTPComponent } from './verify-otp/verify-otp.component';
import { HomeComponent } from './home/home.component';
import { CreateComponent } from './create/create.component';
import { CartComponent } from './cart/cart.component';
import { SeeallComponent } from './seeall/seeall.component';
import { HomeScreenComponent } from './home-screen/home-screen.component';
import { FormsModule } from '@angular/forms';
import { AdminComponent } from './admin/admin.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatDialogModule } from '@angular/material/dialog';
import { AdminhomeComponent } from './adminhome/adminhome.component';
import { AlertDialogComponent } from './alert-dialog/alert-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    VerifyOTPComponent,
    HomeComponent,
    CreateComponent,
    CartComponent,
    SeeallComponent,
    HomeScreenComponent,
    AdminComponent,
    HomeScreenComponent,
    AdminhomeComponent,
    AlertDialogComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule

  ],
  providers: [
    provideHttpClient(withFetch()),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  
}
