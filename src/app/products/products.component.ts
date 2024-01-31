import { Component, ElementRef, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Product } from './product.model';
import { TransactionService } from '../transactions/transaction.service';
import { ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { ProductModalComponent } from '../modals/product-modal.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
})
export class ProductsComponent implements OnInit {
  products: Product[];
  isLoading: boolean = false;
  error = null;
  currentPage: number = 1;
  itemsPerPage: number = 8;
  totalSpent: number;
  transactionId: string;
  product: Product;

  constructor(private transactionService: TransactionService,
    private route:ActivatedRoute,private modalService:NgbModal) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.transactionId = params['id'];
      this.fetchProducts();
    });
  }


    // Modal Methods

    openModal(){
      const modalRef = this.modalService.open(ProductModalComponent,{size: 'xl'})
      modalRef.componentInstance.mode = 'add'
      modalRef.componentInstance.transactionId = this.transactionId
    }
  
    
  fetchProducts() {
    this.totalSpent = 0
    this.transactionService.getTransactionProducts(this.transactionId).subscribe({
      next: (data: Product[]) => {
        this.products = data;
        
        this.totalSpent = this.products.reduce((total, prod) => total + prod.price, 0);
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

  onPageChange(page: number) {
    console.log(this.currentPage)
    this.currentPage = page;
    this.fetchProducts();
  }




 
 
}
