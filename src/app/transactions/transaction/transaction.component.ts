import { Component, Input } from '@angular/core';
import { Transaction } from '../transaction.model';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent {
@Input() transaction: Transaction
  



}
