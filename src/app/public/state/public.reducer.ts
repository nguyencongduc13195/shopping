import { Category } from './../../shared/models/category.model';
import { CartItem } from './../../shared/models/cart.model';
import { Product } from './../../shared/models/product.model';
import { PublicActions, PublicActionTypes } from './public.action';
import { createFeatureSelector, createSelector } from '@ngrx/store';
export interface PublicState {
    showSearchScreen: boolean;
    showLoginScreen: boolean;
    showQuickViewScreen: boolean;
    showConfirmwScreen: boolean;
    currentProduct: Product;
    quickViewProduct: Product;
    product_detail: Product;
    products_newest: Product[];
    products_mostViewed: Product[];
    products_mostLiked: Product[];
    products_loved: Product[];
    product_list: any[];
    products_search: Product[];
    related_products: Product[];
    categories: Category[];
    cart: CartItem[];
    error: string;
    currentPage: string;
    filter: any;
    viewMode: string;
    homePageLoaded: boolean;
    productDetailPageLoaded: boolean;
}
const initialState: PublicState = {
    showSearchScreen: false,
    showLoginScreen: false,
    showQuickViewScreen: false,
    showConfirmwScreen: false,
    currentProduct: null,
    quickViewProduct: null,
    product_detail: null,
    products_newest: [],
    products_mostViewed: [],
    products_mostLiked: [],
    products_loved: [],
    product_list: [],
    related_products: [],
    products_search: [],
    categories: [],
    cart: [],
    error: '',
    currentPage: '',
    filter: 1,
    viewMode: 'grid',
    homePageLoaded: false,
    productDetailPageLoaded: false
}
const getPublicFeatureState = createFeatureSelector<PublicState>('public');
export const getShowSearchScreen = createSelector(getPublicFeatureState, state => state.showSearchScreen);
export const getShowQuickViewScreen = createSelector(getPublicFeatureState, state => state.showQuickViewScreen);
export const getShowLoginScreen = createSelector(getPublicFeatureState, state => state.showLoginScreen);
export const getShowConfirmwScreen = createSelector(getPublicFeatureState, state => state.showConfirmwScreen);
export const getQuickViewProduct = createSelector(getPublicFeatureState, state => state.quickViewProduct);
export const getCurrentProduct = createSelector(getPublicFeatureState, state => state.currentProduct);
export const getNewestProducts = createSelector(getPublicFeatureState, state => state.products_newest);
export const getMostViewedProducts = createSelector(getPublicFeatureState, state => state.products_mostViewed);
export const getLovedProducts = createSelector(getPublicFeatureState, state => state.products_loved);
export const getMostLikedProducts = createSelector(getPublicFeatureState, state => state.products_mostLiked);
export const getSearchProducts = createSelector(getPublicFeatureState, state => state.products_search);
export const getCart = createSelector(getPublicFeatureState, state => state.cart);
export const getProductList = createSelector(getPublicFeatureState, state => state.product_list);
export const getCategoriesList = createSelector(getPublicFeatureState, state => state.categories);
export const getFilter = createSelector(getPublicFeatureState, state => state.filter);
export const getCurrentPage = createSelector(getPublicFeatureState, state => state.currentPage);
export const getProductDetail = createSelector(getPublicFeatureState, state => state.product_detail);
export const getViewMode = createSelector(getPublicFeatureState, state => state.viewMode);
export const getHomePageLoaded = createSelector(getPublicFeatureState, state => state.homePageLoaded);
export const getRelatedProducts = createSelector(getPublicFeatureState, state => state.related_products);
export const getProductDetailPageLoaded = createSelector(getPublicFeatureState, state => state.productDetailPageLoaded);
export const getError = createSelector(getPublicFeatureState, state => state.error);
export function publicReducer(state = initialState, action: PublicActions): PublicState {
    switch (action.type) {
        case PublicActionTypes.FILTER:
            return {
                ...state,
                filter: action.payload
            }
        case PublicActionTypes.VIEW_MODE:
            return {
                ...state,
                viewMode: action.payload
            }
        case PublicActionTypes.FILTER_BY_NAME:
            return {
                ...state,
                filter: action.payload
            }
        case PublicActionTypes.TOGGLE_SEARCH_SCREEN:
            return {
                ...state,
                showSearchScreen: action.payload
            }
        case PublicActionTypes.TOGGLE_CONFIRM_SCREEN:
            return {
                ...state,
                showConfirmwScreen: action.payload
            }
        case PublicActionTypes.TOGGLE_LOGIN_SCREEN:
            return {
                ...state,
                showLoginScreen: action.payload
            }
        case PublicActionTypes.TOGGLE_QUICK_VIEW_SCREEN:
            return {
                ...state,
                showQuickViewScreen: action.payload
            }
        case PublicActionTypes.QUICK_VIEW_PRODUCT:
            return {
                ...state,
                quickViewProduct: action.payload
            }
        case PublicActionTypes.CLEAR_QUICK_VIEW_PRODUCT:
            return {
                ...state,
                quickViewProduct: null
            }
        case PublicActionTypes.LOAD_CATEGORIES_SUCCESS:
            return {
                ...state,
                product_list: action.payload
            }
        case PublicActionTypes.LOAD_RELATED_PRODUCTS_SUCCESS:
            return {
                ...state,
                related_products: action.payload
            }
        case PublicActionTypes.FILTER_PRODUCTS_BY_CATEGORY_SUCCESS:
            return {
                ...state,
                product_list: action.payload
            }
        case PublicActionTypes.FILTER_PRODUCTS_BY_PRICE_SUCCESS:
            return {
                ...state,
                product_list: action.payload
            }
        case PublicActionTypes.FILTER_PRODUCTS_BY_BRAND_SUCCESS:
            return {
                ...state,
                product_list: action.payload
            }
        case PublicActionTypes.FILTER_PRODUCTS_BY_COLOR_SUCCESS:
            return {
                ...state,
                product_list: action.payload
            }
        case PublicActionTypes.LOVE_PRODUCT:
            let fitem = state.products_loved.find((item) => item._id === action.payload._id);
            if (fitem) {
                alert('EXIST')
            } else {
                state.products_loved.push(action.payload);
            }
            return {
                ...state,
                products_loved: state.products_loved
            }
        case PublicActionTypes.LOAD_SEARCH_PRODUCTS_SUCCESS:
            return {
                ...state,
                products_search: action.payload
            }
        case PublicActionTypes.CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.payload
            }
        case PublicActionTypes.LOAD_NEWEST_PRODUCTS_SUCCESS:
            return {
                ...state,
                products_newest: action.payload
            }
        case PublicActionTypes.LOAD_MOST_VIEWED_PRODUCTS_SUCCESS:
            return {
                ...state,
                products_mostViewed: action.payload
            }
        case PublicActionTypes.LOAD_MOST_LIKED_PRODUCTS_SUCCESS:
            return {
                ...state,
                products_mostLiked: action.payload
            }
        case PublicActionTypes.LOAD_PRODUCT_LIST_SUCCESS:
            return {
                ...state,
                product_list: action.payload
            }
        case PublicActionTypes.LOAD_PRODUCT_DETAIL_SUCCESS:
            return {
                ...state,
                product_detail: action.payload
            }
        case PublicActionTypes.HOME_PAGE_LOADED:
            return {
                ...state,
                homePageLoaded: action.payload
            }
        case PublicActionTypes.PRODUCT_DETAIL_PAGE_LOADED:
            return {
                ...state,
                productDetailPageLoaded: action.payload
            }
        case PublicActionTypes.LOAD_FAIL:
            return {
                ...state,
                product_list: [],
                error: action.payload
            }
        default:
            return state;
    }
}