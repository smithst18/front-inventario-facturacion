export class User {
    constructor(
        public id:number,
        public name: string,
        public password:string,
        public role: string,
        public gettoken: boolean,
    ){}
}