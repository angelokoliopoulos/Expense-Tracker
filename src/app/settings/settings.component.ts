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
    console.log(this.settingsForm)
  }


  initializeForm(){
    this.settingsForm = this.fb.group({
      selectedCurrency:['']
    })
  }


  onSubmit() {
    const formValue = this.settingsForm.value;
    const selectedCurrency = this.currencies.find(cur => cur.name === formValue.selectedCurrency.name);
    if (selectedCurrency) {
      this.currencyService.updateCurrencyByName(selectedCurrency);
    } else {
      console.log("Selected currency not found");
    }
  }
}
