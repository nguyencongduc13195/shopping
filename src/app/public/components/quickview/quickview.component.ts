import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { ProductService } from './../../../shared/services/product.service';
import { CartService } from './../../../shared/services/cart.service';
import { Product } from './../../../shared/models/product.model';
@Component({
	selector: 'app-quickview',
	templateUrl: './quickview.component.html',
	styleUrls: ['./quickview.component.scss']
})
export class QuickviewComponent implements OnInit, OnChanges {

	constructor(
		private _productService: ProductService,
		private _cartService: CartService,
	) { }

	ngOnInit() {
	}	
	@Input('quickview') quickViewproduct: Product;
	public mainImage: string = '';
	public showQuickView: boolean = false;
	ngOnChanges(){
		if(this.quickViewproduct){
			this.showQuickView = true;
			if(this.showQuickView){
				this.mainImage = this.quickViewproduct.image;
			}
		}
	}
	onChangeImage(item){
		this.mainImage = item;
	}
	onSetImageDefault(){
		this.mainImage = this.quickViewproduct.image;
	}
	addToCart(product: Product){
		this._cartService.addItem(product,'1',product['size'][0],product['color'][0]);
	}
	@Output('closeQuickview') closeQuickview = new EventEmitter<any>();
	removeQuickview(){
		this.showQuickView = false;
		this.closeQuickview.emit();
	}
}
