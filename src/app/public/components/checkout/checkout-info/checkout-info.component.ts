import { Subscription } from 'rxjs';
import { UserService } from './../../../../shared/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from '../../../../shared/models/user.model';

@Component({
  selector: 'app-checkout-info',
  templateUrl: './checkout-info.component.html',
  styleUrls: ['./checkout-info.component.scss']
})
export class CheckoutInfoComponent implements OnInit {
	constructor(private _formBuiler: FormBuilder, private _userService: UserService) { }
  ngOnInit() {
		this.createFormOrder();
		this._userService.information().subscribe(data=>{
			this.user = data['data'];
		});
  }
  public differentForm: boolean = false;
  open(){
    this.differentForm = !this.differentForm
  }
  @Output('checkout_info') connector = new EventEmitter<any>();
	public formOrder: FormGroup;
	public user: User = new User;
	private _sub: Subscription;
  createFormOrder(){
    this.formOrder = this._formBuiler.group({
			'txtName': ['', Validators.required],
			'txtAddress': ['', Validators.required],
			'txtPhone': ['', Validators.required],
			'txtNote': [''],
			'rdoPayment': [1]
		});
  }
	selectPayment(value){
		this.formOrder.patchValue({
			rdoPayment: value
		});
	}
	onSubmit(form){
    this.connector.emit(form);
  }
  onSelectPayment(value: number){
    this.formOrder.patchValue({
      'rdoPayment': value
    });
  }
	ngOnDestroy(){
		if(this._sub){
			this._sub.unsubscribe();
		}
	}
}
