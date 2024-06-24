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
  popUpData:any;
  Receiver_Id:any;
  Mobile:any;


  constructor(private loginService:LoginService){}

  showButton: boolean = false;

  ngOnInit():void {
    console.log("INSIDE SELL ALL");
    this.getAllSeeAll();
    
    this.Mobile = `${localStorage.getItem("MobileNo")}`;
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

joinService(ReceiverId:any,SenderId:any,Category:any){
  this.showButton = !this.showButton;
  // this.itemsTake[index].visibility = true;
  const data = {
  ReceiverId:this.Receiver_Id,
  SenderId:SenderId,
  RequestType : "Requested",
  Status : "Send Invite",
  Mobile:`${localStorage.getItem("MobileNo")}`,
  Category:Category

 };

 console.log("DATA IN JOIN SERVICE",data);

this.loginService.joinServices(data).subscribe({
  next:(res)=>{
    alert(res["message"]);
  console.log("Join Service",res);
  }
});

}

getPopUpData(Serviceid:any,Category:any,index:any){
  this.itemsTake[index].visibility = true;
  this.Receiver_Id = Serviceid;
  const data = {
    Mobile:`${localStorage.getItem("MobileNo")}`,
    Category:Category
   };
  this.loginService.getPopUpData(data).subscribe({
    next:(res)=>{
      console.log("res.length",res.length);
      // if(res.length!=1){
        this.popUpData = res;
      // }else{
      
      // }
    }
  })
}

}


