import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';

import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { Product } from './product.model';
import { ActivatedRoute, Params } from '@angular/router';
import { ProductModalComponent } from '../modals/product-modal.component';
import { ProductService } from './products.service';
import { FormControl} from '@angular/forms';
import { NgbdSortableHeader, SortEvent } from '../shared/sortable.directive';
import { BehaviorSubject, Observable } from 'rxjs';
import { debounceTime,  map,  startWith, switchMap } from 'rxjs/operators';
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
  currentPage: number = 0;
  itemsPerPage: number = 8;
  collectionSize: number;
  transactionId: number;
  filter = new FormControl('', { nonNullable: true });

  constructor(
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
      debounceTime(100),
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
    }
  
    
  fetchProducts() {
    this.productService.getProducts(this.itemsPerPage, this.currentPage)
    .subscribe({
      next: (data: any) => {
        // Get all products from the service and pass it to allProducts$ Behavioral subject
        this.allProducts$.next(data.content);
        this.collectionSize = data.totalElements;
      
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
      console.log('Deleting product with  productId:', prod.id);
    if (window.confirm('Delete Item?')) {
      this.productService.deleteProduct(prod.id).subscribe({
        next:( )=>{
          console.log('product deleted') 
        },
        error:(err)=> console.log(err)
      })
        
    }
  }

  onPageChange(page: number){
    this.currentPage = page
    this.fetchProducts();
  }

 



 
 
}
