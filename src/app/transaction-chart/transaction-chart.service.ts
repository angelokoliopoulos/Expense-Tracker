import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionChartService {
  private chartOptionsSubject: BehaviorSubject<any> = new BehaviorSubject<any>({});
  public chartOptions$: Observable<any> = this.chartOptionsSubject.asObservable();
   chartOptionsUpdated : Subject<void> = new Subject<void>

 

  setChartData(options: any) {
    this.chartOptionsSubject.next(options);
    this.chartOptionsUpdated.next();

  }


}
