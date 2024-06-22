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
  transactionUpdated = new Subject<void>()

  apiRoot = "http://localhost:8080"

  constructor(private http: HttpClient) { }

  
  getAllTransactions(): Observable<any> {
    return this.http.get(`${this.apiRoot}/transactions/all`)
  }


  getTransactions(size: number, page: number): Observable<any> {
    return this.http.get(`${this.apiRoot}/transactions?size=${size}&page=${page - 1}`)
  }
  getTransaction(id:number){
    return this.http.get(`${this.apiRoot}/transactions/id/${id}`)
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
  return this.http.delete(`${this.apiRoot}/transactions/id/${id}`).pipe(
    tap(() => this.transactionsUpdated.next()),
    catchError(error => {
      console.error("Error deleting transaction", error);
      throw error; 
    }))
  }



  getAllProducts(transactionId: number){
    return this.http.get(`${this.apiRoot}/transactions/id/${transactionId}/details/all`)
  }

  getProducts(transactionId: number, size:number, page:number){
    return this.http.get(`${this.apiRoot}/transactions/id/${transactionId}/details?size=${size}&page=${page -1}`)
  }


  addProductTotransaction(transactionId: number, productId: number, price: number, quantity: number){
    return this.http.post(`${this.apiRoot}/transactions/id/${transactionId}/product`, { productId, price,quantity}).pipe(
      tap(() => this.transactionUpdated.next()),
      catchError(err => {
        console.error("Error adding product to transaction")
        throw err
      })
    )    
  }

  deleteProduct(transactionId:number, productName:string){
    return this.http.delete(`${this.apiRoot}/transactions/id/${transactionId}/product/${productName}`).pipe(
      tap( ()=> this.transactionUpdated.next()),
      catchError(error => {
        console.error("Error on removing product from transaction", error)
        throw error
      })
    )
  }
  

  
}
