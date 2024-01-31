import {  Component,Input, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { TransactionService } from 'src/app/transactions/transaction.service';
import { ProductModalComponent } from 'src/app/modals/product-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from '../products.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',

})
export class ProductComponent implements OnInit  {
@Input() product: Product 


constructor(private transactionService: TransactionService,private productService:ProductService,
  private modalService: NgbModal){}

  ngOnInit() {
  }
  onEdit() {
    this.productService.setProduct(this.product)
    const modalRef = this.modalService.open(ProductModalComponent, { size: 'xl' });
    modalRef.componentInstance.mode = 'edit'
  }

  onDelete() {
    console.log('Deleting product with transactionId:', this.product.transactionId, 'and productId:', this.product.id);
  
    if (window.confirm('Delete Item?')) {
      this.transactionService.deleteProduct( this.product.id)
        .then(() => {
          console.log('Product deleted successfully');
        })
        .catch((error) => {
          console.error('Error deleting product:', error);
        });
    }
  }

 
}