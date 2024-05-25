import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from './analytics.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  })
export class AnalyticsComponent implements OnInit {
chartOptions :String [];
chartForm : FormGroup;
  constructor(private fb: FormBuilder,private analyticsService: AnalyticsService){}
  ngOnInit(): void {
    this.chartOptions = this.analyticsService.getChartOptions();
    this.initializeForm()


    this.chartForm.get('chartMode').valueChanges.subscribe(value => {
      console.log('Selected option:', value);
      // Perform any additional logic based on the selected option
    });
  }
  





  initializeForm(){
    this.chartForm = this.fb.group({
    chartMode: [this.chartOptions[0]]
    })
  }

}
