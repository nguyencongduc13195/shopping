import { Component, OnInit, ViewChild, OnDestroy, DoCheck } from '@angular/core';
import { CartService } from './../../../shared/services/cart.service';
import { UserService } from './../../../shared/services/user.service';
import { Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { User } from './../../../shared/models/user.model';
import { Product } from './../../../shared/models/product.model';
import { ProductService } from './../../../shared/services/product.service';
import { Store, select } from '@ngrx/store';
import * as fromPublicActions from '../../state/public.action';
import * as fromPublicReducer from '../../state/public.reducer';
import * as fromAuthActions from '../../state//auth/auth.action';
import * as fromAuthReducer from '../../state/auth/auth.reducer';
import { CartItem } from '../../../shared/models/cart.model';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy, DoCheck {
	constructor(
		private _cartService: CartService,
		private _router: Router,
		private _userService: UserService,
		private _productService: ProductService,
		private _storePublic: Store<fromPublicReducer.PublicState>,
		private _storeAuth: Store<fromAuthReducer.AuthState>,
	) { }
	
	private _sub: Subscription;
	public totalQty: number = 0;
	public totalQtyLoveProduct: number = 0;
	public totalQtyLoveProducts: Product[] = [];
	public isShowCart: boolean;
	public isShowAccount: boolean;
	public cart: CartItem[] = [];
	public totalPrice: number;
	ngOnInit() {
		this._sub = this._storePublic.pipe(select(fromPublicReducer.getLovedProducts)).subscribe(x => this.totalQtyLoveProducts = x);
		this.cart = this._cartService.items;
		this.loadInformation();
	}
	ngDoCheck() {
		this.totalQty = this._cartService.totalQty;
		// this.isLogging = this._userService.loggedIn();
		this.isAdmin = localStorage.getItem('role') || '';
		this._userService.isAdmin = localStorage.getItem('role') === '1301' ? true : false;
		this.totalQtyLoveProduct = this._productService.loveProducts.length;
		this.totalPrice = this._cartService.total();
	}
	public isOpenModal: boolean;
	openModalLogin(){
		this.isOpenModal = true;
	}
	getCloseModal(event){
		this.isOpenModal = event;
	}
	// 
	showOptionsNavbar(value: string){
		if(value === 'cart'){
			this.isShowAccount = false;
		}else if(value === 'account'){
			this.isShowCart = false;
		}
	}
	// 
	public searchNavbar: Product[] = [];
	@ViewChild('search') search;
	onChange(event) {
		if (event.target.value) {
			this._sub = this._productService.searchInNavbar(event.target.value).subscribe((data: Product[]) => {
				if (data['success']) {
					this.searchNavbar = data['data'];
				}
			});
		} else {
			this.searchNavbar = [];
		}
	}
	// 
	navigateToProduct(slug) {
		this.searchNavbar = [];
		this._router.navigate(['/san-pham', slug]);
		this.search.nativeElement.value = '';
	}
	// 
	onSearchEvent() {
		// this._router.navigate(['/tim-kiem'],{queryParams: {key: value}});
		// this._router.navigate(['/'],{queryParams: {key: value}});
		// this.searchNavbar = [];
		// this.search.nativeElement.value = '';
		this._storePublic.dispatch(new fromPublicActions.ToggleSearchScreen(true));
	}

	public isAdmin: string;
	public user: User = new User;
	public authenticated$: Observable<boolean>;
	loadInformation() {
		this._sub = this._storeAuth.pipe(select(fromAuthReducer.getCurrentUser)).subscribe(x=>{
			if(x){
				this.user = x['user'];
			}else{
				this.user = null;
			}
		});
		this.authenticated$ = this._storeAuth.pipe(select(fromAuthReducer.Authenticated));
	}
	// 
	navigateToLove() {
		if (this._productService.loveProducts.length > 0) {
			this._router.navigate(['/tim-kiem'], { queryParams: { 'yeu-thich': 'true' } });
		} else {
			alert('Bạn chưa có sản phẩm yêu thích');
		}
	}
	// 
	goToCheckOutPage(){
		if(this._cartService.items.length > 0){
			this._router.navigate(['/order']);
		}
		else{
			alert('Your cart is currently empty.');
		}
	}
	logOutEvent(){
		this._storeAuth.dispatch(new fromAuthActions.LogOut());
		this._router.navigate(['/']);
	}
	removeItem(item: CartItem){
		this._cartService.removeItem(item);
	}
	// 
	openLoginScreen(){
		this._storePublic.dispatch(new fromPublicActions.ToggleLoginScreen(true));
	}
	// out
	ngOnDestroy() {
		if (this._sub) {
			this._sub.unsubscribe();
		}
	}
}

