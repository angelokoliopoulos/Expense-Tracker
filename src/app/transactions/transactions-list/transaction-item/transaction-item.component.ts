import { Component, Input, OnInit } from '@angular/core';
import { Transaction } from '../../transaction.model';
import { TransactionService } from '../../transaction.service';

@Component({
  selector: 'transaction-item',
  templateUrl: './transaction-item.component.html',

})
export class TransactionItemComponent implements OnInit {
@Input() transaction: Transaction
@Input() totalSpent :number
id:string 
constructor(private transactionService:TransactionService){}
ngOnInit() {
    this.id = this.transaction.id

}



}
