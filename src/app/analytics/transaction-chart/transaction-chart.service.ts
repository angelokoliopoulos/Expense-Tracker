import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TransactionChartService {
  private chartDataSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );
  public chartDatas$: Observable<any> = this.chartDataSubject.asObservable();

  setChartData(options: any) {
    this.chartDataSubject.next(options);
  }
}
