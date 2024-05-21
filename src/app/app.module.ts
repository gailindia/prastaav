import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { provideHttpClient, withFetch } from "@angular/common/http";
import { FormsModule } from '@angular/forms';
import { VerifyOTPComponent } from './verify-otp/verify-otp.component';
import { HomeComponent } from './home/home.component';
import { CreateComponent } from './create/create.component';
import { CartComponent } from './cart/cart.component';
import { SeeallComponent } from './seeall/seeall.component';
import { HomeScreenComponent } from './home-screen/home-screen.component';
import { AdminComponent } from './admin/admin.component';

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
    HomeScreenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}

