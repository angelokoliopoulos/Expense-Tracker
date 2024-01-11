import { Component, Input } from '@angular/core';
import { Transaction } from '../transaction.model';

@Component({
  selector: 'transaction-list-item',
  templateUrl: './transaction.component.html',

})
export class TransactionComponent {
@Input() transaction: Transaction
  



}
