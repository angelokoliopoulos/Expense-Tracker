import { Product } from "../products/product.model";

export class Transaction {
    public id: number;
    public date: string;
    public shop: string;
    public products: Product[] 
    public totalSpent:number = 0
    constructor(date: string, shop: string) {
      this.date = date;
      this.shop = shop;
    }

    
  }