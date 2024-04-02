import { Product } from "../products/product.model";
import { BehaviorSubject, Observable, map } from "rxjs";
import { SortColumn, SortDirection } from "./sortable.directive";
import { PipeTransform } from "@angular/core";
export interface SearchResult{
    products:  Product[]
    total: number
}

export interface State{
    page:number;
    pageSize: number;
    searchTerm: string;
    sortColumn: SortColumn;
    sortDirection: SortDirection
}


export function sort(items:  Product[], column: SortColumn, direction: string): Product[]  {
	if (direction === '' || column === '') {
		return items;
	} else {
		return [...items].sort((a, b) => {
			const res = compare(a[column], b[column]);
			return direction === 'asc' ? res : -res;
		});
	}

}

export function matches(item: Product , term: string){
    return  item.name.toLowerCase().includes(term.toLowerCase()) ||
            item.price.toString().includes(term) 

}
export function search(text: string,items:BehaviorSubject<any>): Observable<Product[]> {
	return items.pipe(
		    map((items) =>
		      items.filter(
		        (item:any) =>
		          item.name.toLowerCase().includes(text.toLowerCase()) 
		      )
		    )
		  );
			  }


export const compare = (v1: string | number, v2: string | number) => (v1 < v2 ? -1 : v1 > v2 ? 1 : 0);

 