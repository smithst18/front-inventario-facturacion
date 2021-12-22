import { Product } from "./product";

export class ProductPayment{
  constructor(
    public id:number,
    public product_qty:number,
    public product_price:number,
    public paidProduct:Product,
    public createdAt:any,
    public updatedAt:any,
  ){}
}