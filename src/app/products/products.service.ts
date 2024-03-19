import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Product } from './product.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productSource = new BehaviorSubject<Product | null>(null);
  currentProduct = this.productSource.asObservable();
   productsUpdated = new Subject<void>();
  apiRoot = "http://localhost:8080"


  constructor(private http: HttpClient) { }

  setProduct(product: Product) {
    this.productSource.next(product);
  }

  addProductToTransaction(transactionId: number, product: Product):Observable<any> {
    product.transactionId = transactionId
   return this.http.post(`${this.apiRoot}/products`,product)
  }

 
  getProducts(transactionId: number):Observable<any> {
    return this.http.get(`${this.apiRoot}/products/${transactionId}`)
  }  
  getPaginatedProducts(transactionId: number, size:number, page:number):Observable<any> {
    return this.http.get(`${this.apiRoot}/products/${transactionId}?size=${size}&page=${page}`)
  }  



  deleteProduct( transactionId:number ,productId: number):Observable<any> {
    return this.http.delete(`${this.apiRoot}/products/${transactionId}/${productId}`)
  }

  updateProduct(productId: number, updatedProduct: Partial<Product>):Observable<any> {
    return this.http.put(`${this.apiRoot}/products/${productId}`,updatedProduct)
  }
}
