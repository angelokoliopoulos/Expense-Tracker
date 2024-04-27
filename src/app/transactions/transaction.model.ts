
export class Transaction {
    public id: number;
    public date: string;
    public shopName: string;
    constructor(date: string, shop: string) {
      this.date = date;
      this.shopName = shop;
    }

    
  }