import { Component, OnInit } from '@angular/core';
import * as fromPublicReducer from '../../state/public.reducer';
import * as fromPublicAction from '../../state/public.action';
import { Store } from '@ngrx/store';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor(private _store: Store<fromPublicReducer.PublicState>) { }

  ngOnInit() {
    this._store.dispatch(new fromPublicAction.CurrentPage('About'));
  }

}
