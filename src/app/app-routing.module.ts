import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { VerifyOTPComponent } from './verify-otp/verify-otp.component';
import { HomeComponent } from './home/home.component';
import { CreateComponent } from './create/create.component';
import { CartComponent } from './cart/cart.component';
import { SeeallComponent } from './seeall/seeall.component';
import { HomeScreenComponent } from './home-screen/home-screen.component';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
  {path: '', redirectTo : 'Login', pathMatch : 'full'},
  {path: 'Login', component: LoginComponent},
  {path: 'VerifyOTP', component: VerifyOTPComponent},
  {path: 'Home', component: HomeComponent},
  {path: 'create', component: CreateComponent},
  {path: 'seeAll', component: SeeallComponent},
  {path: 'cart', component: CartComponent},
  {path: 'homeScreen', component: HomeScreenComponent},
  {path: 'admin', component: AdminComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
