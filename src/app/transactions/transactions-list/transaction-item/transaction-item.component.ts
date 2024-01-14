import { Component, Input, OnInit } from '@angular/core';
import { Transaction } from '../../transaction.model';

@Component({
  selector: 'transaction-item',
  templateUrl: './transaction-item.component.html',

})
export class TransactionItemComponent implements OnInit {
@Input() transaction: Transaction
id:string 

ngOnInit() {
    this.id = this.transaction.id
}

}
