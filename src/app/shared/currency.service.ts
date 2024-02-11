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

// Holds the state of currencies
private currenciesSubject: BehaviorSubject<Currency[]> = new BehaviorSubject<Currency[]>([]);

// Other components subscribe to currencies$ to get updates when the currencies change
currencies$: Observable<Currency[]> = this.currenciesSubject.asObservable();



private  currencies : Currency[] = [
    {name: 'Euro',symbol: '€'},
    {name: 'Dollar', symbol: '$'},
    {name: "Pound", symbol: '£'},
    {name: "Yen", symbol:'¥'},
    {name:'Hryvnia', symbol: '₴'}
]

getCurrencies():Currency[]{
    return this.currencies
}


}