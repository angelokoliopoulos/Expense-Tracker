import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from './product.model';

@Injectable()
export class ProductService {
  dataUpdated = new Subject<void>();

  constructor(private http: HttpClient) {}

 

  triggerDataUpdate() {
    this.dataUpdated.next();
  }
}
