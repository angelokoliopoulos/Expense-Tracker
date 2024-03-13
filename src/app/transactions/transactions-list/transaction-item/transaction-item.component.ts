import { Component, Input, OnInit } from '@angular/core';
import { Transaction } from '../../transaction.model';
import { TransactionService } from '../../transaction.service';
import { Product } from 'src/app/products/product.model';
import {Router} from '@angular/router'
@Component({
  selector: 'transaction-item',
  templateUrl: './transaction-item.component.html',
  styles: `
  .row{
    transition: transform 0.1 ease; 
  }
  .row:hover{
    cursor:pointer;
    margin-top:0.3rem;
    transform: scaleY(1.1);
  }`

})
export class TransactionItemComponent implements OnInit {
@Input() transaction: Transaction
products : Product[]
totalSpent :number
id:number 
constructor(private transactionService:TransactionService,private router:Router){}
ngOnInit() {
    this.id = this.transaction.id

    this.transactionService.getTransactionProducts(this.id).subscribe(
      (data:Product[])=>{
        this.products = data
        this.totalSpent = this.products.reduce((total,prod) => total + prod.price, 0 ) 
      }
    )

}
navigateToTransactionItem() {
  this.router.navigate(['/transactions', this.id, 'edit']);
}

onDelete(e:Event){
  e.stopPropagation()
  this.transactionService.deleteTransaction(this.id)
}


}
