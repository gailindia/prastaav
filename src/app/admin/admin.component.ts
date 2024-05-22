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
    this.loginService.sendAdminOTP(data).subscribe({
      next:  (res) => {
        console.log('Login service', this.mobileNumber);
        this.otpSent = true;
  
        localStorage.setItem('MobileNo', `${this.mobileNumber}`);
        // this.loggedIn = true;
      },
      
      error: (e) => alert("Please fill number")
    }
      // response => {
      //   // Handle response (e.g., display success message)
      //   console.log('OTP sent successfully');
      //   // Show OTP field after sending OTP
      //   this.otpSent = true;
      // },
      // error => {
      //   // Handle error (e.g., display error message)
      //   alert("Please fill number");
      //   console.error('Error sending OTP:', error);
      // }
    );
  }

  // login() {
  //   const data = {
  //     MobileNo : `${localStorage.getItem("MobileNo")}`,
  //     OTP:this.otp
  //   };
  //   // Verify OTP logic
  //   this.loginService.verifyOTP(data).subscribe(
  //     response => {
  //       // Handle response (e.g., navigate to admin page on success)
  //       console.log('OTP verification successful');
  //       alert("OTP sent successfully")
  //       this.router.navigate(['/admin']);
  //     },
  //     error => {
  //       // Handle error (e.g., display error message)
  //       console.error('Error verifying OTP:', error);
  //     }
  //   );
  // }

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