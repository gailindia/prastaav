import { Component, ElementRef, ViewChild } from '@angular/core';
import { LoginService } from '../Services/Login.services';

@Component({
  selector: 'app-seeall',
  templateUrl: './seeall.component.html',
  styleUrl: './seeall.component.css'
})
export class SeeallComponent {
 
  items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6', 'Item 7', 'Item 8'];
  itemsTake : any;

  constructor(private loginService:LoginService){}

  showButton: boolean = false;

  ngOnInit():void {
    console.log("INSIDE SELL ALL");
    this.getAllSeeAll();
  
  }

  getAllSeeAll(){
    const data = {
      Mobile : `${localStorage.getItem("MobileNo")}`,
    };
    this.loginService.getSellAll(data).subscribe({
      next:(res)=>{
        this.itemsTake = res;
        console.log(res);
      },
      error: (e) => console.error(e)
    });
  }


// JavaScript code
changeText(service_id:any,index:any) {   
 this.showButton = !this.showButton;
 console.log(index);

 this.itemsTake[index].visibility = true;
 const data = {
  Serviceid : service_id,
};

 this.loginService.clickCount(data).subscribe({
  next:(res)=>{
      console.log(res);
  }
 })
}


joinService(SenderId:any, index:any){
  this.showButton = !this.showButton;
  this.itemsTake[index].visibility = true;
  const data = {
   SenderId : "",
  ReceiverId:SenderId,
  RequestType : "Requested",
  Status : "Send Invite",
 };

 console.log("DATA IN JOIN SERVICE",data);

this.loginService.joinServices(data).subscribe({
  next:(res)=>{
  console.log("Join Service",res);
  }
});
}
}


