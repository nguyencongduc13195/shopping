import { CartService } from './../../../../shared/services/cart.service';
import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import * as fromPublicReducer from '../../../state/public.reducer';
import * as fromPublicAction from '../../../state/public.action';
import { Store, select } from '@ngrx/store';
import { Product } from '../../../../shared/models/product.model';
@Component({
  selector: 'app-related',
  templateUrl: './related.component.html',
  styleUrls: ['../../products/products.component.scss', './related.component.scss']
})
export class RelatedComponent implements OnInit, OnChanges {

  constructor(private _store: Store<fromPublicReducer.PublicState>,
    private _cartService: CartService
  ) { }
  public relatedProduct: Product[] = [];
  ngOnInit() {
    this._store.pipe(select(fromPublicReducer.getRelatedProducts)).subscribe(x=>{
      if(x['success']){
        this.relatedProduct = x['data']
      }
    });
  }
  @Input('categoryId') categoryChildren: string;
  ngOnChanges(){
    if(this.categoryChildren){
      this._store.dispatch(new fromPublicAction.LoadRelatedProducts(this.categoryChildren));
    }
  }
  addCart(item: Product){
    this._cartService.addItem(item, '1', item.size[0], item.color[0]);
  }
  @Output('scroll') connector = new EventEmitter<any>();
  scroolTop(){
    this.connector.emit(true);
    // a.scrollIntoView();
  }
}
