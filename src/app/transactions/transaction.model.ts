import { Product } from "../products/product.model";

export class Transaction {
    public id: string;
    public date: string;
    public shop: string;
    public products: Product[] 
    public totalSpent:number
    constructor(date: string, shop: string) {
      this.date = date;
      this.shop = shop;
    }

    toJSON(): any {
      return {
        date: this.date,
        shop: this.shop,
      };
    }
  }