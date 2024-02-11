import { Component,OnInit } from '@angular/core';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Currency, CurrencyService } from '../shared/currency.service';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
})
export class SettingsComponent implements OnInit {
settingsForm : FormGroup
currencies: Currency[]

constructor(private fb: FormBuilder,private currencyService:CurrencyService){}

  ngOnInit() {
   this.currencies = this.currencyService.getCurrencies()
    this.initializeForm()
  }


  initializeForm(){
    this.settingsForm = this.fb.group({
      selectedCurrency:['']
    })
  }
}
