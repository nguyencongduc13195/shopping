import { User } from './../../../shared/models/user.model';
import { Product } from './../../../shared/models/product.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import * as fromPublicAction from '../../state/public.action';
import * as fromPublicReducer from '../../state/public.reducer';
import * as fromAuthAction from '../../state/auth/auth.action';
import * as fromAuthReducer from '../../state/auth/auth.reducer';
import { Store, select } from '@ngrx/store';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {

  constructor(private _activatedRoute: ActivatedRoute, 
    private _authStore: Store<fromAuthReducer.AuthState>,
    private _store: Store<fromPublicReducer.PublicState>) { }
  private _sub: Subscription;
  public product: Product;
  public cateId: string;
  public user: User;
  ngOnInit() {
    this._store.dispatch(new fromPublicAction.CurrentPage('Single Product'));
    this._sub = this._activatedRoute.params.subscribe(x => {
      if (x['slug']) {
        this._store.dispatch(new fromPublicAction.LoadProductDetail(x['slug']));
      }
    });
    this._sub = this._store.pipe(select(fromPublicReducer.getProductDetail)).subscribe(x=>{
      if(x && x['success']){
        this.product = x['data'];
        this.cateId = x['data']['category'];
      }
    });
    this._sub = this._authStore.pipe(select(fromAuthReducer.getCurrentUser)).subscribe(x=>{
      if(x){
        this.user = x['user'];
      }
    });
  }
  public scroll: boolean;
  getScroll(event){
    if(event){
      this.scroll = event;
      // this.scroll.nativeElement.scrollIntoView(); ;
    }
  }
  ngOnDestroy() {
    if (this._sub) {
      this._sub.unsubscribe();
    }
    this._store.dispatch(new fromPublicAction.LoadProductDetailSuccess(null));
  }
}
