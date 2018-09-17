import { Store, select } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import * as fromAuthReducer from '../../public/state/auth/auth.reducer';

@Injectable()
export class AdminGuard implements CanActivate {
	constructor(private _storeAuth: Store<fromAuthReducer.AuthState>, private _router: Router){

	}
	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
		let isAdmin: boolean = false;
		this._storeAuth.pipe(select(fromAuthReducer.getCurrentUser)).subscribe(x => {
			if(x && x['user']['level'] === 'Admin'){
				return isAdmin = true;
			}else{
				return isAdmin = false;
			}
		});
		if (isAdmin) {
			return true;
		} else {
			this._router.navigate(['/']);
			return false;
		}
		// if(this._userService.isAdmin){
		// 	return true;
		// }else{
		// 	this._router.navigate(['/']);
		// 	return false;
		// }
	}
}
