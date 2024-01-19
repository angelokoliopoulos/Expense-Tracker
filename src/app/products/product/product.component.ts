import {  Component,Input } from '@angular/core';
import { Product } from '../product.model';
import { TransactionService } from 'src/app/transactions/transaction.service';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',

})
export class ProductComponent  {
@Input() product: Product 


  constructor(private transactionService: TransactionService){}

  onEdit(){
  //   const modalRef  = this.modalService.open(ModalComponent, { size: 'xl' },);
  //  modalRef.componentInstance.product = this.product;
   
  }
 
  onDelete() {
    console.log('Deleting product with transactionId:', this.product.transactionId, 'and productId:', this.product.id);
  
    if (window.confirm('Delete Item?')) {
      this.transactionService.deleteProduct( this.product.id)
        .then(() => {
          console.log('Product deleted successfully');
          // You may want to trigger any additional logic or UI updates
        })
        .catch((error) => {
          console.error('Error deleting product:', error);
          // Handle the error as needed
        });
    }
  }
}