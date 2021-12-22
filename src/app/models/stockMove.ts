export class StockMove{
  constructor(
      public id:number,
      public operation:string,
      public move_quantity:number,
      public description:string,
      public product_id:number,
      public user_id:number,
      public user:any,
      public product: any,
      public createdAt:any,
      public updatedAt:any,
  ){}
}