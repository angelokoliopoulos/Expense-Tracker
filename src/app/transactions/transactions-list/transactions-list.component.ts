import { Component,  OnInit, QueryList, ViewChildren } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TransactionModalComponent } from '../../modals/transaction-modal/transaction-modal.component';
import { TransactionService } from '../transaction.service';
import { Transaction } from '../transaction.model';
import { Router } from '@angular/router';
import {  CurrencyService } from 'src/app/shared/currency.service';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, Observable, debounceTime, startWith, switchMap } from 'rxjs';
import {  onSort, searchTransactions } from 'src/app/shared/utils';
import { NgbdSortableHeader, SortEvent } from 'src/app/shared/sortable.directive';

@Component({
  selector: 'app-transactions-list',
  templateUrl: './transactions-list.component.html',
  styles: 
  `tbody > tr{
    transition: transform 0.1 ease; 
  }
  tbody > tr:hover{
    transform: scaleY(1.1);
  }`
})
export class TransactionsListComponent  implements OnInit{
  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;
  transactions$: Observable<Transaction[]>
  private allTransactions$ : BehaviorSubject<Transaction[]> = new BehaviorSubject([]);
  id:string 
  isLoading: boolean = false;
  error = null;
  currentPage: number = 0;
  itemsPerPage: number = 8;
  collectionSize: number;
  filter = new FormControl('', { nonNullable: true });


  constructor(private modalService: NgbModal,private transactionService:TransactionService,private router:Router,){}



  ngOnInit() {


    this.fetchTransactions();
    this.transactionService.transactionsUpdated.subscribe( {
      next: () => {
        this.fetchTransactions();
      },
      error: (err) => {
        console.log(err)
      }
    })

    this.transactions$ = this.filter.valueChanges.pipe(
      startWith(''),
      debounceTime(100),
      switchMap((text) => searchTransactions(text,this.allTransactions$))
    )
  }


  fetchTransactions(){
    this.isLoading = true

    this.transactionService.getTransactions(this.itemsPerPage, this.currentPage).subscribe({
      next: (data:any) => {
        //Get all transactions from the service and pass it to allTransactions$ Behavioral Subject.
        this.allTransactions$.next(data.content)
        this.collectionSize = data.totalElements;
        this.isLoading = false
      },
      error:(err) => {
        this.isLoading = false;
        this.error = err.message;      
      }
    })
  }


  onSort(event: SortEvent){
    this.transactions$ = onSort(event , this.headers, this.transactions$);
  }

  

  navigateToTransactionItem(id:number) {
    this.router.navigate(['/transactions', id, 'edit']);
  }

  
  onPageChange(page: number){
    this.currentPage = page 
    this.fetchTransactions();
  }


//Modal Methods

  open(){
    this.modalService.open(TransactionModalComponent,{ size: 'xl' ,animation:true})
  
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

 


  
}

