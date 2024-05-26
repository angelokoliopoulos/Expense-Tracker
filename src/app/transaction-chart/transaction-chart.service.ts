import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionChartService {
  private chartOptionsSubject: BehaviorSubject<any> = new BehaviorSubject<any>({});
  public chartOptions$: Observable<any> = this.chartOptionsSubject.asObservable();

  private formDataSubject: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  public formData$ : Observable<any> = this.formDataSubject.asObservable();


  setChartData(options: any) {
    this.chartOptionsSubject.next(options);
  }


  setFormData(data: any){
    this.formDataSubject.next(data)
  }
}
