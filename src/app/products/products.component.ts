import {  Component, OnInit} from '@angular/core';
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
  
  
  constructor(private productsService:ProductService,private modalService:NgbModal){}
  ngOnInit() {
    this.productsService.dataUpdated$.subscribe(() => {
      this.fetchProducts();
    });
    this.fetchProducts();
  }

  fetchProducts(){
    this.productsService.getProducts().subscribe( 
      (data:Product[])=>{
        this.products=data
      }
    ),(error)=>{
      console.log(error)
    }
  }

  open(){
    // const modalRef = this.modalService.open(ModalComponent)
    // modalRef.componentInstance.lesson = lesson;
    this.modalService.open(ModalComponent, {size: 'xl'})
   
  }


}
