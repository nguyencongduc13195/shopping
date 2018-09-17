import { LoadProductList } from './../../state/public.action';
import { Component, OnInit, OnDestroy } from '@angular/core';
import * as fromPublicAction from '../../state/public.action';
import * as fromPublicReducer from '../../state/public.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit,OnDestroy {
  
  constructor(private _store: Store<fromPublicReducer.PublicState>) { }

  ngOnInit() {
    this._store.dispatch(new fromPublicAction.CurrentPage('Categories'));
    this._store.dispatch(new fromPublicAction.LoadProductList({ pageIndex: 1, pageSize: 6 }));
    // this._store.dispatch(new fromPublicAction.LoadCategories);
  }
  ngOnDestroy(){
    this._store.dispatch(new fromPublicAction.LoadProductList({ pageIndex: 1, pageSize: 4 }));
  }
}
