import { Component } from '@angular/core';

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

}
