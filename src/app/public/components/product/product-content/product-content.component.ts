import { CartService } from './../../../../shared/services/cart.service';
import { ProductService } from './../../../../shared/services/product.service';
import { User } from './../../../../shared/models/user.model';
import { Review } from './../../../../shared/models/review.model';
import { Product } from './../../../../shared/models/product.model';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy, OnChanges, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-product-content',
  templateUrl: './product-content.component.html',
  styleUrls: ['../product.component.scss']
})
export class ProductContentComponent implements OnInit, OnDestroy, OnChanges {

  constructor(private _productService: ProductService, private _cartService: CartService) { }
  private _sub: Subscription;
  public product: Product;
  public user: User;
  public selectedColorArray: string[] = [];
  public selectedSizeArray: string[] = [];
  public viewMode: string = "des";
  public reviews: Review[] = [];
  ngOnInit() { }
  @Input('product') productChildren: Product;
  @Input('user') userChildren: User;
  @Input('scroll') scrollChildren: boolean;
  @ViewChild('scrollVar') scrollVar: ElementRef;
  ngOnChanges() {
    if (this.productChildren) {
      this.product = this.productChildren;
      this.reviews = this.productChildren['reviews'];
    }
    if (this.scrollChildren) {
      this.scrollVar.nativeElement.scrollIntoView();
    }
    if (this.userChildren) {
      this.user = this.userChildren;
      this.name = this.user.full_name;
    }
  }
  selectedColorEvent(color: string) {
    if (!this.selectedColorArray.includes(color)) {
      this.selectedColorArray.push(color);
    }
    // this.selectedColorArray = [];
  }
  selectedSizeEvent(size: string) {
    if (!this.selectedSizeArray.includes(size)) {
      this.selectedSizeArray.push(size);
    }
    // this.selectedSizeArray = [];
  }
  public name: string = '';
  public textarea: string = '';
  public rating: number = 1;
  public stars: number[] = [1, 2, 3, 4, 5];
  onSubmit() {
    if (this.user) {
      if (this.textarea.length === 0) {
        alert('Please enter your review.');
      } else {
        let newR = new Review();
        newR.full_name = this.name;
        newR.comment = this.textarea;
        newR.rating = this.rating;
        newR.created_at = new Date;
        this._productService.addReview(this.productChildren._id, newR).subscribe(x => {
          if (x['success']) {
            this.reviews.push(newR);
            this.resetReview();
          }
        });
      }
    } else {
      alert('Please Login.');
    }
  }
  resetReview() {
    this.textarea = '';
    this.rating = 1;
  }
  addCart(item: Product, qty) {
    if (this.selectedColorArray.length === 0 && this.selectedSizeArray.length === 0) {
      this._cartService.addItem(item, qty, item.size[0], item.color[0]);
    }
    else if (this.selectedColorArray.length > 0 && this.selectedSizeArray.length <= 0) {
      for (let i = 0; i < this.selectedColorArray.length; i++) {
        this._cartService.addItem(item, qty, item.size[0], this.selectedColorArray[i]);
      }
    }
    else if (this.selectedSizeArray.length > 0 && this.selectedColorArray.length <= 0) {
      for (let i = 0; i < this.selectedSizeArray.length; i++) {
        this._cartService.addItem(item, qty, this.selectedSizeArray[i], item.color[0]);
      }
    } else {
      for (let i = 0; i < this.selectedColorArray.length; i++) {
        for (let j = 0; j < this.selectedSizeArray.length; j++) {
          this._cartService.addItem(item, qty, this.selectedSizeArray[j], this.selectedColorArray[i]);
        }
      }
      }
    }
    ngOnDestroy() {
      if (this._sub) {
        this._sub.unsubscribe();
      }
      // this._store.dispatch(new fromPublicAction.LoadProductDetailSuccess(null));
    }
  }
