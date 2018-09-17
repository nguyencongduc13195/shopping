import { Category } from './../../shared/models/category.model';
import { CartItem } from './../../shared/models/cart.model';
import { Product } from './../../shared/models/product.model';
import { Action } from "@ngrx/store";
import { Brand } from '../../shared/models/brand.model';

export enum PublicActionTypes {
    TOGGLE_SEARCH_SCREEN = "[Public] Toggle Search Screen",
    TOGGLE_LOGIN_SCREEN = "[Public] Toggle Login Screen",
    TOGGLE_QUICK_VIEW_SCREEN = "[Public] Toggle Quick View Screen",
    TOGGLE_CONFIRM_SCREEN = "[Public] Toggle Confirm Screen",
    ClearCurrentProduct = "[Public] Clear Current Product",
    InitializeCurrentProduct = "[Public] Initialize Current Product",
    CURRENT_PAGE = "[Public] Current Page",
    QUICK_VIEW_PRODUCT = "[Public] Quick View Product",
    VIEW_MODE = "[Public] View Mode",
    CLEAR_QUICK_VIEW_PRODUCT = "[Public] Clear Quick View Product",
    LOVE_PRODUCT = "[Public] Love Product",
    ADD_CART = "[Public] Add Cart",
    
    LOAD_PRODUCT_LIST = "[Public] Load Product List",
    LOAD_PRODUCT_LIST_SUCCESS = "[Public] Load Product List Success",

    LOAD_PRODUCT_DETAIL = "[Public] Load Product Detail",
    LOAD_PRODUCT_DETAIL_SUCCESS = "[Public] Load Product Detail Success",

    LOAD_NEWEST_PRODUCTS = "[Public] Load Newest Products",
    LOAD_NEWEST_PRODUCTS_SUCCESS = "[Public] Load Newest Products Success",

    LOAD_MOST_VIEWED_PRODUCTS = "[Public] Load Most Viewed Products",
    LOAD_MOST_VIEWED_PRODUCTS_SUCCESS = "[Public] Load Most Viewed Products Success",

    LOAD_MOST_LIKED_PRODUCTS = "[Public] Load Most Liked Products",
    LOAD_MOST_LIKED_PRODUCTS_SUCCESS = "[Public] Load Most Liked Products Success",

    LOAD_SEARCH_PRODUCTS = "[Public] Load Search Products",
    LOAD_SEARCH_PRODUCTS_SUCCESS = "[Public] Load Search Products Success",

    LOAD_CATEGORIES = '[Public] Load Categories',
    LOAD_CATEGORIES_SUCCESS = '[Public] Load Categories Success',

    FILTER_PRODUCTS_BY_CATEGORY = '[Public] Load Products By Category',
    FILTER_PRODUCTS_BY_CATEGORY_SUCCESS = '[Public] Load Products By Category Success',

    FILTER_PRODUCTS_BY_BRAND = '[Public] Load Products By Brand',
    FILTER_PRODUCTS_BY_BRAND_SUCCESS = '[Public] Load Products By Brand Success',

    FILTER_PRODUCTS_BY_COLOR = '[Public] Load Products By Color',
    FILTER_PRODUCTS_BY_COLOR_SUCCESS = '[Public] Load Products By Color Success',

    FILTER_PRODUCTS_BY_PRICE = '[Public] Filter Products By Price',
    FILTER_PRODUCTS_BY_PRICE_SUCCESS = '[Public] Filter Products By Price Success',

    LOAD_RELATED_PRODUCTS = '[Public] Load Related Products',
    LOAD_RELATED_PRODUCTS_SUCCESS = '[Public] Load Related Products Success',

    LOAD_BRANDS = '[Public] Load Brands',
    LOAD_BRANDS_SUCCESS = '[Public] Load Brands Success',

    FILTER = '[Public] Filter',
    FILTER_BY_NAME = '[Public] Filter By Name',

    LOAD_FAIL = "[Public] Load Fail",

