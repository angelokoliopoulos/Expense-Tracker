import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn:'root'
})
export class AnalyticsService {
    apiRoot = "http://localhost:8080"

    constructor(http: HttpClient){}


    
}