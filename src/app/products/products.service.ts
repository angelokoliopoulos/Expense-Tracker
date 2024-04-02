import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, Subscription, catchError, debounceTime, delay, of, switchMap, tap } from 'rxjs';
import { Product } from './product.model';
import { HttpClient } from '@angular/common/http';
import { SearchResult, State, matches, sort } from '../shared/utils';
import { DecimalPipe } from '@angular/common';
import { SortColumn, SortDirection } from '../shared/sortable.directive';

@Injectable({
  providedIn: 'root',
  
})
export class ProductService {
  private productSource = new BehaviorSubject<Product | null>(null);
  currentProduct = this.productSource.asObservable();
  productsUpdated = new Subject<void>();
  _products$ = new BehaviorSubject<Product[]>([])
  apiRoot = "http://localhost:8080"

  // Ngb Variables
  private _loading$ = new BehaviorSubject<boolean>(true);
	private _search$ = new Subject<void>();
	private _total$ = new BehaviorSubject<number>(0);
  private _state: State = {
    page: 1,
    pageSize: 4,
    searchTerm: '',
    sortColumn: '',
    sortDirection: ''
}


  constructor(private http: HttpClient) { 
    this._search$
    // .pipe(
    //     tap(() => this._loading$.next(true)),
    //     debounceTime(200),
    //     switchMap(()=> this._search$),
    //     delay(200),
    //     tap(() => this._loading$.next(false)))
        .subscribe((result : any) =>{
      console.log('Search term:', this._state.searchTerm);
      console.log('Products before filtering:', this._products$.value);
        this._products$.next(result.products)
        this._total$.next(result.total)
    })

    this._search$.next()
  }

  get products$(){
    return this._products$.asObservable()
  }


  get total$() {
		return this._total$.asObservable();
	}
	get loading$() {
		return this._loading$.asObservable();
	}
	get page() {
		return this._state.page;
	}
	get pageSize() {
		return this._state.pageSize;
	}
	get searchTerm() {
		return this._state.searchTerm;
	}


  set page(page: number) {
		this._set({ page });
	}
	set pageSize(pageSize: number) {
		this._set({ pageSize });
	}
	set searchTerm(searchTerm: string) {
		this._set({ searchTerm });
	}

  set sortColumn(sortColumn: SortColumn) {
		this._set({ sortColumn });
	}
	set sortDirection(sortDirection: SortDirection) {
		this._set({ sortDirection });
	}
	
	private _set(patch: Partial<State>) {
		Object.assign(this._state, patch);
		this._search$.next();
	}


    private _search(): Observable<SearchResult> {
		const { sortColumn, sortDirection, pageSize, page, searchTerm } = this._state;

		// 1. sort
		let products = sort(this._products$.value, sortColumn, sortDirection);

		// 2. filter
		products = products.filter((prod) => matches(prod, searchTerm));
		const total = products.length;

		// 3. paginate
		products = products.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
		return of({ products, total });
	}

  setProduct(product: Product) {
    this.productSource.next(product);
  }

  addProduct( product: Product):Observable<any> {
   return this.http.post(`${this.apiRoot}/products`,product).pipe(
    tap(()=> this.productsUpdated.next()),
    catchError(err => {
      console.log('Error adding product',err)
      throw err
    })
   )
  }

  getProducts():any {
    return this.http.get(`${this.apiRoot}/products`).subscribe(
      (data: Product[]) => this._products$.next(data)
    )
  }
  
  
  getPaginatedProducts(transactionId: number, size:number, page:number):Observable<any> {
    return this.http.get(`${this.apiRoot}/products/${transactionId}?size=${size}&page=${page}`)
  }  

  deleteProduct(productId: number):Observable<any> {
    return this.http.delete(`${this.apiRoot}/products/${productId}`).pipe(
      tap(()=> this.productsUpdated.next()),
      catchError(err => {
        console.log('Error deleting product',err)
        throw err
      })
     )
  }

  updateProduct(productId: number, updatedProduct: Partial<Product>):Observable<any> {
    return this.http.put(`${this.apiRoot}/products/${productId}`,updatedProduct).pipe(
      tap(()=> this.productsUpdated.next()),
      catchError(err => {
        console.log('Error updating product',err)
        throw err
      })
     )
  }
}





