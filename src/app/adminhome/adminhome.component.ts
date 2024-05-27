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
    // Add your logic here to handle rejection
  }

  // Method to pay to verify user
  payToVerify(Service_id: any) {
    console.log('Pay to verify user:', Service_id);
    const data = {
      serviceid:Service_id
    }
    this.getServicesCart.adminVerifiedService(data).subscribe({
      next:(res) => {

      },error: (e) => console.error(e)
    })
  }

  
}
