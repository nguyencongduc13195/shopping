import { CartItem } from './../../../../shared/models/cart.model';
import { Component, OnInit, OnChanges, Input } from '@angular/core';

@Component({
  selector: 'app-checkout-review',
  templateUrl: './checkout-review.component.html',
  styleUrls: ['./checkout-review.component.scss']
})
export class CheckoutReviewComponent implements OnInit,OnChanges {

  constructor() { }

  ngOnInit() {
  }
  @Input('totalPrice') totalPrice: number;
  @Input('cartItems') cartItems: CartItem[];
  ngOnChanges(){
    console.log(this.cartItems)
  }
}
