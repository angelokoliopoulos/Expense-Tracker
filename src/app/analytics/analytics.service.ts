import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn:'root'
})
export class AnalyticsService {
    apiRoot = "http://localhost:8080"

    constructor(private http: HttpClient){}



    getTotalSpent(fromDate: String, toDate: String): Observable<any>{
    return  this.http.get(`${this.apiRoot}/analytics/${fromDate}/${toDate}`)
    }




}