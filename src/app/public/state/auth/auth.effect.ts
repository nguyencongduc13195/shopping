import { UserService } from './../../../shared/services/user.service';
import { OrderService } from './../../../shared/services/order.service';
import { mergeMap, map, catchError, switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import * as fromAuthActions from './auth.action';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { Order } from '../../../shared/models/order.model';

@Injectable()
export class AuthEffects {

    constructor(private actions$: Actions,
        private _userService: UserService,
        private _orderService: OrderService,
    ) { }
    @Effect()
    loginUser$ = this.actions$.ofType(fromAuthActions.AuthActionTypes.LOAD_USER)
        .pipe(
            switchMap((action: fromAuthActions.LoadUser) => this._userService.login(action.payload)
                .pipe(
                    map((token: any) => new fromAuthActions.UserLoginSuccess(token)),
                    catchError(err => of(new fromAuthActions.LoadFail(err))))
            )
        )
    @Effect()
    updateAddress$ = this.actions$.ofType(fromAuthActions.AuthActionTypes.UPDATE_ADDRESS)
        .pipe(
            switchMap((action: fromAuthActions.UpdateAddress) => this._userService.updateAddressUser(action.payload)
                .pipe(
                    map((token: any) => new fromAuthActions.UpdateAddressSuccess(token)),
                    catchError(err => of(new fromAuthActions.LoadFail(err))))
            )
        )
    @Effect()
    updateUser$ = this.actions$.ofType(fromAuthActions.AuthActionTypes.UPDATE_USER)
        .pipe(
            switchMap((action: fromAuthActions.UpdateUser) => this._userService.updateUser(action.payload)
                .pipe(
                    map((token: any) => new fromAuthActions.UpdateUserSuccess(token)),
                    catchError(err => of(new fromAuthActions.LoadFail(err))))
            )
        )
    @Effect()
    loadMyOrders$ = this.actions$.ofType(fromAuthActions.AuthActionTypes.LOAD_MY_ORDERS)
        .pipe(
            switchMap((action: fromAuthActions.LoadMyOrders) => this._orderService.myOrder()
                .pipe(
                    map((orders: Order[]) => new fromAuthActions.LoadMyOrdersSuccess(orders)),
                    catchError(err => of(new fromAuthActions.LoadFail(err))))
            )
        )
    @Effect()
    removeOrder$ = this.actions$.ofType(fromAuthActions.AuthActionTypes.REMOVE_ORDER)
        .pipe(
            switchMap((action: fromAuthActions.RemoveOrder) => this._orderService.deleteOrder(action.payload)
                .pipe(
                    map((order: Order) => new fromAuthActions.RemoveOrderSuccess(order)),
                    catchError(err => of(new fromAuthActions.LoadFail(err))))
            )
        )
}