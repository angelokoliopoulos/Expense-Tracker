import {  Component,Input, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { TransactionService } from 'src/app/transactions/transaction.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',

})
export class ProductComponent implements OnInit  {
@Input() product: Product 
productForm: FormGroup

modalOpen:boolean = false


  constructor(private transactionService: TransactionService,private fb:FormBuilder){}

  ngOnInit() {
    this.initializeForm()
  }
  onEdit(){
    this.modalOpen = true
  }

 

  closeModal(){
    this.modalOpen = false
  }

  initializeForm() {
    this.productForm = this.fb.group({
        productName: [this.product.name, Validators.required],
        productDescription: [this.product.description, Validators.required],
        productPrice:[this.product.price,Validators.required]
    });
  }

  handleSuccess(){
    this.initializeForm()
    this.closeModal()
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

  onSubmit(){
    const formValue = this.productForm.value;
    const updatedProduct: Partial<Product> = {
      name: formValue.productName,
      description: formValue.productDescription,
      price:formValue.productPrice  
    };
    this.transactionService.updateProduct(this.product.id, updatedProduct).then(
      ()=>{
        this.handleSuccess()
      }
    ).catch((error)=>{
      console.log(error)
    })

  }
}