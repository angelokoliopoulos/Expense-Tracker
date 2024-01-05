import {  Component,Input } from '@angular/core';
import { Product } from '../product.model';
import { ProductService } from '../products.service';
import { ModalComponent } from 'src/app/modal/modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent  {
@Input() product: Product 


  constructor(private productsService:ProductService,private modalService:NgbModal){}

  onEdit(){
    const modalRef  = this.modalService.open(ModalComponent, { size: 'xl' },);
   modalRef.componentInstance.product = this.product;
   
  }
 

  onDelete(){

   if(window.confirm('Delete Item?')){
    this.productsService.deleteProductAndNotify(this.product.id)
   }
 
}
}