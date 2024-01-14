import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { map, switchMap } from 'rxjs/operators';
import { Transaction } from "./transaction.model";
import { Product } from "../products/product.model";
import { Firestore } from '@angular/fire/firestore';



@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  dataUpdated = new Subject<void>();
  apiUrl = 'https://ng-complete-guide-4c27f-default-rtdb.europe-west1.firebasedatabase.app';

  constructor(private http: HttpClient,private db:Firestore) {}





  // getTransactions(): Observable<Transaction[]> {
  //   return this.http.get<{ [key: string]: Transaction }>(`${this.apiUrl}/transactions.json`)
  //     .pipe(
  //       map(responseData => {
  //         const transactionsArray: Transaction[] = [];
  //         for (const key in responseData) {
  //           if (responseData.hasOwnProperty(key)) {
  //             transactionsArray.push({ ...responseData[key], id: key });
  //           }
  //         }
  //         return transactionsArray;
  //       })
  //     );
  // }

  // getTransaction(id: string): Observable<Transaction> {
  //   return this.http.get<Transaction>(`${this.apiUrl}/transactions/${id}.json`);
  // }

  // addTransaction(transaction: Transaction): Observable<Transaction> {
  //   return this.http.post<Transaction>(`${this.apiUrl}/transactions.json`, transaction);
  // }


  // addProductToTransaction(transactionId: string, product: Product): Observable<Transaction> {
  //   return this.getTransaction(transactionId).pipe(
  //     switchMap((transaction: Transaction) => {
  //       if (!transaction.hasOwnProperty('products')) {
  //         transaction.products = [product];
  //         return this.http.put<Transaction>(`${this.apiUrl}/transactions/${transactionId}.json`, transaction);
  //       } else {
  //         transaction.products.push(product);
  //         return this.http.patch<Transaction>(`${this.apiUrl}/transactions/${transactionId}.json`, {
  //           products: transaction.products
  //         });
  //       }
  //     })
  //   );
  // }
  
  
  

  // getProductsForTransaction(transactionId: string,startIndex:number, itemsPerPage:number): Observable<Product[]> {
  //   const queryParams = `?start=${startIndex}&limit=${itemsPerPage}`;
  //   return this.http.get<{ [key: string]: Product }>(`${this.apiUrl}/transactions/${transactionId}/products.json${queryParams}`)
  //     .pipe(
  //       map(responseData => {
  //         const productsArray: Product[] = [];
  //         for (const key in responseData) {
  //           if (responseData.hasOwnProperty(key)) {
  //             productsArray.push({ ...responseData[key], id: key });
  //           }
  //         }
  //         return productsArray;
  //       })
  //     );
  // }



  triggerDataUpdate() {
    this.dataUpdated.next();
  }
}
