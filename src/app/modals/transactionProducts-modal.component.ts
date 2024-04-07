import { Component, OnInit, } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal, } from "@ng-bootstrap/ng-bootstrap";
import { ProductService } from "../products/products.service";
import { BehaviorSubject, Observable, OperatorFunction, Subject, debounceTime, distinctUntilChanged, filter, map, merge } from "rxjs";
import { Product } from "../products/product.model";

@Component({
    selector: 'app-transactionProducts-modal',
    templateUrl: './transactionProducts-modal.component.html',
})
export class TransactionProductsModalComponent implements OnInit{

    products : Product []
    allProducts$: BehaviorSubject<Product[]> = new BehaviorSubject([])
    transactionProductForm: FormGroup;

    constructor(public activeModal: NgbActiveModal, 
        private fb : FormBuilder, private productService: ProductService){}


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

    


    initializeForm(){
        this.transactionProductForm = this.fb.group({
        product: ['', Validators.required],
        price: ['', Validators.required]    
        })
    }
}