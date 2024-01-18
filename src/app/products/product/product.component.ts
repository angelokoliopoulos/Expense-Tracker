import {  Component,Input } from '@angular/core';
import { Product } from '../product.model';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent  {
@Input() product: Product 


  constructor(){}

  onEdit(){
  //   const modalRef  = this.modalService.open(ModalComponent, { size: 'xl' },);
  //  modalRef.componentInstance.product = this.product;
   
  }
 

  onDelete(){
   if(window.confirm('Delete Item?')){
    // this.productsService.deleteProductAndNotify(this.product.id)
   }
 
}
}