import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { Product } from './product.model';
import { ProductModalComponent } from '../modals/product-modal/product-modal.component';
import { ProductService } from './products.service';
import { FormControl} from '@angular/forms';
import { NgbdSortableHeader, SortEvent } from '../shared/sortable.directive';
import { BehaviorSubject, Observable } from 'rxjs';
import { debounceTime,   startWith, switchMap } from 'rxjs/operators';
import { search} from '../shared/utils'
import { onSort } from '../shared/utils';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  
})
export class ProductsComponent implements OnInit {
  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;
  products$:Observable<Product[]>
  private allProducts$: BehaviorSubject<Product[]> = new BehaviorSubject([]);
  isLoading: boolean = false;
  error = null;
  currentPage: number = 0;
  itemsPerPage: number = 8;
  collectionSize: number;
  filter = new FormControl('', { nonNullable: true });


  constructor(
   private modalService:NgbModal,
    private productService:ProductService) {}

  ngOnInit() {
    
   
    this.fetchProducts();
    this.productService.productsUpdated.subscribe({
      next: () => {
        this.fetchProducts()
      },
      error: (err) => {
        console.log(err)
      }
    })


   

    // products$ getting their value from the search method which using the allProducts$ behavioral subject
    this.products$ = this.filter.valueChanges.pipe(
      startWith(''),
      debounceTime(100),
      switchMap((text) => search(text,this.allProducts$))
    );
    
  }


  onSort(event:SortEvent){
    this.products$ = onSort(event, this.headers, this.products$)
  }
  
  fetchProducts() {
    this.isLoading = true
    this.productService.getProducts(this.itemsPerPage, this.currentPage)
    .subscribe({
      next: (data: any) => {
        // Get all products from the service and pass it to allProducts$ Behavioral subject
        this.allProducts$.next(data.content);
        this.collectionSize = data.totalElements;
        this.isLoading = false

      },
      error: (error) => {
        this.isLoading = false;
        this.error = error.message;
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

 
    // Modal Methods
    addProduct(){
      const modalRef = this.modalService.open(ProductModalComponent,{size: 'xl'})
      modalRef.componentInstance.mode = 'add'
    }
  
  

  onEdit(prod:Product) {
    this.productService.setProduct(prod)
    const modalRef = this.modalService.open(ProductModalComponent, { size: 'xl' });
    modalRef.componentInstance.mode = 'edit'
    // modalRef.componentInstance.product = prod
  }

  onDelete(prod: Product) {
      console.log('Deleting product with  productId:', prod.id);
    if (window.confirm('Delete Item?')) {
      this.productService.deleteProduct(prod.id).subscribe({
        next:( ) => {
          console.log('product deleted') 
        },
        error:(err) => console.log(err)
      })
        
    }
  }

  onPageChange(page: number){
    this.currentPage = page 
    this.fetchProducts();
  }

 



 
 
}
