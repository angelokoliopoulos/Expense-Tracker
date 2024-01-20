import { Component, ElementRef, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Product } from './product.model';
import { TransactionService } from '../transactions/transaction.service';
import { ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
})
export class ProductsComponent implements OnInit {
  products: Product[];
  isLoading: boolean = false;
  error = null;
  currentPage: number = 1;
  itemsPerPage: number = 3;
  total: number;
  transactionId: string;
  // Modal Variables
 customModal : ElementRef
  productForm: FormGroup
  editMode = false;
  product: Product;

  constructor(private transactionService: TransactionService,
    private route:ActivatedRoute,private fb:FormBuilder) {}

  ngOnInit() {
    this.initializeForm();

  

    this.route.params.subscribe((params: Params) => {
      this.transactionId = params['id'];
     
      this.fetchProducts();
    });

    
  }

  fetchProducts() {
    this.transactionService.getTransactionProducts(this.transactionId).subscribe({
      next: (data: Product[]) => {
        this.products = data;
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

  // Modal Methods

  initializeForm() {
    this.productForm = this.fb.group({
        productName: ['', Validators.required],
        productDescription: ['', Validators.required]
    });
  }
onSubmit(){
  const formValue = this.productForm.value;
  const newProduct = new Product(formValue.productName, formValue.productDescription);
  this.transactionService
    .addProductToTransaction(this.transactionId, newProduct)
    .then(() => {
      // this.handleSuccess();
    })
    .catch((error) => {
      // this.handleError(error);
    });

}
 
}
