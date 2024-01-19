import { Injectable, inject } from '@angular/core';
import { Observable, Subject, from, map, of } from 'rxjs';
import { Transaction } from './transaction.model';
import { Product } from '../products/product.model';
import { Firestore, collection, doc, getDoc, addDoc, updateDoc, deleteDoc, collectionData, query, where, Query, DocumentData, getDocs } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  dataUpdated = new Subject<void>();
  private firestore = inject(Firestore) // Assuming Firestore class has been imported and provided correctly
  private transactionsCollection = collection(this.firestore, 'Transactions');
  // private productsCollection = collection(this.firestore, 'products')

 

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
    if (!transactionId) {
      return Promise.reject(new Error('Invalid transactionId'));
    }
    // Set the transactionId property before adding the product
    product.transactionId = transactionId;
    
      const productsCollection = collection(this.firestore, 'products');
      return addDoc(productsCollection, product.toJSON());
    
  }


  deleteProduct( productId: string): Promise<void> {
    const productDocPath = `products/${productId}`;
    console.log('Deleting product at path:', productDocPath);
    return deleteDoc(doc(this.firestore, productDocPath));
  }
  

  getTransactionProducts(transactionId: string):Observable<Product[]> {
    const productsCollection = collection(this.firestore, 'products');
    console.log(productsCollection)
    const appQuery = query(productsCollection,where('transactionId','==',transactionId));
    return collectionData(appQuery,{idField:'id'}) as Observable<Product[]>;
  }  



  triggerDataUpdate() {
    this.dataUpdated.next();
  }
}
