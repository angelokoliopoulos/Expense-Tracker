import { Component,  OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TransactionModalComponent } from '../../modals/transaction-modal/transaction-modal.component';
import { TransactionService } from '../transaction.service';
import { Transaction } from '../transaction.model';
import { Router } from '@angular/router';
import { Currency, CurrencyService } from 'src/app/shared/currency.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-transactions-list',
  templateUrl: './transactions-list.component.html',
  styles: 
  `tr{
    transition: transform 0.1 ease; 
  }
  tr:hover{
    transform: scaleY(1.1);
  }`
})
export class TransactionsListComponent  implements OnInit{
  transactions: Transaction[]
  id:string 
  isLoading: boolean = false;
  error = null;
  currentPage: number = 0;
  itemsPerPage: number = 8;
  collectionSize: number;
  filter = new FormControl('', { nonNullable: true });


  constructor(private modalService: NgbModal,private transactionService:TransactionService,private router:Router,
    private currencyService:CurrencyService){}



  ngOnInit() {


    this.fetchTransactions();
    this.transactionService.transactionsUpdated.subscribe( () => {
      this.fetchTransactions()
    })
  }


  fetchTransactions(){
    this.isLoading = true

    this.transactionService.getTransactions().subscribe({
      next: (data:Transaction[]) => {
        this.transactions = data
        console.log(data)
        this.isLoading = false

      },
      error:(err) => {
        this.isLoading = false;
        this.error = err.message;      
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
    if(window.confirm("Delete transaction?")){
      this.transactionService.deleteTransaction(id).subscribe({
        next: () => {
          console.log('item deleted')
        },
        error:(err)=> console.log(err)
      })
    }
  }

 

  onPageChange(page: number){
    this.currentPage = page 
    this.fetchTransactions();
  }

  
}

