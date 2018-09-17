import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as fromAuthReducer from './public/state/auth/auth.reducer';
import * as fromAuthAction from './public/state/auth/auth.action';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public helper = new JwtHelperService();
  constructor(private _store: Store<fromAuthReducer.AuthState>, private _router: Router) { }
  ngOnInit() {
    if (localStorage.getItem('token')) {
      let decoded = this.helper.decodeToken(localStorage.getItem('token'));
      this._store.dispatch(new fromAuthAction.SetCurrentUser(decoded));
      let currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        localStorage.removeItem('token');
        this._store.dispatch(new fromAuthAction.LogOut());
        this._store.dispatch(new fromAuthAction.ClearCurrentUser());
        this._router.navigate['/login'];
      }
      // console.log(this.helper.isTokenExpired(localStorage.getItem('token')))
      // if (this.helper.isTokenExpired(localStorage.getItem('token'))) {
      //   localStorage.removeItem('token');
      //   this._store.dispatch(new fromAuthAction.LogOut());
      //   this._router.navigate['/login'];
      // }
    }
  }
}
