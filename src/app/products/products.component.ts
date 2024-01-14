import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../modals/modal.component';
import { Product } from './product.model';
import { ProductService } from './products.service';
import { TransactionService } from '../transactions/transaction.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
})
export class ProductsComponent implements OnInit {
  products: Product[];
  isLoading: boolean = false;
  error = null;
  currentPage: number = 1;
  itemsPerPage: number = 10;
  total: number;
  transactionId: string;
  constructor(private transactionService: TransactionService, private modalService: NgbModal,
    private route:ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.transactionId = params['id'];
      this.transactionService.dataUpdated.subscribe(() => {
        this.isLoading = true;
        this.fetchProducts();
      });
      this.fetchProducts();
    });
  }

  fetchProducts() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.transactionService.getProductsForTransaction(this.transactionId, startIndex, this.itemsPerPage).subscribe({
      next: (data: Product[]) => {
        this.products = data;
      },
      error: (error) => {
        this.isLoading = false;
        this.error = error.message;
        console.error(error.message);
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  open() {
    this.modalService.open(ModalComponent, { size: 'xl' });
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.fetchProducts();
  }
}
