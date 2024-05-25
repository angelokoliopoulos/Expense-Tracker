import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from './analytics.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChartDateModalComponent } from '../modals/chart-date-modal/chart-date-modal.component';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  })
export class AnalyticsComponent implements OnInit {
chartOptions :String [];
  constructor(private modalService: NgbModal,private analyticsService: AnalyticsService){}
  ngOnInit(): void {
    this.chartOptions = this.analyticsService.getChartOptions();


    
  }


  open(){
    this.modalService.open(ChartDateModalComponent,{size: 'xl', animation:true})
  }
  






}
