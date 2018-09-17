import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// services
import { CategoryService } from './../shared/services/category.service';
import { AuthorService } from './../shared/services/author.service';
import { BrandService } from './../shared/services/brand.service';
import { ProductService } from './../shared/services/product.service';
import { CartService } from './../shared/services/cart.service';
import { OrderService } from './../shared/services/order.service';
import { UserService } from './../shared/services/user.service';
import { AlertService } from './../shared/services/alert.service';
// pipes
import { SummaryPipe } from './../shared/pipes/summary.pipe';
// guard
import { NotorderGuard } from './../shared/services/notorder.guard';
import { NotauthGuard } from './../shared/services/notauth.guard';
import { AuthGuard } from './../shared/services/auth.guard';
// components
import { PublicComponent } from './public.component';
import { AlertComponent } from './components/alert/alert.component';
import { BrandComponent } from './components/brand/brand.component';
import { CategoryComponent } from './components/category/category.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { FooterComponent } from './components/footer/footer.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { InfoUserComponent } from './components/info-user/info-user.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { OrderComponent } from './components/order/order.component';
import { OrderInfoComponent } from './components/order-info/order-info.component';
import { OrderItemComponent } from './components/order-item/order-item.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { RatingComponent } from './components/rating/rating.component';
import { RegisterComponent } from './components/register/register.component';
import { RelatedProductComponent } from './components/related-product/related-product.component';
import { HomeComponent } from './components/home/home.component';
import { GenderComponent } from './components/gender/gender.component';
import { SearchComponent } from './components/search/search.component';
import { QuickviewComponent } from './components/quickview/quickview.component';
import { SliderComponent } from './components/slider/slider.component';
import { MenuComponent } from './components/menu/menu.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { DiffirentProductComponent } from './components/diffirent-product/diffirent-product.component';
import { FunctionComponent } from './components/function/function.component';
import { CartComponent } from './components/cart/cart.component';
import { SearchScreenComponent } from './components/search-screen/search-screen.component';
import { ServicesComponent } from './components/services/services.component';
import { ProductsComponent } from './components/products/products.component';
import { BannerComponent } from './components/banner/banner.component';
import { CategoriesContentComponent } from './components/categories/categories-content/categories-content.component';
import { CategoriesFilterComponent } from './components/categories/categories-filter/categories-filter.component';
import { ContactComponent } from './components/contact/contact.component';
import { AboutComponent } from './components/about/about.component';
import { Footer1Component } from './components/footer-1/footer-1.component';
import { Footer2Component } from './components/footer-2/footer-2.component';
import { CategoriesTopbarComponent } from './components/categories/categories-topbar/categories-topbar.component';
import { CategoriesPaginationComponent } from './components/categories/categories-pagination/categories-pagination.component';
import { ProductComponent } from './components/product/product.component';
import { RelatedComponent } from './components/product/related/related.component';
import { QuickviewScreenComponent } from './components/quickview-screen/quickview-screen.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { CartContentComponent } from './components/cart/cart-content/cart-content.component';
import { ProductContentComponent } from './components/product/product-content/product-content.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { CheckoutInfoComponent } from './components/checkout/checkout-info/checkout-info.component';
import { CheckoutReviewComponent } from './components/checkout/checkout-review/checkout-review.component';
// ngrx
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { publicReducer } from './state/public.reducer';
import { authReducer } from './state//auth/auth.reducer';
import { AuthEffects } from './state/auth/auth.effect';
import { PublicEffects } from './state/public.effects';
import { LoginScreenComponent } from './components/login-screen/login-screen.component';
import { ConfirmScreenComponent } from './components/confirm-screen/confirm-screen.component';


// routes
const publicRoutes: Routes = [
	{
		path: '', component: PublicComponent, children: [
			{ path: '', component: HomeComponent, pathMatch: 'full' },
			{ path: 'danh-muc/:slug', component: CategoryComponent },
			{ path: 'categories', component: CategoriesComponent },
			{ path: 'product/:slug', component: ProductComponent },
			{ path: 'contact', component: ContactComponent },
			{ path: 'about-us', component: AboutComponent },
			// { path: 'checkout', component: CheckoutComponent , canActivate: [NotauthGuard, NotorderGuard]},
			{ path: 'checkout', component: CheckoutComponent , canActivate: [NotauthGuard]},
			{ path: 'my-info', component: InfoUserComponent, canActivate: [NotauthGuard] },
			{ path: 'cart', component: CartComponent, canActivate: [NotorderGuard] },

			{ path: 'nha-san-xuat/:slug', component: BrandComponent },
			{ path: 'tim-kiem', component: SearchComponent },
			{ path: 'gioi-tinh/:gender', component: GenderComponent },
			{ path: 'san-pham/:slug', component: ProductDetailComponent },
			{ path: 'order', component: OrderComponent, canActivate: [NotorderGuard] },
			{ path: 'dang-ky', component: RegisterComponent, canActivate: [AuthGuard] },
			{ path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },
			{ path: 'thong-tin', component: InfoUserComponent, canActivate: [NotauthGuard] },
			{ path: 'quen-mat-khau', component: ForgotPasswordComponent, canActivate: [AuthGuard] }
		]
	}
]
@NgModule({
  imports: [
    CommonModule,
		HttpClientModule,
		ReactiveFormsModule,
		FormsModule,
		ModalModule.forRoot(),
		RouterModule.forChild(publicRoutes),
		BrowserAnimationsModule,
		StoreModule.forFeature('public', publicReducer),
		StoreModule.forFeature('auth', authReducer),
		EffectsModule.forFeature([PublicEffects,AuthEffects])
  ],
  declarations: [
    PublicComponent,
		AlertComponent,
		BrandComponent,
		CategoryComponent,
		FooterComponent,
		ForgotPasswordComponent,
		InfoUserComponent,
		NavbarComponent,
		OrderComponent,
		OrderInfoComponent,
		OrderItemComponent,
		ProductDetailComponent,
		RatingComponent,
		RegisterComponent,
		RelatedProductComponent,
		SummaryPipe,
		SliderComponent,
		HomeComponent,
		MenuComponent,
		BreadcrumbComponent,
		DiffirentProductComponent,
		FunctionComponent,
		GenderComponent,
		CartComponent,
		SearchComponent,
		QuickviewComponent,
		SearchScreenComponent,
		ServicesComponent,
		ProductsComponent,
		BannerComponent,
		CategoriesComponent,
		CategoriesContentComponent,
		CategoriesFilterComponent,
		CategoriesTopbarComponent,
		CategoriesPaginationComponent,
		ContactComponent,
		AboutComponent,
		Footer1Component,
		Footer2Component,
		ProductComponent,
		RelatedComponent,
		QuickviewScreenComponent,
		ProductListComponent,
		CartContentComponent,
		ProductContentComponent,
		CheckoutComponent,
		CheckoutInfoComponent,
		CheckoutReviewComponent,
		LoginScreenComponent,
		ConfirmScreenComponent,
  ],
	providers: [
		CategoryService,
		ProductService,
		UserService,
		CartService,
		BrandService,
		AuthorService,
		AlertService,
		OrderService,
		NotorderGuard,
		NotauthGuard,
		AuthGuard
	]
})
export class PublicModule { }
