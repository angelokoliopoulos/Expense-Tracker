import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, from, map, of } from 'rxjs';
import { Transaction } from './transaction.model';
import { Product } from '../products/product.model';
import { Firestore, collection, doc, getDoc, addDoc, updateDoc, deleteDoc, collectionData, query, where, Query, DocumentData } from '@angular/fire/firestore';
import { applyStyles } from '@popperjs/core';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  dataUpdated = new Subject<void>();
  private firestore = inject(Firestore) // Assuming Firestore class has been imported and provided correctly
  private transactionsCollection = collection(this.firestore, 'Transactions');
  // private productsCollection = collection(this.firestore, 'products')

  constructor(private http: HttpClient) {}

  // Get all transactions
  getTransactions(): Observable<Transaction[]> {
    return collectionData(this.transactionsCollection,{ idField: 'id' })as Observable<Transaction[]>;
  }

  getTransaction(id:string){
    return from(getDoc(doc(this.firestore, 'Transactions', id))).pipe(
      map((snapshot) => snapshot.data() as Transaction)
    );
  }
  addTransaction(transaction: Transaction){
    const tran = transaction.toJSON()
    return of(addDoc(this.transactionsCollection, tran));
  }

  
  addProductToTransaction(transactionId: string, product: Product): Promise<any> {
    console.log(transactionId)
    // Ensure that transactionId is not undefined or null
    if (!transactionId) {
      return Promise.reject(new Error('Invalid transactionId'));
    }
  
    // Set the transactionId property before adding the product
    product.transactionId = transactionId;
  
    // Check if the product.toJSON() method exists on your Product model
    if (typeof product.toJSON === 'function') {
      // Now add the product to the collection
      const productsCollection = collection(this.firestore, 'products');
      return addDoc(productsCollection, product.toJSON());
    } else {
      return Promise.reject(new Error('Invalid toJSON method on Product model'));
    }
  }
  
  // addProductToTransaction(transactionId: string, product: Product): Promise<any> {
  //   product.transactionId = transactionId;
  // const productsCollection = collection(this.firestore, 'Products'); // Adjust to the actual name of your Products Collection
  // return addDoc(productsCollection, product.toJSON());
  // }

  getTransactionProducts(transactionId: string):Observable<Product[]> {
    const productsCollection = collection(this.firestore, 'Products');
    const appQuery = query(productsCollection,where('transactionId','==',transactionId));

    return collectionData(appQuery).pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a as Product; // Make sure 'Product' is your actual model
          const uid = a['id'];
          return { uid, ...data };
        });
      })
    ) as Observable<Product[]>;
  }  



  // Trigger data update
  triggerDataUpdate() {
    this.dataUpdated.next();
  }
}
