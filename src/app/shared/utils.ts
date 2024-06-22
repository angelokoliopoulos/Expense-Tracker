import { Product } from "../products/product.model";
import { BehaviorSubject, Observable, map } from "rxjs";
import { NgbdSortableHeader, SortEvent } from "./sortable.directive";
import { QueryList } from "@angular/core";


export const compare = (v1: string | number, v2: string | number) => (v1 < v2 ? -1 : v1 > v2 ? 1 : 0);

export function search(text: string,items:BehaviorSubject<any>): Observable<any> {
	return items.pipe(
		    map((items) =>
		      items.filter(
		        (item:any) =>
		          item.name.toLowerCase().includes(text.toLowerCase()) 
		      )
		    )
		  );
			  }

        export function searchTransactions(text: string,items:BehaviorSubject<any>): Observable<any> {
          return items.pipe(
                map((items) =>
                  items.filter(
                    (item:any) =>
                      item.shopName.toLowerCase().includes(text.toLowerCase()) 
                  )
                )
              );
                }



 
export function  onSort(event: SortEvent,headers: QueryList<NgbdSortableHeader>, itemsObs: Observable<any>) {
    for ( const header of headers) {
      if (header.sortable !== event.column) {
        header.direction = '';
      }
    }
    // Sorting products
    if (event.direction !== '' || event.column !== '') {
		itemsObs = itemsObs.pipe(
        map((items: any) =>
          [...items].sort((a, b) => {
            const res = compare(a[event.column] as string | number, b[event.column] as string | number);
            return event.direction === 'asc' ? res : -res;
          })
        )
      );
  }
  	return itemsObs
  }