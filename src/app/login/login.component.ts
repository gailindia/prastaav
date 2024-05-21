import { Component } from '@angular/core';
import { Login } from '../models/login.model';
import { LoginService } from '../Services/Login.services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {

login: Login = {
  MobileNo: ''
};

Submitted = false;

constructor(private loginService : LoginService){
}
// ngOnInit(){
//   localStorage.setItem("isLoggedIn","false");
// }
// isLoggedIn =  `${localStorage.getItem("isLoggedIn")}`;


sendOTP() : void{
  const data = {
    MobileNo : this.login.MobileNo,
  };
  this.Submitted = true;
  
  // this.loginService.sendOTP(data).subscribe({
  //   next: (res) => {
  //     console.log('Login service', this.login.MobileNo);
  //     this.Submitted = true;

  //     localStorage.setItem('MobileNo', `${this.login.MobileNo}`);
  //     // this.loggedIn = true;
  //   },
  //   error: (e) => console.error(e)
  // });
  

}

}
