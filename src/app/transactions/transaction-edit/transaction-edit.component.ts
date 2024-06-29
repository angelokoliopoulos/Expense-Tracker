import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { TransactionService } from '../transaction.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Transaction } from '../transaction.model';
import {  DecimalPipe  } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, Observable } from 'rxjs';
import { debounceTime,  map,  startWith, switchMap } from 'rxjs/operators';
import {compare, search} from '../../shared/utils'
import { Currency, CurrencyService } from '../../shared/currency.service';
import { Product } from 'src/app/products/product.model';
import { NgbdSortableHeader, SortEvent } from 'src/app/shared/sortable.directive';
import { FormControl } from '@angular/forms';
import { searchTransactions } from '../../shared/utils';
import { onSort } from '../../shared/utils';
import { TransactionProductsModalComponent } from 'src/app/modals/transactionProducts-modal/transactionProducts-modal.component';
@Component({
  selector: 'app-transaction-edit',
  templateUrl: './transaction-edit.component.html',
  providers: [DecimalPipe]
})
export class TransactionEditComponent implements OnInit {
transaction:Transaction
transactionId: number;
date:string
products$:Observable<Product[]>
private allProducts$: BehaviorSubject<Product[]> = new BehaviorSubject([]);
@ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;
isLoading: boolean = false;
error = null;
currency : Currency
currentPage: number = 0;
itemsPerPage: number = 8;
collectionSize: number;
totalSpent: number;
product: Product;
filter = new FormControl('', { nonNullable: true });
constructor(private transactionService: TransactionService,
  private route:ActivatedRoute,private modalService:NgbModal,
  private currencyService:CurrencyService ) {}

  ngOnInit() {
    this.route.params.subscribe(
      (params:Params) =>{
        this.transactionId = params['id']
      }
    )
    this.currencyService.currencies$.subscribe( (data) => {
      this.currency = data
    })

      this.transactionService.getTransaction(this.transactionId).subscribe(
        (data:Transaction) =>{
          this.transaction = data
          this.date = this.transaction.date
          this.fetchProducts(this.transactionId)
        })
        this.transactionService.transactionUpdated.subscribe({
          next: () => {
            this.fetchProducts(this.transactionId)
          },
          error: (err) => {
            console.log(err)
          }
        })

        this.products$ = this.filter.valueChanges.pipe(
          startWith(''),
          debounceTime(300),
          switchMap((text) => search(text, this.allProducts$))
        );
         
  }


onSort(event: SortEvent){
    this.products$ = onSort(event, this.headers, this.products$)
}


fetchProducts(id: number) {
this.isLoading = true
this.totalSpent = 0
this.transactionService.getProducts(id,this.itemsPerPage, this.currentPage)
.subscribe({
  next: (data: any) => {
    // Get all products from the service and pass it to allProducts$ Behavioral subject
    this.allProducts$.next(data.content);
    this.collectionSize = data.totalElements;
    this.isLoading = false
  },
  error: (error) => {
    this.isLoading = false;
    console.log(error)
  }
});
}



onDelete(prod: Product) {
console.log(prod)
  console.log('Deleting product with transactionId:', this.transactionId, 'and product name:', prod.name);
if (window.confirm('Delete Item?')) {
  this.transactionService.deleteProduct(this.transactionId, prod.name).subscribe({
    next:( )=>{
      console.log('product deleted')
    },
    error:(err)=> console.log(err)
  })
}
}

onPageChange(page: number){
  this.currentPage = page;
  this.fetchProducts(this.transactionId)
}

// Modal Methods
addProduct(){
  const modalRef = this.modalService.open(TransactionProductsModalComponent,{size: 'xl'})
  modalRef.componentInstance.mode = 'add'
  modalRef.componentInstance.transactionId = this.transactionId
}



}

  

