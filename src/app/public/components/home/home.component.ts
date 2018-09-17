import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from './../../../shared/models/product.model';
import { CartService } from './../../../shared/services/cart.service';
import { Subscription } from 'rxjs';
import { Store, select } from "@ngrx/store";
import * as fromPublicActions from '../../state/public.action';
import * as fromPublicReducer from '../../state/public.reducer';
@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

	constructor(
		private _store: Store<fromPublicReducer.PublicState>,
		private _cartService: CartService) { }
	public products: Product[] = [];
	private _sub: Subscription;
	ngOnInit() {
		this._sub = this._store.pipe(select(fromPublicReducer.getHomePageLoaded)).subscribe(x=>{
			if(!x){
				this._store.dispatch(new fromPublicActions.LoadProductList({ pageIndex: 1, pageSize: 4 }));
				this._store.dispatch(new fromPublicActions.LoadNewestProducts());
				this._store.dispatch(new fromPublicActions.LoadMostLikedProducts());
				this._store.dispatch(new fromPublicActions.LoadMostViewedProducts());
				this._store.dispatch(new fromPublicActions.HomePageLoaded(true));
			}
		})
	}
	// 
	addToCart(product: Product) {
		this._cartService.addItem(product, '1', product.size[0], product.color[0]);
	}
	// out
	ngOnDestroy() {
		if (this._sub) {
			this._sub.unsubscribe();
		}
	}
}
