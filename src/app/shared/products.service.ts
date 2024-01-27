
import { Injectable,inject } from "@angular/core";
import { Firestore, collection,collectionData,query, where } from "@angular/fire/firestore";
import { Observable, Subject } from "rxjs";
import { Product } from "../products/product.model";

@Injectable({
    providedIn:'root'
})
export class ProductService {
private firestore = inject(Firestore)
totalSpentSubject = new Subject<number>()
    getProducts(transactionId:string){
        const productsCollection = collection(this.firestore,'products')
        const appQuery = query(productsCollection,where('transactionId','==',transactionId))
        return collectionData(appQuery,{idField:'id'}) as Observable<Product[]>
    }
}