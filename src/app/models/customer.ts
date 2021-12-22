import { ProductPayment } from "./productPayment";

export class Customer {
  constructor(
      public id:number,
      public name: string,
      public ci:string,
      public email: string,
      public phone_number: string,
      public address: string,
      public qrcode: string,
      public active: boolean,
  ){}
}