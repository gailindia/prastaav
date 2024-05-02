import { Component } from '@angular/core';
import { Login } from '../models/login.model';
import { LoginService } from '../Services/Login.services';

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrl: './verify-otp.component.css'
})
export class VerifyOTPComponent {
login : Login = {
MobileNo : '',
OTP : ''
};

Submitted = false;

constructor(private loginService : LoginService){}


mob =  `${localStorage.getItem("MobileNo")}`;

verifyOTP() : void{
  const data = {
    MobileNo : `${localStorage.getItem("MobileNo")}`,
    OTP:this.login.OTP
  };

  this.loginService.verifyOTP(data).subscribe({
    next: (res) => {
      
      console.log('OTP Verified Successfully');
      this.Submitted = true;
    },
    error: (e) => console.error(e)
  });

}


}
