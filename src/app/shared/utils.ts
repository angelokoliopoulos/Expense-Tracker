import { Product } from "../products/product.model";
import { BehaviorSubject, Observable, map } from "rxjs";

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

 