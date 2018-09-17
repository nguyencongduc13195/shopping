import { Observable, Subscription } from 'rxjs';
import { Product } from './../../../shared/models/product.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromPublic from '../../state/public.reducer';
import * as fromPublicActions from '../../state/public.action';
@Component({
  selector: 'app-quickview-screen',
  templateUrl: './quickview-screen.component.html',
  styleUrls: ['./quickview-screen.component.scss']
})
export class QuickviewScreenComponent implements OnInit, OnDestroy {

  constructor(private _store: Store<fromPublic.PublicState>) { }
  public showQuickViewScreen$: Observable<boolean>;
  public quickViewProduct: Product;
  public selectedColorArray: string[] = [];
  private _sub: Subscription;
  public mainImage: string;
  ngOnInit() {
    this.showQuickViewScreen$ = this._store.pipe(select(fromPublic.getShowQuickViewScreen));
    this._sub = this._store.pipe(select(fromPublic.getQuickViewProduct)).subscribe(x=>{
      if(x){
        this.quickViewProduct = x;
        this.mainImage = x.image;
      }
    });
  }
  onCloseQuickView() {
    this._store.dispatch(new fromPublicActions.ToggleQuickViewScreen(false));
    this._store.dispatch(new fromPublicActions.ClearQuickViewProduct());
  }
  selectedColorEvent(color: string) {
    this.selectedColorArray = [];
    this.selectedColorArray.push(color);
  }
  changeMainImage(img: string){
    this.mainImage = img;
  }
  setDefault(){
    this.mainImage = this.quickViewProduct.image;
  }
  ngOnDestroy(){
    if(this._sub){
      this._sub.unsubscribe();
    }
  }
}
