export class Product {
    public id:number
    public name:string;
    public description:string;
    public price: number
    public transactionId: number;
    
    constructor(name:string,description:string,price:number){
        this.name = name
        this.description = description
        this.price = price
     }

}