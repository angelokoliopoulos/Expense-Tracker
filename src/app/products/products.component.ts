import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';

import { NgbModal , NgbPaginationModule,NgbPagination} from '@ng-bootstrap/ng-bootstrap';
import { Product } from './product.model';
import { ActivatedRoute, Params } from '@angular/router';
import { ProductModalComponent } from '../modals/product-modal.component';
import { ProductService } from './products.service';
import { FormControl} from '@angular/forms';
import { NgbdSortableHeader, SortEvent } from '../shared/sortable.directive';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { debounceTime,  map,  startWith, switchMap, take } from 'rxjs/operators';
import {  DecimalPipe  } from '@angular/common';

import { Currency, CurrencyService } from '../shared/currency.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  providers: [DecimalPipe],
  
  
})
export class ProductsComponent implements OnInit {
  products:Product[]
  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;
  isLoading: boolean = false;
  error = null;
  currency : Currency
  currentPage: number = 1;
  itemsPerPage: number = 3;
  collectionSize: number;
  transactionId: number;
  filter = new FormControl('', { nonNullable: true });

  constructor(
    private route:ActivatedRoute,private modalService:NgbModal,
    public productService:ProductService,private currencyService:CurrencyService) {
    }

  ngOnInit() {
    this.currencyService.currencies$.subscribe((data)=>{
      this.currency = data
    })
    this.route.params.subscribe((params: Params) => {
      this.transactionId = params['id'];
    });

   
    //1. Subscribe to the getProducts subscription.
    this.productService.getProducts()
    //2. Fetch products from the productSubject.
    this.fetchProducts();
    //3. Re fetch the products on  subject trigger.
    this.productService.productsUpdated.subscribe({
      next: () => {
        this.fetchProducts()
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  onSort({ column, direction }: SortEvent) {
        for (const header of this.headers) {
      if (header.sortable !== column) {
        header.direction = '';
      }
    }
  }

    
  fetchProducts() {
    this.productService.products$
    .subscribe({
      next: (data: any) => {
        console.log('Fetched products:', data);

        this.products = data
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


   // Modal Methods
   addProduct(){
    const modalRef = this.modalService.open(ProductModalComponent,{size: 'xl'})
    modalRef.componentInstance.mode = 'add'
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

  

 



 
 
}
