import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import * as fromPublicReducer from '../../state/public.reducer';
import { Store, select } from '@ngrx/store';
@Component({
	selector: 'app-breadcrumb',
	templateUrl: './breadcrumb.component.html',
	styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {

	constructor(
		private _store: Store<fromPublicReducer.PublicState>
	) { }
	public currentPage$: Observable<string>;
	ngOnInit() {
		this.currentPage$ = this._store.pipe(select(fromPublicReducer.getCurrentPage));
	}

}
