import { Component } from '@angular/core';
import { GetCart } from '../models/take.model';
import { LoginService } from '../Services/Login.services';

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

    constructor(private getServicesCart:LoginService){};

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
}
