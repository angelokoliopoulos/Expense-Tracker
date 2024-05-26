import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { Product } from '../../products/product.model';
import { ProductService } from '../../products/products.service';


@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
})
export class ProductModalComponent implements OnInit {
product : Product
productForm: FormGroup
mode: string
transactionId:number
constructor(private fb:FormBuilder,
  public activeModal:NgbActiveModal,private productService:ProductService){}


ngOnInit() {
if(this.mode == 'edit'){
  this.productService.currentProduct.subscribe((data)=>{
    this.product = data
    console.log(this.product)

  })
  this.initializeEditForm()

}else if(this.mode == 'add'){
  this.initializeForm()
}

}
onSubmit(){
  console.log(`mode is ${this.mode}`)
  const formValue = this.productForm.value;
  if(this.mode == 'add'){
    const newProduct = new Product(formValue.productName, formValue.productDescription,formValue.productPrice);
    this.productService
      .addProduct(newProduct).subscribe({
        next:()=>{
          this.handleSuccess()
        },
        error:(err)=>{
          this.handleError(err)
        }
      })
  }
  else if(this.mode == 'edit'){
    const updatedProduct: Partial<Product> = {
      name: formValue.productName,
      description: formValue.productDescription,
  
    };
    this.productService.updateProduct(this.product.id, updatedProduct).subscribe({
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
});
}
initializeForm() {
  this.productForm = this.fb.group({
    productName: ['', Validators.required],
    productDescription: [''],
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

