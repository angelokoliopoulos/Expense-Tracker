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
  //  months : String[] = ["January 1","February 2","March 3","April 4","May 5","June 6","July 7","August 8 ","September 9","Octomber 10","November 11","December 12"]
   months : String[] = ["January","February","March","April","May","June","July","August","September","Octomber","November","December"]
  // months : any[] = [['January' ,1],['February' ,2],['March', 3],["April", 4],
  // ["May",5],["June",6],["July",7],["August", 8] ,["September" ,9],["Octomber", 10],["November", 11],["December", 12]]



   constructor(public activeModal: NgbActiveModal, private fb:FormBuilder, private analyticsService: AnalyticsService,
    private chartService: TransactionChartService){}

   ngOnInit() {
    this.initializeForm()
   }



   
  initializeForm(){
    this.dateForm = this.fb.group({
      month_or_year: ['month'],
      month: [this.months[0]],
      yearInput: [new Date().getFullYear()]
    });
  }


  onSubmit(){
    console.log(this.dateForm.value)
    if(this.dateForm.get('month_or_year').value === 'year'){
      console.log(`Year is chosen`)
      this.analyticsService.getYearTotalSpent(this.dateForm.value.yearInput).subscribe({
        next: (data) =>{
          this.chartService.setChartData(data)
        }
      })
    }else if(this.dateForm.get('month_or_year').value === 'month'){
      this.analyticsService.getMonthTotalSpent(this.dateForm.value.yearInput, this.dateForm.value.month).subscribe({
        next:(data) => {
          this.chartService.setChartData(data)
          console.log(data)
        }
      })

      

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



