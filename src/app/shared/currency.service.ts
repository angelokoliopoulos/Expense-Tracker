import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
 
 export interface Currency {
    name: string;
    symbol: string;
}

@Injectable({
    providedIn:'root'
})
export class CurrencyService {
    private  currencies : Currency[] = [
        {name: 'Euro',symbol: '€'},
          {name: 'Dollar', symbol: '$'},
          {name: "Pound", symbol: '£'},
          {name: "Yen", symbol:'¥'},
          {name:'Hryvnia', symbol: '₴'}
      ]
      
// Holds the state of currencies
private currencySubject: BehaviorSubject<Currency> = new BehaviorSubject<Currency>(this.currencies[0]);

// Other components subscribe to currencies$ to get updates when the currencies change
currencies$: Observable<Currency> = this.currencySubject.asObservable();




getCurrencies():Currency[]{
    return this.currencies
}

getCurrency(selectedCurrency: Currency){
 this.currencies.find(cur =>{
    return cur === selectedCurrency
 })
}

updateCurrencyByName(currency: Currency):void{
console.log(currency)
    this.currencySubject.next(currency);
  
}

}