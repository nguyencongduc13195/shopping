import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from './../../../shared/models/user.model';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import * as fromPublicActions from '../../state/public.action';
import * as fromPublicReducer from '../../state/public.reducer';
import * as fromAuthActions from '../../state//auth/auth.action';
import * as fromAuthReducer from '../../state/auth/auth.reducer';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Order } from '../../../shared/models/order.model';

@Component({
	selector: 'app-info-user',
	templateUrl: './info-user.component.html',
	styleUrls: ['./info-user.component.scss']
})
export class InfoUserComponent implements OnInit, OnDestroy {

	constructor(
		private _router: Router,
		private _formBuilder: FormBuilder,
		private _storePublic: Store<fromPublicReducer.PublicState>,
		private _storeAuth: Store<fromAuthReducer.AuthState>,
	) { }
	public loadedInfo: boolean = false;
	public arrayView: string[] = [];
	public viewDetail: boolean = false;
	public helper = new JwtHelperService();
	public isEdittingAddress: boolean = false;
	public userEdit: User = new User;
	public orders: Order[] = [];
	public singleOrder: Order;
	public deleteOrderId: string;
	ngOnInit() {
		this._storePublic.dispatch(new fromPublicActions.CurrentPage('My Account'));
		this._storeAuth.dispatch(new fromAuthActions.LoadMyOrders());
		this.loadInfo();
		this.loadMyOrder();
		this.createForm();
	}
	// 
	onViewOrder(order: Order) {
		this.viewDetail = true;
		this.singleOrder = order;
	}
	onCancelOrder(orderId: string) {
		this.deleteOrderId = orderId;
		this._storePublic.dispatch(new fromPublicActions.ToggleConfirmScreen(true));
	}
	onBack() {
		this.viewDetail = false;
		this.singleOrder = null;
	}
	getConfirm(event: boolean) {
		if (event) {
			this._storeAuth.dispatch(new fromAuthActions.RemoveOrder(this.deleteOrderId));
			this.orders = this.orders.filter(val => val['_id'] !== this.deleteOrderId);
			this.deleteOrderId = '';
		}
	}
	// 
	public isEditting: boolean = false;
	loadInfo() {
		this._sub = this._storeAuth.pipe(select(fromAuthReducer.getCurrentUser)).subscribe(x => {
			if (x) this.userEdit = x['user'];
		});
	}
	loadMyOrder() {
		this._sub = this._storeAuth.pipe(select(fromAuthReducer.getMyOrders)).subscribe(x => {
			if (x) this.orders = x['data'];
		});
	}
	// create form
	public formEdit: FormGroup;
	createForm() {
		this.formEdit = this._formBuilder.group({
			'txtFullName': ['', Validators.required],
			'txtPhone': ['', Validators.required],
			'txtBirthday': [null],
			'rdoGender': ['']
		});
		this.setValue();
	}
	fromJsonDate(jDate): string {
		const bDate: Date = new Date(jDate);
		return bDate.toISOString().substring(0, 10);
	}
	setValue() {
		this.formEdit.patchValue({
			'txtFullName': this.userEdit.full_name,
			'txtPhone': this.userEdit.phone,
			'txtBirthday': this.fromJsonDate(this.userEdit.birthday),
			'rdoGender': this.userEdit.gender
		});
	}
	// 
	public isUpdatedUser: boolean = false;
	public msg: string;
	submitEdit(value) {
		let user = new User;
		user.full_name = value.txtFullName;
		user.phone = value.txtPhone;
		user.gender = value.rdoGender;
		user.birthday = value.txtBirthday;
		this._storeAuth.dispatch(new fromAuthActions.UpdateUser(user));
		this._sub = this._storeAuth.pipe(select(fromAuthReducer.getUserToken)).subscribe(x => {
			this.isUpdatedUser = x['success'];
			if (x && x['success']) {
				localStorage.setItem('token', x['token']);
				this.msg = x['msg'];
				setTimeout(() => {
					this.msg = '';
					this.isUpdatedUser = false;
				}, 1500);
			}
		});
	}
	// 
	public isActive: number = 1;
	onClick(val: number) {
		this.isActive = val;
	}
	// 
	onLogout() {
		this._storeAuth.dispatch(new fromAuthActions.LogOut());
		this._router.navigate(['/']);
	}
	// 
	updateAddressEvent() {
		this._storeAuth.dispatch(new fromAuthActions.UpdateAddress(this.userEdit.address));
		this._sub = this._storeAuth.pipe(select(fromAuthReducer.getUserToken)).subscribe(x => {
			if (x && x['success']) {
				localStorage.setItem('token', x['token']);
				this.isEdittingAddress = false;
			}
		});
	}
	private _sub: Subscription;
	ngOnDestroy() {
		if (this._sub) {
			this._sub.unsubscribe();
		}
	}
}
