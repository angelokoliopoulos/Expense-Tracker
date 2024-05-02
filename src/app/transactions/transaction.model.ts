
export class Transaction {
    public id: number;
    public date: string;
    public shopId: number;
    public shopName: string
    constructor(date: string, shopId: number) {
      this.date = date;
      this.shopId = shopId
    }

    
  }