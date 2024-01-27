import { Injectable } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from './product.model';

@Injectable()
export class ProductService {
  dataUpdated = new Subject<void>();

  constructor() {}

 

  triggerDataUpdate() {
    this.dataUpdated.next();
  }
}
