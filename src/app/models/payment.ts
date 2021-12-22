import { Customer } from "./customer";
import { ProductPayment } from "./productPayment";

export class Payment{
  constructor(
    public id:number,
    public payment_type:string,
    public iva:number,
    public sub_total:number,
    public total:number,
    public status:boolean,
    public createdAt:any,
    public updatedAt:any,
    public customer_id:number,
    public client:Customer,
    public Product_Payments: ProductPayment[]
  ){}
}