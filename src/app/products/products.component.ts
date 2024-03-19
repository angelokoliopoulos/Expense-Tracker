import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';

import { NgbModal , NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import { Product } from './product.model';
import { TransactionService } from '../transactions/transaction.service';
import { ActivatedRoute, Params } from '@angular/router';
import { ProductModalComponent } from '../modals/product-modal.component';
import { ProductService } from './products.service';
import { FormControl} from '@angular/forms';
import { NgbdSortableHeader, SortEvent } from '../shared/sortable.directive';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { debounceTime,  map,  startWith, switchMap, take } from 'rxjs/operators';
import {  DecimalPipe  } from '@angular/common';
import {compare, search} from '../shared/utils'
import { Currency, CurrencyService } from '../shared/currency.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  providers: [DecimalPipe],
  
  
})
export class ProductsComponent implements OnInit {
  products$:Observable<Product[]>
  private allProducts$: BehaviorSubject<Product[]> = new BehaviorSubject([]);
  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;
  isLoading: boolean = false;
  error = null;
  currency : Currency
  currentPage: number = 1;
  itemsPerPage: number = 10;
  collectionSize: number;
  totalSpent: number;
  transactionId: number;
  product: Product;
  filter = new FormControl('', { nonNullable: true });

  constructor(private transactionService: TransactionService,
    private route:ActivatedRoute,private modalService:NgbModal,
    private productService:ProductService,private currencyService:CurrencyService ) {}

  ngOnInit() {
    this.currencyService.currencies$.subscribe((data)=>{
      this.currency = data
    })
    this.route.params.subscribe((params: Params) => {
      this.transactionId = params['id'];
    });
    this.fetchProducts();
    this.productService.productsUpdated.subscribe({
      next: ()=>{
        this.fetchProducts()
      },
      error: (err)=>{
        console.log(err)
      }
    })


   

    // products$ getting their value from the search method which using the allProducts$ behavioral subject
    this.products$ = this.filter.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      switchMap((text) => search(text,this.allProducts$))
    );
    
  }

  onSort({ column, direction }: SortEvent) {
        for (const header of this.headers) {
      if (header.sortable !== column) {
        header.direction = '';
      }
    }
    // Sorting products
    if (direction !== '' || column !== '') {
      this.products$ = this.products$.pipe(
        map((products) =>
          [...products].sort((a, b) => {
            const res = compare(a[column] as string | number, b[column] as string | number);
            return direction === 'asc' ? res : -res;
          })
        )
      );
  }
  }
 
    // Modal Methods

    addProduct(){
      const modalRef = this.modalService.open(ProductModalComponent,{size: 'xl'})
      modalRef.componentInstance.mode = 'add'
      modalRef.componentInstance.transactionId = this.transactionId
    }
  
    
  fetchProducts() {
    this.totalSpent = 0
    this.productService.getProducts(this.transactionId)
    .subscribe({
      next: (data: any) => {
        // Get all products from the service and pass it to allProducts$ Behavioral subject
        this.allProducts$.next(data.content);
        const productsArray = this.allProducts$.value
        this.collectionSize = data.totalElements

        //calculate total spent
        this.totalSpent = productsArray.reduce((total, prod) => total + prod.price, 0);
        this.transactionService.totalSpentSubject.next(this.totalSpent)
      },
      error: (error) => {
        this.isLoading = false;
        this.error = error.message;
        console.error(error.message);
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }


  onEdit(prod:Product) {
    this.productService.setProduct(prod)
    const modalRef = this.modalService.open(ProductModalComponent, { size: 'xl' });
    modalRef.componentInstance.mode = 'edit'
  }

  onDelete(prod: Product) {
    this.productService.setProduct(prod)
      console.log('Deleting product with transactionId:', prod.transactionId, 'and productId:', prod.id);
    if (window.confirm('Delete Item?')) {
      this.productService.deleteProduct(prod.transactionId, prod.id).subscribe({
        next:( )=>{
          console.log('product deleted')
          this.productService.productsUpdated.next()
          
        },
        error:(err)=> console.log(err)
      })
        
    }
  }

 



 
 
}
