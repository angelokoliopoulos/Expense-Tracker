import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AnalyticsService } from 'src/app/analytics/analytics.service';
import { TransactionChartService } from 'src/app/analytics/transaction-chart/transaction-chart.service';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  selector: 'app-chart-date-modal',
  templateUrl: './chart-date-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartDateModalComponent implements OnInit {
  dateForm: FormGroup;
  months: any = [
    { name: 'January', number: 1 },
    { name: 'February', number: 2 },
    { name: 'March', number: 3 },
    { name: 'April', number: 4 },
    { name: 'May', number: 5 },
    { name: 'June', number: 6 },
    { name: 'July', number: 7 },
    { name: 'August', number: 8 },
    { name: 'Sepember', number: 9 },
    { name: 'October', number: 10 },
    { name: 'November', number: 11 },
    { name: 'December', number: 12 },
  ];

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private analyticsService: AnalyticsService,
    private chartService: TransactionChartService
  ) {}

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.dateForm = this.fb.group({
      month_or_year: ['month'],
      month: [this.months[0].number],
      yearInput: [new Date().getFullYear()],
    });
  }

  onSubmit() {
    if (this.dateForm.get('month_or_year').value === 'year') {
      this.analyticsService
        .getYearTotalSpent(this.dateForm.value.yearInput)
        .subscribe({
          next: (data) => {
            this.chartService.setChartData(data);
            this.handleSuccess();
          },
        });
    } else if (this.dateForm.get('month_or_year').value === 'month') {
      this.analyticsService
        .getMonthTotalSpent(
          this.dateForm.value.yearInput,
          this.dateForm.value.month
        )
        .subscribe({
          next: (data) => {
            this.chartService.setChartData(data);
            this.handleSuccess();
          },
        });
    }
  }

  handleSuccess() {
    this.activeModal.close();
    this.initializeForm();
  }

  handleError(error) {
    this.initializeForm();
    console.log(error);
  }
}
