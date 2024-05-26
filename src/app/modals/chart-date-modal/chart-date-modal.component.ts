import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AnalyticsService } from 'src/app/analytics/analytics.service';
import { TransactionChartService } from 'src/app/transaction-chart/transaction-chart.service';

@Component({
  selector: 'app-chart-date-modal',
  templateUrl: './chart-date-modal.component.html',
})
export class ChartDateModalComponent implements OnInit {
  dateForm: FormGroup
   months : String[] = ["January","February","March","April","May","June","July","August","September","Octomber","November","December"]

   constructor(public activeModal: NgbActiveModal, private fb:FormBuilder, private analyticsService: AnalyticsService,
    private chartService: TransactionChartService){}

   ngOnInit() {
       
    this.initializeForm()


   }



   
  initializeForm(){
    this.dateForm = this.fb.group({
      month_or_year: ['month'],
      month: [this.months[0]],
      year: [new Date().getFullYear()]
    });
  }


  onSubmit(){
    console.log(this.dateForm.value)
    if(this.dateForm.get('month_or_year').value === 'year'){
      console.log(`Year is chosen`)
      this.analyticsService.getMonthlyTotalSpent(this.dateForm.value.year).subscribe({
        next: (data) =>{
          this.chartService.setChartData(data)
        }
      })
    }else if(this.dateForm.get('month_or_year').value === 'month'){
      console.log(`month is chosen`)
    }
  }
  

  handleSuccess() {
    this.activeModal.close()
    this.initializeForm(); 
  }
  
  handleError(error) {
    this.initializeForm(); 
    console.log(error);
  }
  

  
}



