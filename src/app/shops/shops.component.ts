import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { NgbdSortableHeader, SortEvent } from '../shared/sortable.directive';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { Shop } from './shop.model';
import { ShopService } from './shop.service';
import { ShopModalComponent } from '../modals/shop-modal/shop-modal.component';

@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
})
export class ShopsComponent  implements OnInit{
shops$ : Shop[]
currentPage: number = 0;
itemsPerPage: number = 8;
collectionSize: number;
@ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;


constructor(private shopService: ShopService,private modalService:NgbModal){}

  ngOnInit() {
      
    this.getShops();
    this.shopService.shopsUpdated.subscribe({
      next: () => {
        this.getShops()
      },
      error: (err) =>{
        console.log(err);
      }
    })
  }


  getShops(){
    this.shopService.getShops(this.itemsPerPage, this.currentPage).subscribe({
      next: (data:any) => {
        this.shops$ = data.content
        this.collectionSize = data.totalElements;
        console.log(data.content)
      },
      error: (err)=>{
        console.error(err.message);
      },

    })
  }


  onSort(e: SortEvent){

  }


  onPageChange(page: number){
    this.currentPage = page;
    this.getShops();
  }


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
        error: (err) =>{
          console.log(err)
        }
      })
    }
  }



}
