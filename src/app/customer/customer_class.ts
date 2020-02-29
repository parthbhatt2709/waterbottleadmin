export class customer_class{
  constructor(
    public customer_id?:number,
    public customer_name?:string,
    public customer_address?:string,
    public customer_mobileno?:number,
    public fk_user_email?:string
  ){}
}
