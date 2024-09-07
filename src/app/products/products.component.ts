import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import {
  NgbHighlight,
  NgbModal,
  NgbPagination,
} from '@ng-bootstrap/ng-bootstrap';
import { Product } from './product.model';
import { ProductModalComponent } from '../modals/product-modal/product-modal.component';
import { ProductService } from './products.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgbdSortableHeader, SortEvent } from '../shared/sortable.directive';
import { BehaviorSubject, Observable } from 'rxjs';
import { debounceTime, startWith, switchMap } from 'rxjs/operators';
import { search } from '../shared/utils';
import { onSort } from '../shared/utils';
import { LoadingSpinnerComponent } from '../shared/loading-spinner/loading-spinner.component';
import { AsyncPipe, DecimalPipe } from '@angular/common';
@Component({
  standalone: true,
  imports: [
    NgbPagination,
    NgbHighlight,
    LoadingSpinnerComponent,
    ReactiveFormsModule,
    DecimalPipe,
    AsyncPipe,
    NgbdSortableHeader,
  ],
  selector: 'app-products',
  templateUrl: './products.component.html',
})
export class ProductsComponent implements OnInit {
  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;
  products$: Observable<Product[]>;
  private allProducts$: BehaviorSubject<Product[]> = new BehaviorSubject([]);
  isLoading: boolean = false;
  error: string;
  currentPage: number = 0;
  itemsPerPage: number = 8;
  collectionSize: number;
  filter = new FormControl('', { nonNullable: true });

  constructor(
    private modalService: NgbModal,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.fetchProducts();
    this.productService.productsUpdated.subscribe({
      next: () => {
        this.fetchProducts();
      },
      error: (err) => {
        console.log(err);
      },
    });

    // products$ getting their value from the search method which using the allProducts$ behavioral subject
    this.products$ = this.filter.valueChanges.pipe(
      startWith(''),
      debounceTime(100),
      switchMap((text) => search(text, this.allProducts$))
    );
  }

  onSort(event: any) {
    this.products$ = onSort(event, this.headers, this.products$);
  }

  fetchProducts() {
    this.isLoading = true;
    this.productService
      .getProducts(this.itemsPerPage, this.currentPage)
      .subscribe({
        next: (data: any) => {
          // Get all products from the service and pass it to allProducts$ Behavioral Subject.
          this.allProducts$.next(data.content);
          this.collectionSize = data.totalElements;
          this.isLoading = false;
        },
        error: (error) => {
          this.isLoading = false;
          console.log(error);
        },
      });
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.fetchProducts();
  }

  // Modal Methods
  addProduct() {
    const modalRef = this.modalService.open(ProductModalComponent, {
      size: 'xl',
    });
    modalRef.componentInstance.mode = 'add';
  }

  onEdit(prod: Product) {
    this.productService.setProduct(prod);
    const modalRef = this.modalService.open(ProductModalComponent, {
      size: 'xl',
    });
    modalRef.componentInstance.mode = 'edit';
  }

  onDelete(prod: Product) {
    console.log('Deleting product with  productId:', prod.id);
    if (window.confirm('Delete Item?')) {
      this.productService.deleteProduct(prod.id).subscribe({
        next: () => {
          console.log('product deleted');
        },
        error: (err) => {
          this.setError(err.error.message);
        },
      });
    }
  }

  setError(errMsg: string) {
    this.error = errMsg;
    setTimeout(() => (this.error = null), 8000);
  }
}
