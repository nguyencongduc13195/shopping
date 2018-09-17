import { Observable, of,Subscription, fromEvent } from 'rxjs';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild, AfterViewInit, AfterViewChecked, ElementRef, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromPublic from '../../state/public.reducer';
import * as fromPublicActions from '../../state/public.action';
import { Product } from '../../../shared/models/product.model';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'app-search-screen',
  templateUrl: './search-screen.component.html',
  styleUrls: ['./search-screen.component.scss']
})
export class SearchScreenComponent implements OnInit, AfterViewInit, AfterViewChecked, OnDestroy {
  @Input('onSearch') onSearch: boolean;
  @Output('closeSearch') closeSearchConnector = new EventEmitter<boolean>();
  constructor(private _store: Store<fromPublic.PublicState>) { }
  public showSearchScreen: boolean;
  @ViewChild('key') key: ElementRef;
  @ViewChild('emptyProduct') emptyProduct: ElementRef;
  public obs: Observable<any>;
  public _sub: Subscription;
  ngOnInit() {
    this._sub = this._store.pipe(select(fromPublic.getShowSearchScreen)).subscribe(
      showSearchScreen => this.showSearchScreen = showSearchScreen);
    this.obs = fromEvent(this.key.nativeElement, 'input');
  }
  public error: string;
  ngAfterViewInit(){
    if(this.emptyProduct.nativeElement.innerHTML){
      this.error = this.emptyProduct.nativeElement.innerHTML;
    }
    this.obs.pipe(map(x=>(x['target']['value'])),debounceTime(500),distinctUntilChanged())
    .subscribe(x=>{
      this._store.dispatch(new fromPublicActions.LoadSearchProducts(x));
      this._store.pipe(select(fromPublic.getSearchProducts))
        .subscribe(x => {
          if (x['success']) {
            this.productsSearch = x['data'];
          }else{
            console.log(x)
            this.productsSearch = [];
            this.emptyProduct.nativeElement.innerHTML = x['msg'];
          }
        }
      );
    })
  }
  ngAfterViewChecked(){
    // console.log(this.key.nativeElement.value);
  }
  closeSearch() {
    this._store.dispatch(new fromPublicActions.ToggleSearchScreen(false));
  }
  public productsSearch: Product[] = [];
  public keySearch$;
  searchEvent(value) {
    // if (value) {
      // this.keySearch$ = of(value);
      this.keySearch$.pipe(distinctUntilChanged()).subscribe(x=>console.log(x));
      // this._store.dispatch(new fromPublicActions.LoadSearchProducts(value));
      // this._store.pipe(debounceTime(2000), distinctUntilChanged(), select(fromPublic.getSearchProducts))
      //   .subscribe(x => {
      //     console.log(x)
      //     if (x['success']) {
      //       this.productsSearch = x['data'];
      //     }
      //   }
      // );
    // }
  }
  ngOnDestroy(){
    if(this._sub){
      this._sub.unsubscribe();
    }
  }
}
