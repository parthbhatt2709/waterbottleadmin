export class order_delivery_class{
  constructor(
        public order_delivery_id:number,
        public fk_order_id:number,
        public fk_emp_id:number,
        public delivery_date:Date,
        public comment:string

  ){}
}
