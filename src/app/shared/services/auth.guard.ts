import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './../services/user.service';
import { Router } from '@angular/router';
import * as fromAuthReducer from '../../public/state/auth/auth.reducer';
import { Store, select } from '@ngrx/store';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private _storeAuth: Store<fromAuthReducer.AuthState>, private _router: Router){

	}
	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
		// if(this._userService.loggedIn()){
    	// 	this._router.navigate(['/']);
    	// 	return false;
		// }
		// else{
		// 	return true;
		// }
		let isAuthenticated: boolean = false;
		this._storeAuth.pipe(select(fromAuthReducer.Authenticated)).subscribe(x => isAuthenticated = x);
		if (isAuthenticated) {
			this._router.navigate(['/']);
			return false;
		} else {
			return true;
		}
  	}
}
