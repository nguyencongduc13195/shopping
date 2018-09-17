import { Brand } from './../../shared/models/brand.model';
import { BrandService } from './../../shared/services/brand.service';
import { Category } from './../../shared/models/category.model';
import { CategoryService } from './../../shared/services/category.service';
import { of } from 'rxjs';
import { Product } from './../../shared/models/product.model';
import { ProductService } from './../../shared/services/product.service';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as fromPublicActions from './public.action';
import { mergeMap, map, catchError, switchMap } from 'rxjs/operators';
@Injectable()
export class PublicEffects {
    constructor(private actions$: Actions,
        private _productService: ProductService,
        private _categoryService: CategoryService,
        private _brandService: BrandService,
    ) { }
    @Effect()
    loadProductsList$ = this.actions$.ofType(fromPublicActions.PublicActionTypes.LOAD_PRODUCT_LIST)
        .pipe(
            mergeMap((action: fromPublicActions.LoadProductList) => this._productService.getAll(action.payload.pageIndex, action.payload.pageSize)
                .pipe(
                    map((products: Product[]) => (new fromPublicActions.LoadProductListSuccess(products))),
                    catchError(err => of(new fromPublicActions.LoadFail(err))))
            )
        )
    @Effect()
    loadProductDetail$ = this.actions$.ofType(fromPublicActions.PublicActionTypes.LOAD_PRODUCT_DETAIL)
        .pipe(
            mergeMap((action: fromPublicActions.LoadProductDetail) => this._productService.getOne(action.payload)
                .pipe(
                    map((product: Product) => (new fromPublicActions.LoadProductDetailSuccess(product))),
                    catchError(err => of(new fromPublicActions.LoadFail(err))))
            )
        )
    @Effect()
    loadNewestProducts$ = this.actions$.ofType(fromPublicActions.PublicActionTypes.LOAD_NEWEST_PRODUCTS)
        .pipe(
            mergeMap((action: fromPublicActions.LoadNewestProducts) => this._productService.getNewestProduct()
                .pipe(
                    map((products: Product[]) => (new fromPublicActions.LoadNewestProductsSuccess(products))),
                    catchError(err => of(new fromPublicActions.LoadFail(err))))
            )
        )
    @Effect()
    loadMostLikesProducts$ = this.actions$.ofType(fromPublicActions.PublicActionTypes.LOAD_MOST_LIKED_PRODUCTS)
        .pipe(
            mergeMap((action: fromPublicActions.LoadMostLikedProducts) => this._productService.getMostLikesProducts()
                .pipe(
                    map((products: Product[]) => (new fromPublicActions.LoadMostLikedProductsSuccess(products))),
                    catchError(err => of(new fromPublicActions.LoadFail(err))))
            )
        )
    @Effect()
    loadMostViewedProducts$ = this.actions$.ofType(fromPublicActions.PublicActionTypes.LOAD_MOST_VIEWED_PRODUCTS)
        .pipe(
            mergeMap((action: fromPublicActions.LoadMostViewedProducts) => this._productService.getMostViewed()
                .pipe(
                    map((products: Product[]) => (new fromPublicActions.LoadMostViewedProductsSuccess(products))),
                    catchError(err => of(new fromPublicActions.LoadFail(err))))
            )
        )
    @Effect()
    loadSearchProducts$ = this.actions$.ofType(fromPublicActions.PublicActionTypes.LOAD_SEARCH_PRODUCTS)
        .pipe(
            switchMap((action: fromPublicActions.LoadSearchProducts) => this._productService.searchInNavbar(action.payload)
                .pipe(
                    map((products: Product[]) => (new fromPublicActions.LoadSearchProductsSuccess(products))),
                    catchError(err => of(new fromPublicActions.LoadFail(err))))
            )
        )
    @Effect()
    loadCategoires$ = this.actions$.ofType(fromPublicActions.PublicActionTypes.LOAD_CATEGORIES)
        .pipe(
            switchMap((action: fromPublicActions.LoadCategories) => this._categoryService.getAllCategories()
                .pipe(
                    map((categories: Category[]) => (new fromPublicActions.LoadCategoriesSuccess(categories))),
                    catchError(err => of(new fromPublicActions.LoadFail(err))))
            )
        )
    @Effect()
    loadRelatedProducts$ = this.actions$.ofType(fromPublicActions.PublicActionTypes.LOAD_RELATED_PRODUCTS)
        .pipe(
            switchMap((action: fromPublicActions.LoadRelatedProducts) => this._productService.getRelatedProduct(action.payload)
                .pipe(
                    map((products: Product[]) => (new fromPublicActions.LoadRelatedProductsSuccess(products))),
                    catchError(err => of(new fromPublicActions.LoadFail(err))))
            )
        )
    @Effect()
    loadBrands$ = this.actions$.ofType(fromPublicActions.PublicActionTypes.LOAD_BRANDS)
        .pipe(
            switchMap((action: fromPublicActions.LoadBrands) => this._brandService.getAll()
                .pipe(
                    map((brands: Brand[]) => (new fromPublicActions.LoadBrandsSuccess(brands))),
                    catchError(err => of(new fromPublicActions.LoadFail(err))))
            )
        )
    @Effect()
    filterProductsByCategory$ = this.actions$.ofType(fromPublicActions.PublicActionTypes.FILTER_PRODUCTS_BY_CATEGORY)
        .pipe(
            switchMap((action: fromPublicActions.FilterProductsByCategory) => this._categoryService.getProductByCategories(action.payload)
                .pipe(
                    map((products: Product[]) => (new fromPublicActions.FilterProductsByCategorySuccess(products))),
                    catchError(err => of(new fromPublicActions.LoadFail(err)))
                )
            )
        )
    @Effect()
    filterProductsByBrand$ = this.actions$.ofType(fromPublicActions.PublicActionTypes.FILTER_PRODUCTS_BY_BRAND)
        .pipe(
            switchMap((action: fromPublicActions.FilterProductsByBrand) => this._brandService.getProductByBrand(action.payload)
                .pipe(
                    map((products: Product[]) => (new fromPublicActions.FilterProductsByBrandSuccess(products))),
                    catchError(err => of(new fromPublicActions.LoadFail(err)))
                )
            )
        )
    @Effect()
    filterProductsByColor$ = this.actions$.ofType(fromPublicActions.PublicActionTypes.FILTER_PRODUCTS_BY_COLOR)
        .pipe(
            switchMap((action: fromPublicActions.FilterProductsByColor) => this._productService.getProductsByColor(action.payload)
                .pipe(
                    map((products: Product[]) => (new fromPublicActions.FilterProductsByColorSuccess(products))),
                    catchError(err => of(new fromPublicActions.LoadFail(err)))
                )
            )
        )
    @Effect()
    filterProductsByPrice$ = this.actions$.ofType(fromPublicActions.PublicActionTypes.FILTER_PRODUCTS_BY_PRICE)
        .pipe(
            switchMap((action: fromPublicActions.FilterProductsByPrice) => this._productService.getProductsByPrice(action.payload)
                .pipe(
                    map((products: Product[]) => (new fromPublicActions.FilterProductsByPriceSuccess(products))),
                    catchError(err => of(new fromPublicActions.LoadFail(err)))
                )
            )
        )
}