import { Router } from '@angular/router';
import { CartItem } from './../../../shared/models/cart.model';
import { CartService } from './../../../shared/services/cart.service';
import { OrderService } from './../../../shared/services/order.service';
import { Component, OnInit, DoCheck } from '@angular/core';
import * as fromPublicReducer from '../../state/public.reducer';
import * as fromPublicAction from '../../state/public.action';
import { Store } from '@ngrx/store';
import { Order, OrderItem } from '../../../shared/models/order.model';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit, DoCheck {

  constructor(private _store: Store<fromPublicReducer.PublicState>, 
    private _cartService: CartService,
    private _orderService: OrderService,
    private _router: Router
  ) { }

  ngOnInit() {
    this._store.dispatch(new fromPublicAction.CurrentPage('Check Out'));
  }
  public cartItems: CartItem[] = [];
  public totalPrice: number=0;
  ngDoCheck(){
    this.cartItems = this._cartService.items;
    this.totalPrice = this._cartService.total();
  }
  getCheckOutInfo(event){
    console.log(event);
    let order: Order = new Order();
		order.name = event.txtName;
		order.address = event.txtAddress;
		order.phone = event.txtPhone;
		order.paymentOption = event.rdoPayment;
    order.note = event.txtNote;
    order.total = this._cartService.total();
		order.orderItems = this._cartService.items.map(
			(item:CartItem)=>new OrderItem(item.product.slug,item.quantity,item.size, item.color)
		);
		this._orderService.addOrder(order, order.orderItems).subscribe((data)=>{
			this._cartService.clear();
			alert(data['msg']);
			this._router.navigate(['/my-info']);
		});
  }
}
