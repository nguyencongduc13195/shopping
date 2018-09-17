import { pipe } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import * as fromPublicAction from '../../../state/public.action';
import * as fromPublicReducer from '../../../state/public.reducer';
import { Store, select } from '@ngrx/store';
@Component({
  selector: 'app-categories-pagination',
  templateUrl: './categories-pagination.component.html',
  styleUrls: ['../categories.component.scss']
})
export class CategoriesPaginationComponent implements OnInit {

  constructor(private _store: Store<fromPublicReducer.PublicState>) { }
  public totalPage: number[] = [];
  public pageIndex: number = 0;
  ngOnInit() {
    this._store.pipe(select(fromPublicReducer.getProductList)).subscribe(data => {
      if (data['success']) {
        this.totalPage = [];
        for (var i = 1; i <= data['totalPage']; i++) {
          this.totalPage.push(i);
        }
        this.pageIndex = data['pageIndex'];
      }
    });
  }
  setPage(page: number) {
    this._store.pipe(select(fromPublicReducer.getViewMode)).subscribe(x => {
      this._store.dispatch(new fromPublicAction.LoadProductList({ pageIndex: page, pageSize: 6 }));
    });
  }
}
