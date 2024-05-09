import { Component } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  
form: any;
items: string[] = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];

}
