import { Component, Input, OnInit } from '@angular/core';
import { Transaction } from '../../transaction.model';
import { TransactionService } from '../../transaction.service';
import { Product } from 'src/app/products/product.model';

@Component({
  selector: 'transaction-item',
  templateUrl: './transaction-item.component.html',

})
export class TransactionItemComponent implements OnInit {
@Input() transaction: Transaction
products : Product[]
totalSpent :number
id:string 
constructor(private transactionService:TransactionService){}
ngOnInit() {
    this.id = this.transaction.id

    this.transactionService.getTransactionProducts(this.id).subscribe(
      (data:Product[])=>{
        this.products = data
        this.totalSpent = this.products.reduce((total,prod) => total + prod.price, 0 ) 
      }
    )

}



}
