import {  Component, EventEmitter, OnInit} from '@angular/core';
import { Product } from './product.model';
import { ProductService } from './products.service';
import { ModalComponent } from '../modal/modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] ;
  isLoading:boolean = false;
  error = null
  
  
  constructor(private productsService:ProductService,private modalService:NgbModal){}

  ngOnInit() {
    this.productsService.dataUpdated$.subscribe(() => {
        this.isLoading = true
        this.fetchProducts();
    });
    this.fetchProducts();
   
}

fetchProducts() {
    this.productsService.getProducts().subscribe({
        next:  (data: Product[]) => {
            
            this.products = data;
        },
        error: error=>{
            this.isLoading = false
            this.error = error.message
            console.error((error.message))
        },
        complete: ()=>{
            this.isLoading = false
        }
    }
       
    );
}

 open() {
    this.modalService.open(ModalComponent, { size: 'xl' });
   
}


}
