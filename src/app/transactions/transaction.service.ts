
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable , Subject} from "rxjs";
import { map } from 'rxjs/operators';
import { Transaction } from "./transaction.model";
@Injectable()
export class TransactionService {
    apiUrl = 
    'https://ng-complete-guide-4c27f-default-rtdb.europe-west1.firebasedatabase.app';

    constructor(private http: HttpClient){}


    getTransactions():Observable<Transaction[]>{
        return this.http.get<{ [key: string]: Transaction }>(`${this.apiUrl}/transactions.json`)
        .pipe(
            map((responseData) => {
              console.log(responseData)
              
              const transactionsArray: Transaction[] = [];
              for (const key in responseData) {
                if (responseData.hasOwnProperty(key)) {
                  transactionsArray.push({ ...responseData[key], id: key });
                  
                }
              }
              
              return transactionsArray;
            })
          );
        

    }

    addTransaction(transaction:Transaction): Observable<Transaction>{
        return this.http.post<Transaction>(`${this.apiUrl}/transactions.json`,transaction)
    }





}