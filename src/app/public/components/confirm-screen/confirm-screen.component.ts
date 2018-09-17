import { Observable } from 'rxjs';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromPublic from '../../state/public.reducer';
import * as fromPublicActions from '../../state/public.action';
@Component({
  selector: 'app-confirm-screen',
  templateUrl: './confirm-screen.component.html',
  styleUrls: ['./confirm-screen.component.scss']
})
export class ConfirmScreenComponent implements OnInit {

  constructor(private _store: Store<fromPublic.PublicState>) { }
  public showConfirm$: Observable<boolean>;
  @Output('agree') connector = new EventEmitter<boolean>();
  ngOnInit() {
    this.showConfirm$ = this._store.pipe(select(fromPublic.getShowConfirmwScreen));
  }
  closeScreen(){
    this._store.dispatch(new fromPublicActions.ToggleConfirmScreen(false));
  }
  agreeConfirm(){
    this._store.dispatch(new fromPublicActions.ToggleConfirmScreen(false));
    this.connector.emit(true);
  }
} 
