
import { Product } from "./product.model";
import {  Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable ,Subject, catchError, takeUntil} from 'rxjs';
@Injectable()
export class ProductService  {
products:Product[]
dataUpdated = new Subject<void>();
dataUpdated$ = this.dataUpdated.asObservable();


apiUrl = 'http://localhost:8000';

 constructor(private http : HttpClient){}

 getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/product/`);
  }

  addProduct(prod:Product):Observable<Product>{
    return this.http.post<Product>(`${this.apiUrl}/product/`,prod)
  }

 

  deleteProduct(id: number): Observable<Product> {
    return this.http.delete<Product>(`${this.apiUrl}/product/${id}/`)


  }

  triggerDataUpdate() {
    this.dataUpdated.next();
  }

  

 


}