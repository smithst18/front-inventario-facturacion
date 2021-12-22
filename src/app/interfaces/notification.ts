import { Product } from "../models/product";
export interface Notification {
  id:number,
  value_to_report:number,
  status:boolean,
  product_id:number,
  desactive:boolean,
  item:Product,
  createdAt:any,
  updatedAt:any,
}
