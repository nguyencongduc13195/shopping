import { User } from './../../../shared/models/user.model';
import { AuthActions, AuthActionTypes } from './auth.action';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Order } from '../../../shared/models/order.model';
export interface AuthState {
    userToken: string,
    isAuthenticated: boolean,
    isAdmin: boolean,
    currentUser: User,
    myOrders: Order[]
}
const initialState: AuthState = {
    userToken: '',
    isAuthenticated: false,
    isAdmin: false,
    currentUser: null,
    myOrders: []
}
const getAuthFeatureState = createFeatureSelector<AuthState>('auth');
export const getUserToken = createSelector(getAuthFeatureState, state => state.userToken);
export const getCurrentUser = createSelector(getAuthFeatureState, state => state.currentUser);
export const getMyOrders = createSelector(getAuthFeatureState, state => state.myOrders);
export const Authenticated = createSelector(getAuthFeatureState, state => state.isAuthenticated);
export const getRoleAdmin = createSelector(getAuthFeatureState, state => state.isAdmin);
export function authReducer(state = initialState, action: AuthActions) {
    switch (action.type) {
        case AuthActionTypes.USER_LOGIN_SUCCESS:
            return {
                ...state,
                userToken: action.payload
            }
            case AuthActionTypes.REMOVE_ORDER_SUCCESS:
            // state.myOrders.filter((val, index)=>  val['_id'] !== action.payload['_id']);
            console.log(action.payload)
            return {
                ...state
            }
        case AuthActionTypes.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload,
                isAuthenticated: true
            }
        case AuthActionTypes.UPDATE_ADDRESS_SUCCESS:
            return {
                ...state,
                userToken: action.payload
            }
        case AuthActionTypes.UPDATE_USER_SUCCESS:
            return {
                ...state,
                userToken: action.payload
            }
        case AuthActionTypes.LOAD_MY_ORDERS_SUCCESS:
            return {
                ...state,
                myOrders: action.payload
            }
        case AuthActionTypes.LOG_OUT:
            localStorage.removeItem('token');
            return {
                ...state,
                currentUser: null,
                isAuthenticated: false,
                userToken: '',
                myOrders: []
            }
        default:
            return state;
    }
}