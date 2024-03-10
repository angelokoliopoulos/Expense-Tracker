import { Injectable, inject } from '@angular/core';
import { Observable, Subject, from, map, of,switchMap,lastValueFrom} from 'rxjs';
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
  apiUrl = "http://localhost:8080/products"

  constructor(private http: HttpClient) { }

  // getTransactions(): Observable<Transaction[]> {
  //   return collectionData(this.transactionsCollection,{ idField: 'id' })as Observable<Transaction[]>;
  // }


  getTransactions(): Observable<any> {
    return this.http.get(this.apiUrl)
  }
  getTransaction(id:string){
    return from(getDoc(doc(this.firestore, 'Transactions', id))).pipe(
      map((snapshot) => snapshot.data() as Transaction)
    );
  }
  addTransaction(transaction: Transaction):Observable<any>{
    const tran = transaction.toJSON()
    return of(addDoc(this.transactionsCollection, tran));
  }

  
  deleteTransaction(transactionId: string){
    const transactionDocPath = `Transactions/${transactionId}`;
      return lastValueFrom(this.getTransactionProducts(transactionId).pipe(
      switchMap((products: Product[]) => {
        const deleteProductPromises = products.map((product: Product) =>
          this.deleteProduct(product.id)
        );
          return Promise.all(deleteProductPromises);
      }),
      switchMap(() => {
        return deleteDoc(doc(this.firestore, transactionDocPath));
      })
    ))
  }
  
  addProductToTransaction(transactionId: string, product: Product): Promise<any> {
    if (!transactionId) {
      return Promise.reject(new Error('Invalid transactionId'));
    }
      product.transactionId = transactionId;
      const productsCollection = collection(this.firestore, 'products');
      return addDoc(productsCollection, product.toJSON())
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

  updateProduct(productId: string, updatedProduct: Partial<Product>): Promise<void> {
    const productDocRef = doc(this.firestore, 'products', productId);
    return updateDoc(productDocRef, updatedProduct);
  }
  
}
