import { Payment } from "./payment";
import { Product} from"./product";
export class Invoice{
  constructor(
      public id:number,
      public paymentId:number,
      public productId:number,
      public createdAt:any,
      public updatedAt:any,
      public payment:Payment,
      public products:Product[],
  ){}
}