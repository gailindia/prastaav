import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  isLoggedIn :any;
    ngOnIt(){
      this.isLoggedIn = localStorage.getItem("IsLoogedIn");
    }


    checkOnEdit(){
      localStorage.setItem("isEditClick","false");
      localStorage.setItem("editValue","");
    }

  constructor(private router: Router) {}

  onCreateClicked(): void {
    // Perform any actions you want when the "Create" link is clicked
    console.log('Create link clicked!');
    // For example, navigate to the "create" route
    this.router.navigate(['create']);
  }
  


}
