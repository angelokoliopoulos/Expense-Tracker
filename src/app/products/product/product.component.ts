import {  Component,Input, OnDestroy } from '@angular/core';
import { Product } from '../product.model';
import { ProductService } from '../products.service';
import { Subject } from 'rxjs';

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
    this.productsService.deleteProduct(this.product.id).subscribe({
      next: () => {
        this.productsService.triggerDataUpdate();
       
      },
      error: (error) => {
        console.log(error);
      },
      complete: ()=>{
        console.log('completed')
        
      }
    
  })
   }
 
}
}