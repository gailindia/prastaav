import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { VerifyOTPComponent } from './verify-otp/verify-otp.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path: '', redirectTo : 'Login', pathMatch : 'full'},
  {path: 'Login', component: LoginComponent},
  {path: 'VerifyOTP', component: VerifyOTPComponent},
  {path: 'Home', component: HomeComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
