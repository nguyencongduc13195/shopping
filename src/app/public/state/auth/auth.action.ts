import { User } from './../../../shared/models/user.model';
import { Action } from "@ngrx/store";
import { Order } from '../../../shared/models/order.model';
export enum AuthActionTypes{
    LOAD_USER = "[Auth] Load User",
    LOAD_MY_ORDERS = "[Auth] Load My Orders",
    REMOVE_ORDER = "[Auth] Remove Order",
    REMOVE_ORDER_SUCCESS = "[Auth] Remove Order Success",
    LOAD_MY_ORDERS_SUCCESS = "[Auth] Load My Orders Success",
    USER_LOGIN_SUCCESS = "[Auth] Login User Success",
    SET_CURRENT_USER = "[Auth] Set Current User",
    UPDATE_ADDRESS = "[Auth] Update Address",
    UPDATE_ADDRESS_SUCCESS = "[Auth] Update Address Success",
    UPDATE_USER = "[Auth] Update User",
    UPDATE_USER_SUCCESS = "[Auth] Update User Success",
    LOG_OUT = "[Auth] Log Out",
    CLEAR_CURRENT_USER = "[Auth] Clear Current User",
    LOAD_FAIL = "[Auth] Login User Failure",
}
// order
export class LoadMyOrders implements Action{
    readonly type = AuthActionTypes.LOAD_MY_ORDERS;
}
export class LoadMyOrdersSuccess implements Action{
    readonly type = AuthActionTypes.LOAD_MY_ORDERS_SUCCESS;
    constructor(public payload: Order[]){}
}
export class RemoveOrder implements Action{
    readonly type = AuthActionTypes.REMOVE_ORDER;
    constructor(public payload: string){}
}
export class RemoveOrderSuccess implements Action{
    readonly type = AuthActionTypes.REMOVE_ORDER_SUCCESS;
    constructor(public payload: Order){}
}
// user
export class LoadUser implements Action{
    readonly type = AuthActionTypes.LOAD_USER;
    constructor(public payload: User){}
}
export class UserLoginSuccess implements Action{
    readonly type = AuthActionTypes.USER_LOGIN_SUCCESS;
    constructor(public payload: any){}
}
export class ClearCurrentUser implements Action{
    readonly type = AuthActionTypes.CLEAR_CURRENT_USER;
}
export class SetCurrentUser implements Action{
    readonly type = AuthActionTypes.SET_CURRENT_USER;
    constructor(public payload: User){}
}
export class UpdateAddress implements Action{
    readonly type = AuthActionTypes.UPDATE_ADDRESS;
    constructor(public payload: string){}
}
export class UpdateAddressSuccess implements Action{
    readonly type = AuthActionTypes.UPDATE_ADDRESS_SUCCESS;
    constructor(public payload: string){}
}
export class UpdateUser implements Action{
    readonly type = AuthActionTypes.UPDATE_USER;
    constructor(public payload: User){}
}
export class UpdateUserSuccess implements Action{
    readonly type = AuthActionTypes.UPDATE_USER_SUCCESS;
    constructor(public payload: string){}
}
export class LogOut implements Action{
    readonly type = AuthActionTypes.LOG_OUT;
}
export class LoadFail implements Action {
    readonly type = AuthActionTypes.LOAD_FAIL;
    constructor(public payload: string) { }
}
export type AuthActions = LoadUser | UserLoginSuccess | LoadFail | SetCurrentUser | ClearCurrentUser |LogOut 
| UpdateAddressSuccess | UpdateAddress | UpdateUser | UpdateUserSuccess
| LoadMyOrdersSuccess | LoadMyOrders | RemoveOrderSuccess | RemoveOrder;