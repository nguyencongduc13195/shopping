import { getUserToken } from './../../state/auth/auth.reducer';
import { Store, select } from '@ngrx/store';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from './../../../shared/services/user.service';
import { User } from './../../../shared/models/user.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import * as fromPublicActions from '../../state/public.action';
import * as fromPublicReducer from '../../state/public.reducer';
import * as fromAuthActions from '../../state/auth/auth.action';
import * as fromAuthReducer from '../../state/auth/auth.reducer';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

	constructor(
		private _formBuilder: FormBuilder,
		private _userService: UserService,
		private _router: Router,
		private _storePublic: Store<fromPublicReducer.PublicState>,
		private _storeAuth: Store<fromAuthReducer.AuthState>,
	) { }
	private _sub: Subscription;
	// 
	ngOnInit() {
		this.createFormRegister();
		this.createFormLogin();
		this._storePublic.dispatch(new fromPublicActions.CurrentPage('Register & Login'));
	}
	//login form
	public formLogin: FormGroup;
	createFormLogin() {
		this.formLogin = this._formBuilder.group({
			'txtEmail': ["", Validators.compose([
				Validators.required,
				Validators.email
			])],
			'txtPassword': ["", Validators.required]
		});
	}
	// register form
	public formRegister: FormGroup;
	createFormRegister() {
		this.formRegister = this._formBuilder.group({
			'txtFullName': ["", Validators.required],
			'txtEmail': ["", Validators.compose([
				Validators.required,
				Validators.email
			])],
			'txtPassword': ["", Validators.compose([
				Validators.required,
				Validators.minLength(6),
				Validators.maxLength(20)
			])],
			'txtPhone': ["", Validators.compose([
				Validators.required,
				Validators.minLength(8),
				Validators.maxLength(11)
			])],
			'txtRePassword': ["", Validators.required],
			'txtBirthday': ["", Validators.required],
			'rdoGender': ['Male'],
			"txtAddress": ['']
		});
	}
	// kiểm tra email
	public existingEmail: boolean = true;
	onCheckEmail() {
		this._sub = this._userService.checkExistEmail(this.formRegister.controls['txtEmail'].value).subscribe(
			(data: User) => {
				this.existingEmail = data['success']
			});
	}
	// kiểm tra mật khẩu
	public matchPassword: boolean = false;
	checkPassword() {
		if (this.formRegister.controls['txtPassword'].value !== this.formRegister.controls['txtRePassword'].value) {
			this.matchPassword = false;
		} else {
			this.matchPassword = true;
		}
	}
	// đăng ký
	public sltGender: number = 1;
	disableForm() {
		this.formRegister.controls['txtFullName'].disable();
		this.formRegister.controls['txtEmail'].disable();
		this.formRegister.controls['txtPassword'].disable();
		this.formRegister.controls['txtRePassword'].disable();
		this.formRegister.controls['txtPhone'].disable();
		this.formRegister.controls['txtAddress'].disable();
		this.formRegister.controls['rdoGender'].disable();
		this.formRegister.controls['txtBirthday'].disable();
	}
	public success_register: boolean = false;
	public msg: string;
	public msgClass: string;
	public rdoGender: string;
	onRegister(value) {
		let user = new User;
		user.full_name = value.txtFullName;
		user.email = value.txtEmail;
		user.password = value.txtPassword;
		user.phone = value.txtPhone;
		user.birthday = value.txtBirthday;
		user.gender = value.rdoGender;
		user.address = value.txtAddress;
		this._sub = this._userService.registerUser(user).subscribe((data: User) => {
			this.success_register = data['success'];
			if (data['success']) {
				this.msg = data['msg'];
				this.msgClass = 'alert alert-success';
				let decoded = this.helper.decodeToken(data['token']);
				this._storeAuth.dispatch(new fromAuthActions.SetCurrentUser(decoded));
				localStorage.setItem('token', data['token']);
				this.disableForm();
				this.success_register = true;
				setTimeout(() => {
					this._router.navigate(['/']);
				}, 1500)
			}
		});
	}
	// 
	public helper = new JwtHelperService();
	public success_login: boolean = false;
	onLogin(formLogin) {
		let user = new User();
		user.email = formLogin.txtEmail,
		user.password = formLogin.txtPassword;
		this._storeAuth.dispatch(new fromAuthActions.LoadUser(user));
		this._storeAuth.pipe(select(fromAuthReducer.getUserToken)).subscribe(data => {
			if (data && data['success']) {
				this.success_login = true;
				localStorage.setItem('token', data['token']);
				let decoded = this.helper.decodeToken(data['token']);
				this._storeAuth.dispatch(new fromAuthActions.SetCurrentUser(decoded));
				this.msg = data['msg'];
				this.msgClass = 'alert alert-success';
				this.formLogin.controls['txtEmail'].disable();
				this.formLogin.controls['txtPassword'].disable();
				setTimeout(() => {
					this._router.navigate(['/']);
				}, 1500);
			} else if (data && !data['success']) {
				this.msgClass = 'alert alert-danger';
				this.msg = data['msg'];
			}
		});
	}
	// 
	ngOnDestroy() {
		if (this._sub) {
			this._sub.unsubscribe();
		}
	}
}
