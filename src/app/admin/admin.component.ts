import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../Services/Login.services';
import { Login } from '../models/login.model';
 
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  mobileNumber: string = '';
  otp: string = '';
  verifyotp = false;
  otpSent: boolean = false; // Flag to control OTP field visibility
  loginn: Login = {
    MobileNo: ''
  };
 
 
 
  constructor(private loginService : LoginService,private router: Router) { }
 
 
 
  sendOtp() {
    const data = {
      MobileNo : this.mobileNumber,
    };
    console.log(data);
    this.loginService.sendAdminOTP(data).subscribe({
      next:  (res) => {
        console.log("RES::",res);
        console.log('Login service', this.mobileNumber);
        this.otpSent = true;
  
        localStorage.setItem('MobileNo', `${this.mobileNumber}`);
        // this.loggedIn = true;
      },
      
      error: (e) => console.error(e)
    }
    );
  }
 
 
  login() : void{
    const data = {
      MobileNo : `${localStorage.getItem("MobileNo")}`,
      OTP:this.otp
    };
  
    this.loginService.adminverifyOTP(data).subscribe({
      next: (res) => {
        this.verifyotp = true;
        
        console.log('OTP Verified Successfully');
        localStorage.setItem("IsLoogedIn",'true');
       this.router.navigate([`adminhome`]);
        
      },
      error: (e) => console.error(e)
    });
  
  }
}
