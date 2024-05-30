import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { Transaction } from '../transactions/transaction.model';
import { AnalyticsService } from '../analytics/analytics.service';
import { TransactionChartService } from './transaction-chart.service';
import { Subscription } from 'rxjs';


type AnalyticsData = {
  [key: number]: any[];
};

@Component({
  selector: 'app-transaction-chart',
  templateUrl: './transaction-chart.component.html',
})
export class TransactionChartComponent  implements OnInit{
  chartMode : String
  transactions : Transaction[];
  private subscriptions : Subscription = new Subscription();
  public barChartData: ChartData<'bar'>;
  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      x: {},
      y: {
        beginAtZero: true
      }
    }
  };
  public barChartLabels: string[] = [];

  constructor(private analyticsService: AnalyticsService, private chartService : TransactionChartService) {}


  ngOnInit(){
    this.analyticsService.getTotalSpent('2024-05-01','2024-05-03').subscribe({
      next: (data) =>{
        const accumulatedValues = data.reduce((acc, item) =>{
          acc.labels.push(`${item.shopName} ${item.transactionDate}`)
          acc.totals.push(item.totalSpent)
          return acc
    
        },{labels:[], totals: []})
        this.barChartLabels = accumulatedValues.labels
              this.barChartData = {
                labels: this.barChartLabels,
                datasets: [
                  { 
                    data: accumulatedValues.totals,
                    label: 'Money Spent',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                  }
                ]
              };      }
    })
    

    this.chartService.chartDatas$.subscribe((data)=>{
      this.updateChartData(data)      
    })


  }

  private updateChartData(data: any[]) {
    if (data) {
      const labels = data.map(item => item[0].trim()); 
      const totals = data.map(item => item[1]);

      this.barChartLabels = labels;
      this.barChartData = {
        labels: this.barChartLabels,
        datasets: [
          { 
            data: totals,
            label: 'Money Spent',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }
        ]
      };
    }
  }


    
  


  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

    



}
