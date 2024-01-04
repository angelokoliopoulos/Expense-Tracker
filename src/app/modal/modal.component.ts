import { Component, OnInit } from '@angular/core';
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


  constructor(public activeModal:NgbActiveModal,
    private productsService:ProductService,private fb:FormBuilder){}

    ngOnInit() {
      this.initializeForm();
    }

    onAddProduct(){
      const newProduct = 
      new Product(this.productForm.value.productName,
        this.productForm.value.productDescription)
  
        this.productsService.addProduct(newProduct).subscribe({
          next: () => {
              this.handleSuccess();
          },
          error: (error) => {
              this.handleError(error);
          }
      });
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