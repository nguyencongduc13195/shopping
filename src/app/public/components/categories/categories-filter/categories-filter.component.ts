import { Brand } from './../../../../shared/models/brand.model';
import { BrandService } from './../../../../shared/services/brand.service';
import { CategoryService } from './../../../../shared/services/category.service';
import { Category } from './../../../../shared/models/category.model';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromPublicAction from '../../../state/public.action';
import * as fromPublicReducer from '../../../state/public.reducer';
@Component({
  selector: 'app-categories-filter',
  templateUrl: './categories-filter.component.html',
  styleUrls: ['../categories.component.scss']
})
export class CategoriesFilterComponent implements OnInit, OnDestroy {

  constructor(private _store: Store<fromPublicReducer.PublicState>,
    private _categoryService: CategoryService,
    private _brandService: BrandService
  ) { }
  private _sub: Subscription;

  ngOnInit() {
    this.loadCategories();
    this.loadBrands();
  }

  // categories
  public filterCategoriesArray: any[] = [];
  public categories: Category[] = [];
  public cateMenu: any[] = [];
  loadCategories() {
    this._sub = this._categoryService.getAllCategories().subscribe((data) => {
      if (data['success']) {
        this.categories = data['data'];
        this.categories.forEach((val) => {
          this._categoryService.productsOfCate(val._id).subscribe((data) => {
            if (data['success']) {
              let item: {} = { name: val.name, item: data['data'], slug: val.slug }
              this.cateMenu.push(item);
            }
          })
        })
      }
    });
  }
  filterByCategory(value: string) {
    this.filterCategoriesArray = [];
    this.filterCategoriesArray.push(value);
    // this._store.dispatch(new fromPublicAction.FilterProductsByCategory(value));
  }
  // brands
  public filterBrandsArray: any[] = [];
  public brands: Brand[] = [];
  public idBrands: number[] = [];
  public brandMenu: any[] = [];
  loadBrands() {
    this._sub = this._brandService.getAll().subscribe((data) => {
      if (data['success']) {
        this.brands = data['data'];
        this.brands.forEach((val) => {
          this._brandService.productsOfBrand(val._id).subscribe((data) => {
            if (data['success']) {
              let item: {} = { name: val.name, item: data['data'], slug: val.slug }
              this.brandMenu.push(item)
            }
          })
        })
      }
    });
  }
  filterByBrand(value: string) {
    this.filterBrandsArray = [];
    this.filterBrandsArray.push(value);
    // this._store.dispatch(new fromPublicAction.FilterProductsByBrand(value));
  }
  //color
  public filterColorArray: any[] = [];
  public colorArray: string[] = ['White', 'Blue', 'Yellow', 'Red', 'Pink'];
  filterByColor(value: string) {
    this.filterColorArray = [];
    this.filterColorArray.push(value);
    // this._store.dispatch(new fromPublicAction.FilterProductsByColor(value));
  }
  // 
  filter(type: string, value: string) {
    if (type === 'category') {
      this.filterCategoriesArray = [];
      this.filterCategoriesArray.push(value);
      this._store.dispatch(new fromPublicAction.FilterProductsByCategory(value));
    } else if (type === 'brand') {
      this.filterBrandsArray = [];
      this.filterBrandsArray.push(value);
      this._store.dispatch(new fromPublicAction.FilterProductsByBrand(value));
    } else {
      this.filterColorArray = [];
      this.filterColorArray.push(value);
      this._store.dispatch(new fromPublicAction.FilterProductsByColor(value));
    }
  }
  // 
  public currentMoney: number = 0;
  onChangePrice(event) {
    this.currentMoney = parseInt(event.target.value);
    if (this.currentMoney !== 0) {
      this._store.dispatch(new fromPublicAction.FilterProductsByPrice(this.currentMoney));
    } else {
      this._store.dispatch(new fromPublicAction.LoadProductList({ pageIndex: 1, pageSize: 6 }));
    }
  }
  // 
  ngOnDestroy() {
    if (this._sub) {
      this._sub.unsubscribe();
    }
  }
}
