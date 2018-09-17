import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductService } from './../../../shared/services/product.service';
import { CartService } from './../../../shared/services/cart.service';
import { Product } from './../../../shared/models/product.model';
@Component({
	selector: 'app-search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

	constructor(
		private _activated: ActivatedRoute,
		private _router: Router,
		private _productService: ProductService,
		private _cartService: CartService
	) { }
	public keySearch: any;
	public priceSearch: number;
	public searchProducts: Product[] = [];
	ngOnInit() {
		this._sub = this._activated.queryParams.subscribe((params: Params)=>{
			this.keySearch = '';
			this.priceSearch = 0;
			if(params['key']){
				this._sub = this._productService.searchItem(params['key']).subscribe((data: Product[])=>{
					this.keySearch = `từ khóa ${params['key']}`;
					if(data['success']){
						this.searchProducts = data['data'];
					}else{
						this.searchProducts = [];
					}
				});
			}else if(params['gia-tien']){
				this._sub = this._productService.getProductsByPrice(params['gia-tien']).subscribe((data: Product[])=>{
					this.priceSearch = params['gia-tien'];
					if(data['success']){
						this.searchProducts = data['data'];
					}else{
						this.searchProducts = [];
					}
				});
			}else if(params['mau-sac']){
				this._sub = this._productService.getProductsByColor(params['mau-sac']).subscribe((data: Product[])=>{
					this.keySearch = `màu sắc ${params['mau-sac']}`;
					if(data['success']){
						this.searchProducts = data['data'];
					}else{
						this.searchProducts = [];
					}
				});
			}else if(params['kich-co']){
				this._sub = this._productService.getProductsBySize(params['kich-co']).subscribe((data: Product[])=>{
					this.keySearch = `kích cỡ ${params['kich-co']}`;
					if(data['success']){
						this.searchProducts = data['data'];
					}else{
						this.searchProducts = [];
					}
				});
			}else if(params['yeu-thich']){
				this.keySearch = `Sản phẩm yêu thích`;
				if(this._productService.loveProducts.length>0){
					this.searchProducts = this._productService.loveProducts;
				}else{
					this.searchProducts = [];
				}
			}else{
				this._sub = this._productService.getProductsByUse(params['tag']).subscribe((data: Product[])=>{
					this.keySearch = `tag ${params['tag']}`;
					if(data['success']){
						this.searchProducts = data['data'];
					}else{
						this.searchProducts = [];
					}
				});
			}
		});
	}
	addToCart(product: Product){
		this._cartService.addItem(product, '1', product.size[0],product.color[0]);
	}
	private _sub: Subscription;
	ngOnDestroy(){
		if(this._sub){
			this._sub.unsubscribe();
		}
	}
}
