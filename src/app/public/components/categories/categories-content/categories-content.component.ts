import { CartService } from './../../../../shared/services/cart.service';
import { Subscription, pipe, Observable } from 'rxjs';
import { Product } from './../../../../shared/models/product.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromPublicReducer from '../../../state/public.reducer';
import * as fromPublicActions from '../../../state/public.action';

@Component({
  selector: 'app-categories-content',
  templateUrl: './categories-content.component.html',
  styleUrls: ['../categories.component.scss']
})
export class CategoriesContentComponent implements OnInit, OnDestroy {

  constructor(private _store: Store<fromPublicReducer.PublicState>, private _cartService: CartService) { }
  public product: Product[] = [];
  private _sub: Subscription;
  public viewMode: string;
  public loaded: boolean;
  public stars: number[] = [1,2,3,4,5];
  ngOnInit() {
    this._sub = this._store.pipe(select(fromPublicReducer.getProductList)).subscribe(x => {
      this.loaded = x['success'];
      if (this.loaded) {
        this.product = x['data'];
      }else{
        this.product = [];
      }
    });
    this.filter();
    this.loadViewMode();
  }
  filter() {
    this._sub = this._store.pipe(select(fromPublicReducer.getFilter)).subscribe(x => {
      if (x === 1) {
        this.product = this.product.sort((a, b) => {
          if (a.name > b.name) return 1;
          else if (a.name < b.name) return -1;
          else return 0;
        });
      } else if (x === 2) {
        this.product = this.product.sort((a, b) => {
          if (a.name > b.name) return -1;
          else if (a.name < b.name) return 1;
          else return 0;
        });
      } else if (x === 3) {
        this.product = this.product.sort((a, b) => {
          if (a.promotion_price === a.price) {
            if (a.price > b.price) return 1;
            else if (a.promotion_price !== a.price && a.price < b.price) return -1;
            else return 0;
          } else {
            if (a.promotion_price > b.promotion_price) return 1;
            else if (a.promotion_price < b.promotion_price) return -1;
            else return 0;
          }
        });
      } else if (x === 4) {
        this.product = this.product.sort((a, b) => {
          if (a.promotion_price === a.price) {
            if (a.promotion_price !== a.price && a.price < b.price) return 1;
            else if (a.price > b.price) return -1;
            else return 0;
          } else {
            if (a.promotion_price > b.promotion_price) return -1;
            else if (a.promotion_price < b.promotion_price) return 1;
            else return 0;
          }
        });
      }else if (x === 5) {
        this.product = this.product.sort((a, b) => {
          if (a['averageRating'] > b['averageRating']) return -1;
          else if (a['averageRating'] < b['averageRating']) return 1;
          else return 0;
        });
      } else if (typeof (x) === 'string') {
        if (x !== "") {
          this.product = this.product.filter((value) => {
            return value.name.toLowerCase().indexOf(x.toLowerCase()) !== -1;
          });
        } else {
          this._store.dispatch(new fromPublicActions.LoadProductList({ pageIndex: 1, pageSize: 6 }));
        }
      }
      else {
        this.product = this.product.sort((a, b) => {
          if (a.promotion_price === a.price) {
            if (a.price > b.price) return -1;
            else if (a.promotion_price !== a.price && a.price < b.price) return 1;
            else return 0;
          } else {
            if (a.promotion_price > b.promotion_price) return -1;
            else if (a.promotion_price < b.promotion_price) return 1;
            else return 0;
          }
        });
      }
    });
  }
  // 
  loadViewMode() {
    this._sub = this._store.pipe(select(fromPublicReducer.getViewMode)).subscribe(x => {
      this.viewMode = x;
    });
  }
  onQuickViewEvent() {
    this._store.dispatch(new fromPublicActions.ToggleQuickViewScreen(true));
  }
  addToCart(item: Product) {
    this._cartService.addItem(item, '1', item.size[0], item.color[0]);
  }
  // 
  ngOnDestroy() {
    if (this._sub) {
      this._sub.unsubscribe();
    }
  }
}
