import { Component } from '@angular/core';
import { GetCart } from '../models/take.model';
import { LoginService } from '../Services/Login.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
    servicesCart : GetCart={
      Serviceid:'',
        Category:'',
        Charges:0,
        S_Name:'',
        Gender:'',
        State: '',
        City:'',
        Area:'',
        Pincode:'',
    }

    cartList:any;

    constructor(private getServicesCart:LoginService,private router:Router){};

    ngOnInit():void {
      this.getCartServices();
    }
  

    getCartServices(){
      this.getServicesCart.getServicesCart().subscribe({
        next:(res) => {
          console.log('cart service', res);
          this.cartList = res;
        },
        error: (e) => console.error(e)
      });
    }

    onClickOnDelete(Service_id:any){
    
      this.getServicesCart.deleteFromCart(Service_id).subscribe({
        next:(res) => {
          console.log('deleted service', res);
          // this.router.navigate([`cart`]);
          this.reloadComponent();
        },
        error: (e) => console.error(e)
      });
    }

    reloadComponent() {
      let currentUrl = this.router.url;
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          this.router.onSameUrlNavigation = 'reload';
          this.router.navigate([`cart`]);
      }

    onClickEditFromCart(Service_id:any){
      const data = {
        Serviceid : Service_id
      };
      this.getServicesCart.editFromCart(data).subscribe({
        next:(res) => {
          console.log('get service', res[0]['Category']);
  
          localStorage.setItem("isEditClick","true");
          let string = JSON.stringify(res);
          localStorage.setItem("category",res[0]['Category']);

          localStorage.setItem("editValue",string);
          
          // this.router.navigate([`cart`]);
          this.reloadCreateComponent();
        },
        error: (e) => console.error(e)
      });
    }
    
    reloadCreateComponent() {
      let currentUrl = this.router.url;
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          this.router.onSameUrlNavigation = 'reload';
          this.router.navigate([`create`]);
      }
}
