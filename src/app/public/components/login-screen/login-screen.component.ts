import { getUserToken } from './../../state/auth/auth.reducer';
import { Subscription, Observable } from 'rxjs';
import { select } from '@ngrx/store';
import { User } from './../../../shared/models/user.model';
import { Store } from '@ngrx/store';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as fromPublicActions from '../../state/public.action';
import * as fromPublicReducer from '../../state/public.reducer';
import * as fromAuthActions from '../../state/auth/auth.action';
import * as fromAuthReducer from '../../state/auth/auth.reducer';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.scss']
})
export class LoginScreenComponent implements OnInit, OnDestroy {

  constructor(private _formBuilder: FormBuilder,
    private _storePublic: Store<fromPublicReducer.PublicState>,
    private _storeAuth: Store<fromAuthReducer.AuthState>,
    private _router: Router
  ) { }
  public formLogin: FormGroup;
  public helper = new JwtHelperService();
  public showhidePassword: boolean = true;
  private _sub: Subscription;
  public msgClass: string;
  public msg: string;
  public toggleLogin$: Observable<boolean>;
  ngOnInit() {
    this.createFormLogin();
    this.toggleLogin$ = this._storePublic.pipe(select(fromPublicReducer.getShowLoginScreen));
  }
  togglePassword() {
    this.showhidePassword = !this.showhidePassword
  }
  disabledForm() {
    this.formLogin.controls['txtEmail'].disable();
    this.formLogin.controls['txtPassword'].disable();
  }
  resetForm() {
    this.formLogin.controls['txtEmail'].reset();
    this.formLogin.controls['txtPassword'].reset();
  }
  onLogin(formValue) {
    let user = new User();
    user.email = formValue.txtEmail,
    user.password = formValue.txtPassword;
    this._storeAuth.dispatch(new fromAuthActions.LoadUser(user));
    this._storeAuth.pipe(select(fromAuthReducer.getUserToken)).subscribe(data => {
      if (data && data['success']) {
        localStorage.setItem('token', data['token']);
        let decoded = this.helper.decodeToken(localStorage.getItem('token'));
        this._storeAuth.dispatch(new fromAuthActions.SetCurrentUser(decoded));
        this.msg = data['msg'];
        this.msgClass = 'alert alert-success';
        this.disabledForm();
        setTimeout(()=>{
          this._storePublic.dispatch(new fromPublicActions.ToggleLoginScreen(false));
        },1500)
      }else if(data && !data['success']){
        this.msgClass = 'alert alert-danger';
        this.msg = data['msg'];
      }
    });
  }
  createFormLogin() {
    this.formLogin = this._formBuilder.group({
      'txtEmail': ["", Validators.compose([
        Validators.required,
        Validators.email
      ])],
      'txtPassword': ["", Validators.required]
    });
  }
  closelogin(){
    this._storePublic.dispatch(new fromPublicActions.ToggleLoginScreen(false));
    this.resetForm();
  }
  navigateToRegister(){
    this._router.navigate(['/register']);
    this._storePublic.dispatch(new fromPublicActions.ToggleLoginScreen(false));
  }
  ngOnDestroy() {
    if (this._sub) {
      this._sub.unsubscribe();
    }
  }
}
