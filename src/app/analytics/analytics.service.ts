import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  apiRoot = 'http://localhost:8080/api/v1/auth';

  constructor(private http: HttpClient) {}

  getTotalSpent(fromDate: String, toDate: String): Observable<any> {
    return this.http.get(`${this.apiRoot}/analytics/${fromDate}/to/${toDate}`);
  }

  getYearTotalSpent(year: String) {
    return this.http.get(`${this.apiRoot}/analytics/totalSpent/year/${year}`);
  }

  getMonthTotalSpent(year: string, month: string) {
    return this.http.get(
      `${this.apiRoot}/analytics/totalSpent/year/${year}/month/${month}`
    );
  }
}
