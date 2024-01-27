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
  private firestore = inject(Firestore) 
  private transactionsCollection = collection(this.firestore, 'Transactions');

 

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

  getTransactionProducts(transactionId: string):Observable<Product[]> {
    const productsCollection = collection(this.firestore, 'products');
    console.log(productsCollection)
    const appQuery = query(productsCollection,where('transactionId','==',transactionId));
    return collectionData(appQuery,{idField:'id'}) as Observable<Product[]>;
  }  


  deleteProduct( productId: string): Promise<void> {
    const productDocPath = `products/${productId}`;
    console.log('Deleting product at path:', productDocPath);
    return deleteDoc(doc(this.firestore, productDocPath));
  }

  updateProduct(productId:string,updatedProduct:Partial<Product>):Promise<void>{
    const productDocRef = doc(this.firestore,'products',productId)
    return updateDoc(productDocRef, updatedProduct);
  }
  

  


  triggerDataUpdate() {
    this.dataUpdated.next();
  }
}
