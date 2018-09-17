import { Store, select } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './../services/user.service';
import { Router } from '@angular/router';
import * as fromAuthReducer from '../../public/state/auth/auth.reducer';
@Injectable()
export class NotauthGuard implements CanActivate {
	constructor(private _storeAuth: Store<fromAuthReducer.AuthState>, private _router: Router) {

	}
	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
		let isAuthenticated: boolean = false;
		this._storeAuth.pipe(select(fromAuthReducer.Authenticated)).subscribe(x => isAuthenticated = x);
		if (isAuthenticated) {
			return true;
		} else {
			alert('Please login to continue !!!');
			this._router.navigate(['/register']);
			return false;
		}
		// if(this._storeAuth.pipe(select(fromAuthReducer.Authenticated))){
		// 	return true;
		// }
		// else{
		// 	console.log(state)
		// 	alert('Please login to continue !!!');
		// 	this._router.navigate(['/login']);
		// }
	}
}
