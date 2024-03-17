import { Injectable, inject } from '@angular/core';
import { Observable, Subject, from, map, of,switchMap,lastValueFrom, tap, catchError} from 'rxjs';
import { Transaction } from './transaction.model';
import { Product } from '../products/product.model';
import { Firestore, collection, doc, getDoc, addDoc, updateDoc, deleteDoc, collectionData, query, where, Query, DocumentData, getDocs } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private firestore = inject(Firestore) 
  private transactionsCollection = collection(this.firestore, 'Transactions');
  totalSpentSubject = new Subject<number>()
  transactionsUpdated = new Subject<void>()
  apiRoot = "http://localhost:8080"

  constructor(private http: HttpClient) { }

  

  getTransactions(): Observable<any> {
    return this.http.get(`${this.apiRoot}/transactions`)
  }
  getTransaction(id:number){
    return this.http.get(`${this.apiRoot}/transactions/${id}`)
  }


  addTransaction(transaction: Transaction):Observable<any>{
    return this.http.post(`${this.apiRoot}/transactions`, transaction)
  }

  
  deleteTransaction(id: number){
  return this.http.delete(`${this.apiRoot}/transactions/${id}`).pipe(
    tap(() => this.transactionsUpdated.next()),
    catchError(error => {
      console.error("Error adding transaction", error);
      throw error; // Rethrow the error for further handling if needed
    }))
  
  }
  
  addProductToTransaction(transactionId: number, product: Product):Observable<any> {
    product.transactionId = transactionId
   return this.http.post(`${this.apiRoot}/products`,product)
  }

 
  getTransactionProducts(transactionId: number):Observable<any> {
    return this.http.get(`${this.apiRoot}/products/${transactionId}`)
  }  


  deleteProduct( transactionId:number ,productId: number):Observable<any> {
    return this.http.delete(`${this.apiRoot}/products/${transactionId}/${productId}`)
  }

  updateProduct(productId: number, updatedProduct: Partial<Product>):Observable<any> {

    return this.http.put(`${this.apiRoot}/products/${productId}`,updatedProduct)
    
  }
  
}
