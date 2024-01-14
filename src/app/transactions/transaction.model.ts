import { Product } from "../products/product.model";

export class Transaction {
    public id: string;
    public date: string;
    public shop: string;
    public products: Product[] 
  
    constructor(date: string, shop: string) {
      this.date = date;
      this.shop = shop;
    }
  }