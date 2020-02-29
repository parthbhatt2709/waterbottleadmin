export class order_class{
  constructor(

    public fk_pro_id:number,
    public qty:number,
    public order_date:Date,
    public fk_customer_id:number,
    public order_status:string,
    public order_id?:number,

  ){}
}
