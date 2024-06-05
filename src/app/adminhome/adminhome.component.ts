import { Component, EventEmitter, Output } from '@angular/core';
import { LoginService } from '../Services/Login.services';
import { Router } from '@angular/router';
import { Take } from '../models/take.model';

@Component({
  selector: 'app-adminhome',
  templateUrl: './adminhome.component.html',
  styleUrl: './adminhome.component.css'
})
export class AdminhomeComponent {
  filters: string[] = [];

  @Output() filterChange = new EventEmitter<string[]>();
  users: Take[] = [];
  // filters = {
  //   name: '',
  //   gender: '',
  //   profession: ''
  //   // Add more filter fields as needed
  // };
  

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
  selectFilter(filter: string): void {
    // this.selectedFilter = filter;
    // if (filter === 'all') {
    //   this.characters = this.characterService.getAllCharacters();
    // } else if (filter === 'verified') {
    //   this.characters = this.characterService.getVerifiedCharacters();
    // } else if (filter === 'unverified') {
    //   this.characters = this.characterService.getUnverifiedCharacters();
    // }
  }


  ngOnInit(): void {
    this.getAdminHomeList();
    
  }
  getAdminHomeList(){
    this.getServicesCart.adminhometabledata("Paid").subscribe({
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
        this.reloadComponent();
        // this.reloadPage();
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
        // this.reloadPage();
        this.reloadComponent();
        // this.loggedIn = true;
      },
     
      error: (e) => console.error(e)
    }
    );
    // Add your logic here to handle payment
  }


  reloadComponent() {
    console.log("Current route I am on:",this.router.url);
    let currentUrl = this.router.url;
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([`admin`]);
    }

  //   reloadComponent(self:boolean,urlToNavigateTo ?:string){
  //     //skipLocationChange:true means dont update the url to / when navigating
  //    console.log("Current route I am on:",this.router.url);
  //    const url=self ? this.router.url :urlToNavigateTo;
  //    this.router.navigateByUrl('/',{skipLocationChange:true}).then(()=>{
  //      this.router.navigate([`/${url}`]).then(()=>{
  //        console.log(`After navigation I am on:${this.router.url}`)
  //      })
  //    })
  //  }

    reloadPage() {
      window.location.reload();
    }
    filteredUsers() {
      if (this.filters.length === 0) {
        return this.users;
      }
  
      return this.users.filter(user => {
        return this.filters.some(filter => {
          return Object.values(user).some(value =>
            value.toString().toLowerCase().includes(filter.toLowerCase())
          );
        });
      });
    }
   
  
    addFilter() {
      const newFilter = prompt('Enter a new filter:');
      if (newFilter) {
        this.filters.push(newFilter);
        this.filterChange.emit(this.filters);
      }
    }
  
    removeFilter(index: number) {
      this.filters.splice(index, 1);
      this.filterChange.emit(this.filters);
    }

  
}
