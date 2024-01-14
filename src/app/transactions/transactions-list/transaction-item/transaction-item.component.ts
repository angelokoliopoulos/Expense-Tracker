import { Component, Input } from '@angular/core';
import { Transaction } from '../../transaction.model';

@Component({
  selector: 'transaction-item',
  templateUrl: './transaction-item.component.html',

})
export class TransactionItemComponent {
@Input() transaction: Transaction
  



}
