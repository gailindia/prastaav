import { Component } from '@angular/core';
import { GetCart } from '../models/take.model';
import { LoginService } from '../Services/Login.services';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  
form: any;
items: string[] = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];


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