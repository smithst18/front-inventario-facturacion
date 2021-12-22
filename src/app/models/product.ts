export class Product{
    constructor(
        public id:number,
        public name:string,
        public price:number,
        public product_code:string,
        public product_quantity:number,
        public product_family:number,
        public active_notification:boolean,
        public family:any,
        public notification: boolean,
        public createdAt:any,
        public updatedAt:any,
    ){}
}