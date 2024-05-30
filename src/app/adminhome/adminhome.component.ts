import { Component } from '@angular/core';
 
@Component({
  selector: 'app-adminhome',
  templateUrl: './adminhome.component.html',
  styleUrl: './adminhome.component.css'
})
export class AdminhomeComponent {
 
  users = [
    { id: 1, name: 'John Doe', Gender: 'M', age: 30, Profession: "Developer", Pincode: 110025, Service: "Give",Country: "India",City: "Delhi",Area: "Delhi",State: "Delhi",SpecialNote: "Test",DocLink:"Test",LocationLink:"test",AnySpecialGroup:"Test"},
    { id: 2, name: 'Jane Smith', Gender: 'M', age: 25,Profession: "Developer", Pincode: 110025, Service: "Give",Country: "India",City: "Delhi",Area: "Delhi",State: "Delhi",SpecialNote: "Test",DocLink:"Test",LocationLink:"test",AnySpecialGroup:"Test"},
    { id: 3, name: 'Alice Johnson', Gender: 'F', age: 35,Profession: "Developer", Pincode: 110025, Service: "Give",Country: "India",City: "Delhi",Area: "Delhi",State: "Delhi",SpecialNote: "Test",DocLink:"Test",LocationLink:"test",AnySpecialGroup:"Test"},
    // Add more data as needed
  ];
 
  rejectUser(user: any) {
    console.log('User rejected:', user);
    // Add your logic here to handle rejection
  }
 
  // Method to pay to verify user
  payToVerify(user: any) {
    console.log('Pay to verify user:', user);
    // Add your logic here to handle payment
  }
  
}