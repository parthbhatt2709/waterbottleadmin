export class stock_class{
  constructor(
    public stock_id:number,
    public fk_customer_id:number,
    public fk_emp_id:number,
    public stock_qty:number,
    public stock_date:Date,
    public fk_pro_id:number
  ){}
}
