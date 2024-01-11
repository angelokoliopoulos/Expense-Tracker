import { Product } from "../products/product.model";

export class Transaction {
    public id : string
    public date: Date;
    public shop : string
    public products : Product[]
    public totalSpent: string

    constructor(date:Date,shop:string){
        this.date=date;
        this.shop = shop;
        this.products = []
    }
}
