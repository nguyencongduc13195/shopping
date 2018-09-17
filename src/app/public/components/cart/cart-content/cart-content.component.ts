import { CartService } from './../../../../shared/services/cart.service';
import { CartItem } from './../../../../shared/models/cart.model';
import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-cart-content',
  templateUrl: './cart-content.component.html',
  styleUrls: ['../cart.component.scss']
})
export class CartContentComponent implements OnInit, OnChanges {

  constructor(private _cartService: CartService) { }
  @Input('cartItems') cartItems: CartItem[];
  @Input('cartTotal') cartTotal: number;
  ngOnInit() {
  }
  public cart: CartItem[] = [];
  public totalPrice: number;
  ngOnChanges(){
    this.cart = this.cartItems;
    this.totalPrice = this.cartTotal;
  }
  minusQuantity(item: CartItem){
    this._cartService.decreaseQty(item);
  }
  plusQuantity(item: CartItem){
    this._cartService.increaseQty(item);
  }
  removeItem(item: CartItem){
    this._cartService.removeItem(item);
  }
}
