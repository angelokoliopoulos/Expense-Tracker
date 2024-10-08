import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal, NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { BaseChartDirective } from 'ng2-charts';
import { AnalyticsService } from 'src/app/analytics/analytics.service';
import { TransactionChartService } from 'src/app/analytics/transaction-chart/transaction-chart.service';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, NgbTypeahead, CommonModule],
  selector: 'app-chart-date-modal',
  templateUrl: './chart-date-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartDateModalComponent implements OnInit {
  dateForm: FormGroup;
  months: String[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'Octomber',
    'November',
    'December',
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
      month: [this.months[0]],
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
