import { CartService } from './../../../shared/services/cart.service';
import { CartItem } from './../../../shared/models/cart.model';
import { getMostLikedProducts } from './../../state/public.reducer';
import { LoadNewestProducts } from './../../state/public.action';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import * as fromPublicAction from '../../state/public.action';
import * as fromPublicReducer from '../../state/public.reducer';
import { Product } from '../../../shared/models/product.model';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  constructor(private _store: Store<fromPublicReducer.PublicState>, private _cartService: CartService) { }
  public products$: Observable<Product[]>;
  public selectedMode: number = 1;
  
  ngOnInit() {
    this.products$ = this._store.pipe(select(fromPublicReducer.getNewestProducts));
  }
  increase(){
    if(this.selectedMode + 1 > 3){
      this.selectedMode = 1;
    }else{
      this.selectedMode++;
    }
  }
  decrease(){
    if(this.selectedMode - 1 === 0){
      this.selectedMode = 3;
    }else{
      this.selectedMode--;
    }
  }
  loadProducts(){
    if(this.selectedMode === 1){
    this.products$ = this._store.pipe(select(fromPublicReducer.getNewestProducts));
    }else if(this.selectedMode === 2){
      this.products$ = this._store.pipe(select(fromPublicReducer.getMostViewedProducts));
    }else{
      this.products$ = this._store.pipe(select(fromPublicReducer.getMostLikedProducts));
    }
  }
  onQuickViewEvent(item: Product){
    this._store.dispatch(new fromPublicAction.ToggleQuickViewScreen(true));
    this._store.dispatch(new fromPublicAction.QuickViewProduct(item));
  }
  onLoveProductEvent(item: Product){
    this._store.dispatch(new fromPublicAction.LoveProduct(item));
  }
  // public cartItem: CartItem = new CartItem(null,1,'','');
   
  onAddCartEvent(item: Product){
    this._cartService.addItem(item,'1',item.size[0], item.color[0]);
  }
}
