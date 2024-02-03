import { Component, ElementRef, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Product } from './product.model';
import { TransactionService } from '../transactions/transaction.service';
import { ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { ProductModalComponent } from '../modals/product-modal.component';
import { ProductService } from './products.service';

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
    private route:ActivatedRoute,private modalService:NgbModal,private productService:ProductService) {}

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
  onEdit(prod:Product) {
    console.log(prod)
    this.productService.setProduct(prod)
    const modalRef = this.modalService.open(ProductModalComponent, { size: 'xl' });
    modalRef.componentInstance.mode = 'edit'
  }

  onDelete(prod: Product) {
    this.productService.setProduct(prod)
      console.log('Deleting product with transactionId:', prod.transactionId, 'and productId:', prod.id);
    if (window.confirm('Delete Item?')) {
      this.transactionService.deleteProduct(prod.id)
        .then(() => {
          console.log('Product deleted successfully');
        })
        .catch((error) => {
          console.error('Error deleting product:', error);
        });
    }
  }



 
 
}
