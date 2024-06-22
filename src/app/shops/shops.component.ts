import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { NgbdSortableHeader, SortEvent } from '../shared/sortable.directive';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { Shop } from './shop.model';
import { ShopService } from './shop.service';
import { ShopModalComponent } from '../modals/shop-modal/shop-modal.component';
import { BehaviorSubject, Observable, debounceTime, map, startWith, switchMap } from 'rxjs';
import { FormControl } from '@angular/forms';
import { search, compare, onSort } from '../shared/utils';

@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
})
export class ShopsComponent  implements OnInit{
@ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;
shops$ : Observable<Shop[]>
private allShops$ : BehaviorSubject<Shop[]> = new BehaviorSubject([]);
isLoading: boolean = false;
error = null;
currentPage: number = 0;
itemsPerPage: number = 8;
collectionSize: number;
filter = new FormControl('', { nonNullable: true });



constructor(private shopService: ShopService,private modalService:NgbModal){}

  ngOnInit() {
      
    this.getShops();
    this.shopService.shopsUpdated.subscribe({
      next: () => {
        this.getShops()
      },
      error: (err) => {
        console.log(err);
      }
    })

    this.shops$ = this.filter.valueChanges.pipe(
      startWith(''),
      debounceTime(100),
      switchMap((text) => search(text, this.allShops$))
    );


    
  }


  getShops(){
    this.isLoading = true
    this.shopService.getShops(this.itemsPerPage, this.currentPage).subscribe({
      next: (data:any) => {
        //Get all shops from the service and pass it to the allShops$ Behavioral Subject
        this.allShops$.next(data.content); 
        this.collectionSize = data.totalElements;
        this.isLoading = false

      },
      error: (error) => {
        this.isLoading = false;
        this.error = error.message;
      },

    })
  }

  onSort(event: SortEvent) {
  this.shops$ = onSort(event, this.headers, this.shops$);
}


  onPageChange(page: number){
    this.currentPage = page;
    this.getShops();
  }

  //Modal Methods
  addShop(){
    const modalRef = this.modalService.open(ShopModalComponent, {size: 'xl'})
    modalRef.componentInstance.mode = 'add'
  }

  onEdit(shop: Shop){
    this.shopService.setShop(shop)
    const modalRef = this.modalService.open(ShopModalComponent, {size: 'xl'})
    modalRef.componentInstance.mode = 'edit'

  }


  onDelete(shop: Shop){
    if(window.confirm("Delete shop?")){
      this.shopService.deleteShop(shop.id).subscribe({
        next: () => {
          console.log("Shop deleted")
        },
        error: (err) => {
          console.log(err)
        }
      })
    }
  }



}
