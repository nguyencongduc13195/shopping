import { Component, OnInit, DoCheck } from '@angular/core';
import { CartItem } from './../../../shared/models/cart.model';
import { CartService } from './../../../shared/services/cart.service';
import { Router } from '@angular/router';
import * as fromPublicReducer from '../../state/public.reducer';
import * as fromPublicAction from '../../state/public.action';
import { Store } from '@ngrx/store';
@Component({
	selector: 'app-cart',
	templateUrl: './cart.component.html',
	styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, DoCheck {
	
	constructor(
		private _cartService: CartService,
		private _router: Router,
		private _store: Store<fromPublicReducer.PublicState>
	) { }
	public cartItems: CartItem[] = [];
	public cartTotal: number = 0;
	ngOnInit() {
		this._store.dispatch(new fromPublicAction.CurrentPage('Cart'));
		this.cartItems = this._cartService.items;
	}
	ngDoCheck(){
		this.cartTotal = this._cartService.total();
	}
	// 
	getToOrder(){
		if(this._cartService.items.length > 0){
			this._router.navigate(['/order']);
		}
		else{
			alert('Bạn chưa có sản phẩm trong giỏ hàng.');
		}
	}
}
