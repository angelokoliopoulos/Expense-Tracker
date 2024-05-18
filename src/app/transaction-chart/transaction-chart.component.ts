import { Component } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { TransactionService } from '../transactions/transaction.service';
import { Transaction } from '../transactions/transaction.model';

@Component({
  selector: 'app-transaction-chart',
  templateUrl: './transaction-chart.component.html',
})
export class TransactionChartComponent {

  transactions : Transaction[];
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

  constructor(private transactionService: TransactionService) {}

  ngOnInit(): void {
    this.transactionService.getTransactions().subscribe({
      next: (data) => {
        this.transactions = data;
        const monthlySpending = this.calculateMonthlySpending(this.transactions);
        this.barChartLabels = Object.keys(monthlySpending);
        this.barChartData = {
          labels: this.barChartLabels,
          datasets: [
            { 
              data: Object.values(monthlySpending),
              label: 'Money Spent',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1
            }
          ]
        };
      }
    });

    
    
  }

  private calculateMonthlySpending(transactions: any[]): Record<string, number> {
    const monthlySpending: Record<string, number> = {};
    transactions.forEach(transaction => {
      const month = new Date(transaction.date).toLocaleString('default', { month: 'long' });
      const amount = 100
      if (monthlySpending[month]) {
        monthlySpending[month] += amount;
      } else {
        monthlySpending[month] = amount;
      }
    });
    return monthlySpending;
  }
}


