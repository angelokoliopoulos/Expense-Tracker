export class Product {
    public id:string
    public name:string;
    public description:string;
    public transactionId: string;
    public uid: any
    constructor(name:string,description:string){
        this.name=name
        this.description=description
     }

     setTransactionId(transactionId: string): void {
        this.transactionId = transactionId;
      }

      toJSON(){
        return {
          name: this.name,
          description: this.description,
          transactionId : this.transactionId,
        }
      }
}