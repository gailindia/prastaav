import { Component } from '@angular/core';
import { Login } from '../models/login.model';
import { LoginService } from '../Services/Login.services';
import { Router } from '@angular/router';

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
isAdmin = false;


constructor(private loginService : LoginService, private router : Router){
}

// ngOnInit(){
//   localStorage.setItem("isLoggedIn","false");
// }
// isLoggedIn =  `${localStorage.getItem("isLoggedIn")}`;


sendOTP() : void{

  const data = {
    MobileNo : this.login.MobileNo,
  };

  this.loginService.sendOTP(data).subscribe({
    next: (res) => {
      console.log('Login service', this.login.MobileNo);
      this.Submitted = true;
      this.isAdmin = false;

      localStorage.setItem('MobileNo', `${this.login.MobileNo}`);
      // this.loggedIn = true;
    },
    
    error: (e) => alert("Please fill number")
  });
  

}
handleLinkClick() : void {
  this.isAdmin = true;
  this.router.navigate(['admin']);
}

}
