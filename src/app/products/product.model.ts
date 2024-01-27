export class Product {
    public id:string
    public name:string;
    public description:string;
    public price: number
    public transactionId: string;
    
    constructor(name:string,description:string,price:number){
        this.name = name
        this.description = description
        this.price = price
     }

      toJSON(){
        return {
          name: this.name,
          description: this.description,
          price: this.price,
          transactionId: this.transactionId,
        }
      }
}