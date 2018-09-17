import { CartService } from './../../../shared/services/cart.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import * as fromPublicAction from '../../state/public.action';
import * as fromPublicReducer from '../../state/public.reducer';
import { Product } from '../../../shared/models/product.model';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['../products/products.component.scss']
})
export class ProductListComponent implements OnInit {

  constructor(private _store: Store<fromPublicReducer.PublicState>, private _cartService: CartService) { }
  public products$: Observable<Product[]>;

  ngOnInit() {
    this.products$ = this._store.pipe(select(fromPublicReducer.getProductList));
  }
  onQuickViewEvent(item: Product){
    this._store.dispatch(new fromPublicAction.ToggleQuickViewScreen(true));
    this._store.dispatch(new fromPublicAction.QuickViewProduct(item));
  }
  onLoveProductEvent(item: Product){
    this._store.dispatch(new fromPublicAction.LoveProduct(item));
  }
  onAddCartEvent(item: Product){
    this._cartService.addItem(item,'1',item.size[0], item.color[0]);
  }
}
