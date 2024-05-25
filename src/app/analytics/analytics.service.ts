import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
    providedIn:'root'
})
export class AnalyticsService {
   private chartOptions : String[] = ["Weekly","Monthly","Year"];

    private chartModeSubject = new BehaviorSubject<String>(this.chartOptions[0]);
     currentChartMode$ = this.chartModeSubject.asObservable();
    apiRoot = "http://localhost:8080"

    constructor(private http: HttpClient){}

    setChartMode(mode: String){
        this.chartModeSubject.next(mode);
    }

    getChartOptions(){
        return this.chartOptions
    }

    getTotalSpent(fromDate: String, toDate: String): Observable<any>{
    return  this.http.get(`${this.apiRoot}/analytics/${fromDate}/${toDate}`)
    }


   




}