import { Product } from "./product";

export class Notification{
  constructor(
      public id:number,
      public value_to_report:number,
      public status:boolean,
      public product_id:number,
      public desactive:boolean,
      public item:Product,
      public createdAt:any,
      public updatedAt:any,
  ){}
}