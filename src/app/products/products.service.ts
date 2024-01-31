import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productSource = new BehaviorSubject<Product | null>(null);
  currentProduct = this.productSource.asObservable();

  setProduct(product: Product) {
    this.productSource.next(product);
  }
}
