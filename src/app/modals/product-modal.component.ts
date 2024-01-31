import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { TransactionService } from '../transactions/transaction.service';
import { Product } from '../products/product.model';
import { ProductService } from '../products/products.service';


@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
})
export class ProductModalComponent implements OnInit {
product : Product
productForm: FormGroup

constructor(private transactionService: TransactionService,private fb:FormBuilder,
  public activeModal:NgbActiveModal,private productService:ProductService){}


ngOnInit() {
this.productService.currentProduct.subscribe((data)=>{
  this.product = data
})
this.initializeForm()
}

onEdit(){
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



initializeForm() {
  this.productForm = this.fb.group({
    productName: [this.product.name, Validators.required],
    productDescription: [this.product.description, Validators.required],
    productPrice:[this.product.price,Validators.required]
});
}

handleSuccess() {
  this.activeModal.close()
  this.initializeForm(); 
}

handleError(error) {
  this.initializeForm(); 
  console.log(error);
}

}

