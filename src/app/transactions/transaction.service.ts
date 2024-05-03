import { Injectable } from '@angular/core';
import { Observable, Subject, tap, catchError} from 'rxjs';
import { Transaction } from './transaction.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
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
    return this.http.post(`${this.apiRoot}/transactions`, transaction).pipe(
      tap(()=>this.transactionsUpdated.next()),
      catchError(error=>{
        console.error("Error adding transaction", error)
        throw error
      })
    )
  }

  
  deleteTransaction(id: number){
  return this.http.delete(`${this.apiRoot}/transactions/${id}`).pipe(
    tap(() => this.transactionsUpdated.next()),
    catchError(error => {
      console.error("Error deleting transaction", error);
      throw error; 
    }))
  }

  getProducts(transactionId: number){
    return this.http.get(`${this.apiRoot}/transactions/${transactionId}/details`)
  }


  addProductTotransaction(transactionId: number, productId: number, price: number, quantity: number){
    return this.http.post(`${this.apiRoot}/transactions/${transactionId}/product`, { 
      productId, 
      price,
      quantity
  });    
  }

  deleteProduct(transactionId:number, productId:number){
    return this.http.delete(`${this.apiRoot}/transactions/${transactionId}/product/${productId}`)
  }
  

  
}
