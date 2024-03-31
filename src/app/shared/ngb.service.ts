import { Product } from "../products/product.model";
import { Transaction } from "../transactions/transaction.model";
import { SortColumn, SortDirection } from "./sortable.directive";
import {compare, search} from '../shared/utils'
import { Injectable, PipeTransform } from "@angular/core";
import { BehaviorSubject, Observable, Subject, debounceTime, delay, of, switchMap, tap } from "rxjs";
import { DecimalPipe } from "@angular/common";
interface SearchResult{
    products:  Product[]
    total: number
}

interface State{
    page:number;
    pageSize: number;
    searchTerm: string;
    sortColumn: SortColumn;
    sortDirection: SortDirection
}


function sort(items:  Product[], column: SortColumn, direction: string): Product[]  {
	if (direction === '' || column === '') {
		return items;
	} else {
		return [...items].sort((a, b) => {
			const res = compare(a[column], b[column]);
			return direction === 'asc' ? res : -res;
		});
	}

}

function matches(item: Product , term: string, pipe: PipeTransform){
    return  item.name.toLowerCase().includes(term.toLowerCase()) ||
            pipe.transform(item.price).includes(term) 

}

@Injectable({providedIn: 'root'})
export class NgbService{
    private _loading$ = new BehaviorSubject<boolean>(true);
	private _search$ = new Subject<void>();
	 FilteredProducts$ = new BehaviorSubject<Product[]>([]);
	private _total$ = new BehaviorSubject<number>(0);


    private _state: State = {
        page: 1,
        pageSize: 4,
        searchTerm: '',
        sortColumn: '',
        sortDirection: ''
    }

    constructor(private pipe: DecimalPipe) {



        this._search$
            .pipe(
                tap(() => this._loading$.next(true)),
                debounceTime(200),
                switchMap(()=> this._search$),
                delay(200),
                tap(() => this._loading$.next(false))
            ).subscribe((result) =>{
                // this._products$.next(result.products)
                // this._total$.next(result.total)
            })

            this._search$.next()
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
	
	private _set(patch: Partial<State>) {
		Object.assign(this._state, patch);
		this._search$.next();
	}


    private _search(): Observable<SearchResult> {
		const { sortColumn, sortDirection, pageSize, page, searchTerm } = this._state;

		// 1. sort
		let products = sort(this.FilteredProducts$.value, sortColumn, sortDirection);

		// 2. filter
		products = products.filter((prod) => matches(prod, searchTerm, this.pipe));
		const total = products.length;

		// 3. paginate
		products = products.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
		return of({ products, total });
	}
}