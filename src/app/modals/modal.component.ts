import { Component, EventEmitter, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from '../products/products.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../products/product.model';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  productForm: FormGroup
  editMode = false;
  product: Product;
  

  constructor(public activeModal:NgbActiveModal,
    private productsService:ProductService,private fb:FormBuilder){}

    ngOnInit() {
      this.initializeForm();
    


      if (this.product) {
        this.editMode = true;
        // Update form values with existing product data
        this.productForm.patchValue({
          productName: this.product.name,
          productDescription: this.product.description
        });
      }
    }


        onSubmit(){
          const formValue = this.productForm.value;
          if (this.editMode) {
            
            this.productsService.editProduct({
              id: this.product.id,
              name: formValue.productName,
              description: formValue.productDescription
            }).subscribe({
              next: () => {
                this.handleSuccess();
              },
              error: (error) => {
                this.handleError(error);
              }
            });
          } else {
            
            const newProduct = new Product(formValue.productName, formValue.productDescription);
            this.productsService.addProduct(newProduct).subscribe({
              next: () => {
                this.handleSuccess();
              },
              error: (error) => {
                this.handleError(error);
              }
            });
          }
        }
    

initializeForm() {
  this.productForm = this.fb.group({
      productName: ['', Validators.required],
      productDescription: ['', Validators.required]
  });
}

handleSuccess() {
  this.productsService.triggerDataUpdate();
  this.initializeForm(); // Reset the form after successful operation
}

handleError(error) {
  this.initializeForm(); // Reset the form on error
  console.log(error);
}



}