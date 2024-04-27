import { Component, OnInit, } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal, NgbTypeaheadSelectItemEvent, } from "@ng-bootstrap/ng-bootstrap";
import { ProductService } from "../products/products.service";
import { BehaviorSubject, Observable, OperatorFunction, Subject, debounceTime, distinctUntilChanged, filter, map, merge } from "rxjs";
import { Product } from "../products/product.model";
import { TransactionService } from "../transactions/transaction.service";

@Component({
    selector: 'app-transactionProducts-modal',
    templateUrl: './transactionProducts-modal.component.html',
})
export class TransactionProductsModalComponent implements OnInit{

    products : Product []
    selectedProduct: Product
    allProducts$: BehaviorSubject<Product[]> = new BehaviorSubject([])
    transactionProductForm: FormGroup;
    transactionId : number
    constructor(public activeModal: NgbActiveModal, 
        private fb : FormBuilder, private productService: ProductService, private transactionService: TransactionService){}


    ngOnInit()  {
        this.initializeForm();
        this.fetchProducts()
    }

  
	search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
		text$.pipe(
			debounceTime(200),
			distinctUntilChanged(),
			map((term) =>
				term.length < 2 ? [] : this.products.filter((product) => product.name.toLowerCase().indexOf(term.toLowerCase()) > -1).map(product => product.name).slice(0, 10)
			),
		);


    fetchProducts(){
        this.productService.getAllProducts().subscribe({
            next: (data: any) =>{
                this.products = data
            },
            error: (err) => {
                console.error(err.message)
            }
        })
    }




    onSubmit(){
        const formValue = this.transactionProductForm.value;
       console.log(formValue)
        this.transactionService.addProductTotransaction(
             this.transactionId,
             formValue.productId, 
             formValue.price)
             .subscribe({
            next:()=> this.handleSuccess(),
            error: (err)=> console.log(err)
        })
    }

    


    

    onProductSelected(selectedProductName: string) {
        this.selectedProduct = this.products.find(product => product.name === selectedProductName);
        if (this.selectedProduct) {
            this.transactionProductForm.patchValue({
                productId: this.selectedProduct.id
            });
        }
}

handleSuccess(){
    this.activeModal.close();
    this.initializeForm()
    console.log('Added product to transaction')
}


initializeForm(){
    this.transactionProductForm = this.fb.group({
    product: ['', Validators.required],
    price: ['', Validators.required],
    productId: []   
    })
}

}