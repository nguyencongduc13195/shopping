import { Observable } from 'rxjs';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromPublicAction from '../../../state/public.action';
import * as fromPublicReducer from '../../../state/public.reducer';
@Component({
  selector: 'app-categories-topbar',
  templateUrl: './categories-topbar.component.html',
  styleUrls: ['../categories.component.scss']
})
export class CategoriesTopbarComponent implements OnInit {

  constructor(private _store: Store<fromPublicReducer.PublicState>) { }
  @Output('viewModeConnector') viewModeConnector = new EventEmitter<string>();
  public viewMode$: Observable<string>;
  ngOnInit() {
    this.viewMode$ = this._store.pipe(select(fromPublicReducer.getViewMode));
  }
  viewModeEvent(value: string){
    this._store.dispatch(new fromPublicAction.ViewMode(value));
  }
  onChangeSelect(value){
    this._store.dispatch(new fromPublicAction.Filter(parseInt(value)));
  }
  onFilter(val){
    this._store.dispatch(new fromPublicAction.FilterByName((val)));
  }
}
