import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-chart-date-modal',
  templateUrl: './chart-date-modal.component.html',
})
export class ChartDateModalComponent implements OnInit {
  dateForm: FormGroup
   months : String[] = ["January","February","March","April","May","June","July","August","September","Octomber","November","December"]

   constructor(public activeModal: NgbActiveModal, private fb:FormBuilder){}

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

  
  }



