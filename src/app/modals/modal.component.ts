import { Component, EventEmitter, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from '../products/products.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../products/product.model';
import { ActivatedRoute, Params } from '@angular/router';
import { TransactionService } from '../transactions/transaction.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  productForm: FormGroup
  editMode = false;
  product: Product;
  transactionId:string

  constructor(public activeModal:NgbActiveModal,
    private productsService:ProductService,private fb:FormBuilder,
    private route: ActivatedRoute,private transactionService:TransactionService){}

    ngOnInit() {
      this.initializeForm();
      
      this.route.params.subscribe((
        params:Params
      )=>{
        this.transactionId = params['id']
      })


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
            this.transactionService.addProductToTransaction(this.transactionId, newProduct).subscribe({
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
  this.initializeForm(); // Reset the form after successful operation
}

handleError(error) {
  this.initializeForm(); // Reset the form on error
  console.log(error);
}



}