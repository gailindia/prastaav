import { Component } from '@angular/core';
import { Take, services } from '../models/take.model';
import { LoginService } from '../Services/Login.services';
import { Console } from 'console';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {

  work = false;
  onTakeServiceSubmit = false;
  isEditClicked = "false";

  serviceList:any;

  take : Take = {
    Serviceid:'',            
    Pincode : '',
    State:'',
    City:'',
    Area:'',
    S_Name:'',
    Gender :'',
    Age:'',
    Profession:'',
    Group:'',
    GenderS:'',
    AgeS:'',
    Experience:'',
    SpecialNote:'',
    DocLink:'',
    VideoLink:'',
    LocationLink:'',
    AnySpecialGroup :'',  
    Category: '',
    Charges_paid:0,
    MobileNo:localStorage.getItem("MobileNo")??""
  }
   
  constructor(private loginServices : LoginService){}

  onPincodeChange() {
    if (this.take.Pincode?.length === 6) { // Assuming pincode is a 6-digit number
      this.loginServices.getAreaAndCity(this.take.Pincode).subscribe({
        next:(res) => {
          console.log('Login service', res);
          this.take.Area = res[0]['PostOffice'][0]['BranchType']; // Assuming the API response contains area and city fields
          this.take.City = res[0]['PostOffice'][0]['Block']; 
          this.take.State = res[0]['PostOffice'][0]['State'];
          // this.loggedIn = true;
        },
        error: (e) => console.error(e)
      }
      );
    } else {
      this.take.Area = '';
      this.take.City = '';
    }
  }

  ngOnInit():void {
    this.isEditClicked = localStorage.getItem("isEditClick")??"false";
    console.log(this.isEditClicked);
 
    let s = localStorage.getItem("editValue")??"";
    let cat = localStorage.getItem("category")??'';
    const data = {
      Category : cat,
    };
    if(s.length>0){
      let retArray = JSON.parse(s);
      console.log("editform", retArray[0]);
      
      this.loginServices.getCategory(data).subscribe({
        next:(res)=>{
          this.serviceList = res;
          console.log('category', res);
        }
      })
      
      this.take = retArray[0];
    }else{
      localStorage.setItem("editValue","");
    this.loginServices.getServices().subscribe({

      next:(res)=>{
        console.log("res", res);
        this.serviceList = res;

      }
    })
  }  
  }

  selectedTeam = '';
  onSelected(value:string): void {this.selectedTeam = value;}

  onSubmitTakeService(){
    
    this.take.Category = this.selectedTeam;
    console.log(this.take);
    this.loginServices.postTakeServiceForm(this.take).subscribe({
      next:(res) => {
        // console.log('Take service', res);
        this.onTakeServiceSubmit = true;
        localStorage.setItem("editValue","");
      },
      error: (e) => console.error(e)
    });
  }




}
