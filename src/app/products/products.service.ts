
import { Product } from "./product.model";
import {  Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable ,Subject, catchError, takeUntil} from 'rxjs';
@Injectable()
export class ProductService  {
products:Product[]
dataUpdated = new Subject<void>();
error = new Subject<string>();
dataUpdated$ = this.dataUpdated.asObservable();



apiUrl = 'http://localhost:8000';

 constructor(private http : HttpClient){}

 getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/product/`);
  }

  addProduct(prod:Product):Observable<Product>{
    return this.http.post<Product>(`${this.apiUrl}/product/`,prod,
   )
  }

  editProduct(prod:Product):Observable<Product>{
    return this.http.put<Product>(`${this.apiUrl}/product/`,prod)
  }
  deleteProduct(id: number):Observable<Product> {
   return  this.http.delete<Product>(`${this.apiUrl}/product/${id}/`)
   
  }

  deleteProductAndNotify(id: number): void {
    this.deleteProduct(id).subscribe({
     next: () => {
        this.triggerDataUpdate();
        console.log()
      },
      error: err => {
        console.log(err)
      }
    
    })
  }
  
  triggerDataUpdate() {
    this.dataUpdated.next();
  }

  


  

 


}