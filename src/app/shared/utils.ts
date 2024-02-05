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




 // search(text: string): Observable<Product[]> {
  //   return this.allProducts$.pipe(
  //     map((products) =>
  //       products.filter(
  //         (product) =>
  //           product.name.toLowerCase().includes(text.toLowerCase()) ||
  //           this.pipe.transform(product.name).includes(text)
  //       )
  //     )
  //   );
  // }
