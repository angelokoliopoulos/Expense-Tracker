export class Product {
  public id: number;
  public name: string;
  public quantity: number;
  public description: string;
  public price: number;

  constructor(name: string, quantity: number, price: number) {
    this.name = name;
    this.price = price;
    this.quantity = quantity;
  }
}
