import { Component, OnInit } from '@angular/core';
import * as fromPublicReducer from '../../state/public.reducer';
import * as fromPublicAction from '../../state/public.action';
import { Store } from '@ngrx/store';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  constructor(private _store: Store<fromPublicReducer.PublicState>) { }

  ngOnInit() {
    this._store.dispatch(new fromPublicAction.CurrentPage('Contact Us'));
  }

}
