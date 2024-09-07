import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Currency, CurrencyService } from '../shared/currency.service';
import { CommonModule } from '@angular/common';
@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  selector: 'app-settings',
  templateUrl: './settings.component.html',
})
export class SettingsComponent implements OnInit {
  settingsForm: FormGroup;
  currencies: Currency[];
  selectedCur: Currency;

  constructor(
    private fb: FormBuilder,
    private currencyService: CurrencyService
  ) {}

  ngOnInit() {
    this.currencies = this.currencyService.getCurrencies();
    this.currencyService.currencies$.subscribe((data) => {
      this.selectedCur = data;
    });
    this.initializeForm();
  }

  initializeForm() {
    this.settingsForm = this.fb.group({
      selectedCurrency: [this.selectedCur, Validators.required],
    });
  }

  onSubmit() {
    const formValue = this.settingsForm.value;
    const selectedCurrency = this.currencies.find(
      (cur) => cur.name === formValue.selectedCurrency.name
    );
    if (selectedCurrency) {
      this.currencyService.updateCurrencyByName(selectedCurrency);
    } else {
      console.log('Selected currency not found');
    }
  }
}
