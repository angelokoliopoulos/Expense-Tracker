import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from './product.model';

@Injectable()
export class ProductService {
  dataUpdated = new Subject<void>();
  apiUrl = 'https://ng-complete-guide-4c27f-default-rtdb.europe-west1.firebasedatabase.app';

  constructor(private http: HttpClient) {}

  getProducts(startIndex:number, itemsPerPage:number): Observable<Product[]> {
    const queryParams = `?start=${startIndex}&limit=${itemsPerPage}`;
    return this.http.get<{ [key: string]: Product }>(`${this.apiUrl}/products.json${queryParams}`)
    .pipe(
      map((responseData) => {
        console.log(responseData)
        
        const productsArray: Product[] = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            productsArray.push({ ...responseData[key], id: key });
            
          }
        }
        
        return productsArray;
      })
    );
  }

  addProduct(prod: Product): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}/products.json`, prod);
  }

  editProduct(prod: Product): Observable<Product> {
    const productId = prod.id;
    delete prod.id; // Remove id property before sending the request
    return this.http.put<Product>(`${this.apiUrl}/products/${productId}.json`, prod);
  }

  deleteProduct(id: string): Observable<Product> {
    return this.http.delete<Product>(`${this.apiUrl}/products/${id}.json`);
  }

  deleteProductAndNotify(id: string): void {
    this.deleteProduct(id).subscribe({
      next: () => {
        this.triggerDataUpdate();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  triggerDataUpdate() {
    this.dataUpdated.next();
  }
}