    HOME_PAGE_LOADED = '[Public] Home Page Loaded',
    PRODUCT_DETAIL_PAGE_LOADED = '[Public] Product Detail Page Loaded',
}
// 
export class ToggleSearchScreen implements Action {
    readonly type = PublicActionTypes.TOGGLE_SEARCH_SCREEN;
    constructor(public payload: boolean) { }
}
export class ToggleLoginScreen implements Action {
    readonly type = PublicActionTypes.TOGGLE_LOGIN_SCREEN;
    constructor(public payload: boolean) { }
}
export class ToggleQuickViewScreen implements Action {
    readonly type = PublicActionTypes.TOGGLE_QUICK_VIEW_SCREEN;
    constructor(public payload: boolean) { }
}
export class ToggleConfirmScreen implements Action {
    readonly type = PublicActionTypes.TOGGLE_CONFIRM_SCREEN;
    constructor(public payload: boolean) { }
}
export class QuickViewProduct implements Action{
    readonly type = PublicActionTypes.QUICK_VIEW_PRODUCT;
    constructor(public payload: Product){}
}
export class ViewMode implements Action{
    readonly type = PublicActionTypes.VIEW_MODE;
    constructor(public payload: string){}
}
export class ClearQuickViewProduct implements Action{
    readonly type = PublicActionTypes.CLEAR_QUICK_VIEW_PRODUCT;
}
export class Filter implements Action{
    readonly type = PublicActionTypes.FILTER;
    constructor(public payload: number){}
}
export class FilterByName implements Action{
    readonly type = PublicActionTypes.FILTER_BY_NAME;
    constructor(public payload: string){}
}
// 
export class ClearCurrentProduct implements Action {
    readonly type = PublicActionTypes.ClearCurrentProduct;
}
export class InitializeCurrentProduct implements Action {
    readonly type = PublicActionTypes.InitializeCurrentProduct;
}
// 
export class LoveProduct implements Action{
    readonly type = PublicActionTypes.LOVE_PRODUCT;
    constructor(public payload: Product){}
}
export class AddCart implements Action{
    readonly type = PublicActionTypes.ADD_CART;
    constructor(public payload: CartItem){}
}
// 
export class LoadCategories implements Action{
    readonly type = PublicActionTypes.LOAD_CATEGORIES;
}
export class LoadCategoriesSuccess implements Action{
    readonly type = PublicActionTypes.LOAD_CATEGORIES_SUCCESS;
    constructor(public payload: Category[]){}
}
export class LoadBrands implements Action{
    readonly type = PublicActionTypes.LOAD_BRANDS;
}
export class LoadBrandsSuccess implements Action{
    readonly type = PublicActionTypes.LOAD_BRANDS_SUCCESS;
    constructor(public payload: Brand[]){}
}
export class FilterProductsByCategory implements Action{
    readonly type = PublicActionTypes.FILTER_PRODUCTS_BY_CATEGORY;
    constructor(public payload: string){};
}
export class FilterProductsByCategorySuccess implements Action{
    readonly type = PublicActionTypes.FILTER_PRODUCTS_BY_CATEGORY_SUCCESS;
    constructor(public payload: Product[]){};
}
export class FilterProductsByBrand implements Action{
    readonly type = PublicActionTypes.FILTER_PRODUCTS_BY_BRAND;
    constructor(public payload: string){};
}
export class FilterProductsByBrandSuccess implements Action{
    readonly type = PublicActionTypes.FILTER_PRODUCTS_BY_BRAND_SUCCESS;
    constructor(public payload: Product[]){};
}
export class FilterProductsByColor implements Action{
    readonly type = PublicActionTypes.FILTER_PRODUCTS_BY_COLOR;
    constructor(public payload: string){};
}
export class FilterProductsByColorSuccess implements Action{
    readonly type = PublicActionTypes.FILTER_PRODUCTS_BY_COLOR_SUCCESS;
    constructor(public payload: Product[]){};
}
export class FilterProductsByPrice implements Action{
    readonly type = PublicActionTypes.FILTER_PRODUCTS_BY_PRICE;
    constructor(public payload: number){};
}
export class FilterProductsByPriceSuccess implements Action{
    readonly type = PublicActionTypes.FILTER_PRODUCTS_BY_PRICE_SUCCESS;
    constructor(public payload: Product[]){};
}
// 
export class LoadProductList implements Action {
    readonly type = PublicActionTypes.LOAD_PRODUCT_LIST;
    constructor(public payload: any){}
}
export class LoadRelatedProducts implements Action {
    readonly type = PublicActionTypes.LOAD_RELATED_PRODUCTS;
    constructor(public payload: string){}
}
export class LoadProductDetail implements Action {
    readonly type = PublicActionTypes.LOAD_PRODUCT_DETAIL;
    constructor(public payload: string){}
}
export class LoadMostLikedProducts implements Action {
    readonly type = PublicActionTypes.LOAD_MOST_LIKED_PRODUCTS;
}
export class LoadMostViewedProducts implements Action {
    readonly type = PublicActionTypes.LOAD_MOST_VIEWED_PRODUCTS;
}
export class LoadNewestProducts implements Action {
    readonly type = PublicActionTypes.LOAD_NEWEST_PRODUCTS;
}
export class LoadSearchProducts implements Action {
    readonly type = PublicActionTypes.LOAD_SEARCH_PRODUCTS;
    constructor(public payload: string) { }
}
// 
export class LoadNewestProductsSuccess implements Action {
    readonly type = PublicActionTypes.LOAD_NEWEST_PRODUCTS_SUCCESS;
    constructor(public payload: Product[]) { }
}
export class LoadMostViewedProductsSuccess implements Action {
    readonly type = PublicActionTypes.LOAD_MOST_VIEWED_PRODUCTS_SUCCESS;
    constructor(public payload: Product[]) { }
}
export class LoadMostLikedProductsSuccess implements Action {
    readonly type = PublicActionTypes.LOAD_MOST_LIKED_PRODUCTS_SUCCESS;
    constructor(public payload: Product[]) { }
}
export class LoadProductListSuccess implements Action {
    readonly type = PublicActionTypes.LOAD_PRODUCT_LIST_SUCCESS;
    constructor(public payload: Product[]) { }
}
export class LoadSearchProductsSuccess implements Action {
    readonly type = PublicActionTypes.LOAD_SEARCH_PRODUCTS_SUCCESS;
    constructor(public payload: Product[]){}
}
export class LoadProductDetailSuccess implements Action {
    readonly type = PublicActionTypes.LOAD_PRODUCT_DETAIL_SUCCESS;
    constructor(public payload: Product){}
}
export class LoadRelatedProductsSuccess implements Action {
    readonly type = PublicActionTypes.LOAD_RELATED_PRODUCTS_SUCCESS;
    constructor(public payload: Product[]){}
}
// 
export class LoadFail implements Action {
    readonly type = PublicActionTypes.LOAD_FAIL;
    constructor(public payload: string) { }
}
// 
export class CurrentPage implements Action {
    readonly type = PublicActionTypes.CURRENT_PAGE;
    constructor(public payload: string) { }
}
export class HomePageLoaded implements Action {
    readonly type = PublicActionTypes.HOME_PAGE_LOADED;
    constructor(public payload: boolean) { }
}
export class ProductDetailPageLoaded implements Action {
    readonly type = PublicActionTypes.PRODUCT_DETAIL_PAGE_LOADED;
    constructor(public payload: boolean) { }
}
// 
export type PublicActions = ToggleQuickViewScreen | ToggleSearchScreen | ToggleLoginScreen | ToggleConfirmScreen
| ClearCurrentProduct 
| QuickViewProduct | ClearQuickViewProduct | Filter | FilterByName | ViewMode
| InitializeCurrentProduct 
| LoadMostLikedProducts | LoadMostViewedProducts | LoadNewestProducts | LoadSearchProducts
| LoadProductList | LoveProduct
| LoadFail | CurrentPage 
| LoadNewestProductsSuccess | LoadProductListSuccess | LoadMostLikedProductsSuccess | LoadMostViewedProductsSuccess
| LoadSearchProductsSuccess | LoadProductDetailSuccess | LoadProductDetail
| AddCart
| LoadCategories | LoadCategoriesSuccess | LoadBrands | LoadBrandsSuccess
| FilterProductsByCategory | FilterProductsByCategorySuccess | FilterProductsByBrand | FilterProductsByBrandSuccess
| FilterProductsByColor | FilterProductsByColorSuccess
| FilterProductsByPrice | FilterProductsByPriceSuccess
| HomePageLoaded | ProductDetailPageLoaded | LoadRelatedProductsSuccess | LoadRelatedProducts
; 