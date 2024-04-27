import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TransactionModalComponent } from '../../modals/transaction-modal.component';
import { TransactionService } from '../transaction.service';
import { Transaction } from '../transaction.model';
import { Router } from '@angular/router';
import { Product } from 'src/app/products/product.model';
import { Currency, CurrencyService } from 'src/app/shared/currency.service';
import { ProductService } from 'src/app/products/products.service';

@Component({
  selector: 'app-transactions-list',
  templateUrl: './transactions-list.component.html',
  styles: `
  tr{
    transition: transform 0.1 ease; 
  }
  tr:hover{
    margin-top:0.3rem;
    transform: scaleY(1.1);
  }`
})
export class TransactionsListComponent  implements OnInit{
  transactions: Transaction[]
  products : Product[]
  currency : Currency
  totalSpent : {[key:string] : number} = {}
  id:string 

  constructor(private modalService: NgbModal,private transactionService:TransactionService,private router:Router,private currencyService:CurrencyService,private productService: ProductService){}



  ngOnInit() {
    this.currencyService.currencies$.subscribe((data)=>{
      this.currency = data
    })

    this.fetchTransactions();
    this.transactionService.transactionsUpdated
    .subscribe(()=>{
      this.fetchTransactions()
    })
  }


  fetchTransactions(){
    this.transactionService.getTransactions().subscribe({
      next: (data:Transaction[])=>{
        this.transactions = data
        console.log(data)
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }

  open(){
    this.modalService.open(TransactionModalComponent,{ size: 'xl' ,animation:true})
  
  }

  navigateToTransactionItem(id:number) {
    this.router.navigate(['/transactions', id, 'edit']);
  }
  
  onDelete(id:number){
    this.transactionService.deleteTransaction(id).subscribe({
      next: () => {
        console.log('item deleted')
      }
    })
  }

 


  
}

