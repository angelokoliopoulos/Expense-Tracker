import {  Component,Input, OnDestroy } from '@angular/core';
import { Product } from '../product.model';
import { ProductService } from '../products.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent  {
@Input() product: Product 


  constructor(private productsService:ProductService){}

  onEdit(){

  }
 

  onDelete(){

   if(window.confirm('Delete Item?')){
    this.productsService.deleteProductAndNotify(this.product.id)
   }
 
}
}