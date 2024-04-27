import { Component, OnInit } from '@angular/core';
import { Shop } from './shop.model';

@Component({
  selector: 'app-shops',
  standalone: true,
  imports: [],
  templateUrl: './shops.component.html',
})
export class ShopsComponent  implements OnInit{
shops : Shop[]

  

  ngOnInit() {
      
  }


  getShops(){
    
  }


}
