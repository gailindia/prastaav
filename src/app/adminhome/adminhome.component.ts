import { Component } from '@angular/core';
import { LoginService } from '../Services/Login.services';
import { Router } from '@angular/router';
import { Take } from '../models/take.model';

@Component({
  selector: 'app-adminhome',
  templateUrl: './adminhome.component.html',
  styleUrl: './adminhome.component.css'
})
export class AdminhomeComponent {
  users: Take[] = [];
  

  // users = [
  //   { id: 1, name: 'John Doe', Gender: 'M', age: 30, Profession: "Developer", Pincode: 110025, Service: "Give",Country: "India",City: "Delhi",Area: "Delhi",State: "Delhi",SpecialNote: "Test",DocLink:"Test",LocationLink:"test",AnySpecialGroup:"Test"},
  //   { id: 2, name: 'Jane Smith', Gender: 'M', age: 25,Profession: "Developer", Pincode: 110025, Service: "Give",Country: "India",City: "Delhi",Area: "Delhi",State: "Delhi",SpecialNote: "Test",DocLink:"Test",LocationLink:"test",AnySpecialGroup:"Test"},
  //   { id: 3, name: 'Alice Johnson', Gender: 'F', age: 35,Profession: "Developer", Pincode: 110025, Service: "Give",Country: "India",City: "Delhi",Area: "Delhi",State: "Delhi",SpecialNote: "Test",DocLink:"Test",LocationLink:"test",AnySpecialGroup:"Test"},
  //   // Add more data as needed
  // ];
  constructor(private getServicesCart:LoginService,private router:Router,){};
  showDialog = false;
  alertMessage = 'This is an alert message!';

  openAlertDialog() {
    this.showDialog = true;
  }

  closeAlertDialog() {
    this.showDialog = false;
  }
  ngOnInit(): void {
    this.getAdminHomeList();
    
  }
  getAdminHomeList(){
    this.getServicesCart.adminhometabledata().subscribe({
      next:(res) => {
        console.log('cart service', res);
        this.users = res;
      },
      error: (e) => console.error(e)
    });
  }

  rejectUser(user: any) {
    console.log('User rejected:', user);

    const data = {
      serviceid : user.serviceid,
    };
    console.log(data);
    this.getServicesCart.adminReject(data).subscribe({
      next:  (res) => {
        console.log("RES::",res);
        // this.reloadComponent();
        this.reloadPage();
        
        // this.loggedIn = true;
      },
     
      error: (e) => console.error(e)
    }
    );
    // Add your logic here to handle rejection
  }
 
  // Method to pay to verify user
  payToVerify(user: any) {
    console.log('Pay to verify user:', user);
    const data = {
      serviceid : user,
    };
    console.log(data);
    this.getServicesCart.adminVerify(data).subscribe({
      next:  (res) => {
        console.log("RES::",res);
        this.reloadPage();
        // this.reloadComponent();
        
        // this.loggedIn = true;
      },
     
      error: (e) => console.error(e)
    }
    );
    // Add your logic here to handle payment
  }


  reloadComponent() {
    let currentUrl = this.router.url;
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([`adminhome`]);
    }

    reloadPage() {
      window.location.reload();
    }

  
}
