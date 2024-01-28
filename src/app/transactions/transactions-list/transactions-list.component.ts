import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TransactionModalComponent } from '../../modals/transaction-modal.component';
import { TransactionService } from '../transaction.service';
import { Transaction } from '../transaction.model';

@Component({
  selector: 'app-transactions-list',
  templateUrl: './transactions-list.component.html',
})
export class TransactionsListComponent  implements OnInit{
  transactions: Transaction[]

  constructor(private modalService: NgbModal,private transactionService:TransactionService){}



  ngOnInit() {
   this.transactionService.getTransactions().subscribe({
    next:(data:Transaction[])=>{
      this.transactions = data
    },
     error: (error) => {
      console.error(error.message);
    },
   })
  }

  open(){
    this.modalService.open(TransactionModalComponent,{ size: 'xl' })
  }


  
}

