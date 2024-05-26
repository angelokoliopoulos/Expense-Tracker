import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { Shop } from '../../shops/shop.model';
import { ShopService } from '../../shops/shop.service';
@Component({
  selector: 'app-shop-modal',
  templateUrl: './shop-modal.component.html',
})
export class ShopModalComponent implements OnInit {
shop : Shop
shopForm: FormGroup
mode: string
constructor(private fb:FormBuilder,
  public activeModal:NgbActiveModal,private shopService:ShopService){}





ngOnInit() {
    if(this.mode == 'edit'){
      this.shopService.currentShop.subscribe((data)=>{
        this.shop = data;
        console.log(this.shop)
      })
      this.initializeEditForm();
    }else if(this.mode == 'add'){
      this.initializeForm()
    }
}


onSubmit(){
  console.log(`mode is ${this.mode}`)
  const formValue = this.shopForm.value;
  if(this.mode == 'add'){
    const newShop = new Shop(formValue.shopName)
    this.shopService.addShop(newShop).subscribe({
      next: () => {
        this.handleSuccess()
      },
      error: (err) =>{
        this.handleError(err);
      }
    })
  }else if(this.mode == 'edit'){
    console.log(this.shop)
    const updatedShop :Partial<Shop> = {
      name: formValue.shopName
    }
    this.shopService.updateShop(this.shop.id, updatedShop).subscribe({
      next: () => {
        this.handleSuccess()
      },
      error: (err) =>{
        this.handleError(err);
      }
    })

  }
 
}




  initializeForm(){
    this.shopForm = this.fb.group({
      shopName : ['', Validators.required],
    })
  }

  initializeEditForm(){
    this.shopForm = this.fb.group({
      shopName : [this.shop.name, Validators.required],
    })
  }


  handleSuccess() {
    this.activeModal.close()
    this.initializeForm(); 
  }
  
  handleError(error) {
    this.initializeForm(); 
    console.log(error);
  }
}
