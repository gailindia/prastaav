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
  
  constructor(private getServicesCart:LoginService,private router:Router){};

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
    this.reloadComponent();
    // Add your logic here to handle rejection
  }

  reloadComponent() {
    console.log('Pay to verify user:', this.router.url);
    let currentUrl = this.router.url;
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([`adminhome`]);
    }
  // Method to pay to verify user
  payToVerify(Service_id: any) {

    const data = {
      serviceid:Service_id
    }
    console.log('Pay to verify user:', data);
    this.getServicesCart.adminVerifiedService(data).subscribe({
      next:(res) => {
        console.log('Accepted USER:', res);
          this.reloadComponent();
      },error: (e) => console.error(e)
    })
  }
}