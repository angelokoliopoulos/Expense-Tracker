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
mode: string
transactionId:number
constructor(private transactionService: TransactionService,private fb:FormBuilder,
  public activeModal:NgbActiveModal,private productService:ProductService){}


ngOnInit() {
if(this.mode=='edit'){
  this.productService.currentProduct.subscribe((data)=>{
    this.product = data
    console.log(this.product)

    this.initializeEditForm()
  })

}else if(this.mode == 'add'){
  this.initializeForm()
}

}
onSubmit(){
  const formValue = this.productForm.value;
  if(this.mode == 'add'){
    const newProduct = new Product(formValue.productName, formValue.productDescription,formValue.productPrice);
    this.transactionService
      .addProductToTransaction(this.transactionId, newProduct).subscribe({
        next:()=>{
          this.handleSuccess
        },
        error:(err)=>{
          this.handleError(err)
        }
      })
  }
  else if(this.mode == 'edit'){
    const updatedProduct: Partial<Product> = {
      name: formValue.productName,
      // description: formValue.productDescription,
      price:formValue.productPrice ,
      transactionId: this.product.transactionId
    };
    this.transactionService.updateProduct(this.product.id, updatedProduct).subscribe({
      next: ()=>{
        this.handleSuccess()
      },
      error: (err)=>{
        this.handleError(err)
      }
    })
  


}



}



initializeEditForm() {
  this.productForm = this.fb.group({
    productName: [this.product.name, Validators.required],
    productDescription: [this.product.description ? this.product.description : ''],
    productPrice:[this.product.price,Validators.required]
});
}
initializeForm() {
  this.productForm = this.fb.group({
    productName: ['', Validators.required],
    productDescription: [''],
    productPrice:['',Validators.required]
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

