import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from 'src/app/product/product-service.service';
import { EmpDataService } from 'src/app/emp/emp-data.service';
import { CustomerServiceService } from 'src/app/customer/customer-service.service';
import { FormGroup, FormControl } from '@angular/forms';
import { OrderDataService } from '../order-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addorder',
  templateUrl: './addorder.component.html',
  styleUrls: ['./addorder.component.css']
})
export class AddorderComponent implements OnInit {


  orderForm: FormGroup;
  customer_arr: [] = [];
  employee_arr: [] = [];
  product_arr: [] = [];



  constructor(public _orderSer: OrderDataService,public _route:Router) {}
  ngOnInit() {
    this.orderForm = new FormGroup({
      fk_pro_id: new FormControl(null),
      qty: new FormControl(null),
      order_date: new FormControl(null),
      fk_customer_id: new FormControl(null),
      order_status: new FormControl(''),
      fk_order_id: new FormControl(null),
      fk_emp_id: new FormControl(null),
      delivery_date: new FormControl(null),
      comment: new FormControl(null)
    });
    this._orderSer.getAllProduct().subscribe(
      (data:any)=>{
        this.product_arr=data;
      }
    );
    this._orderSer.getAllEmployee().subscribe(
      (data:any)=>{
        this.employee_arr=data;
      }
    );
    this._orderSer.getAllCustomer().subscribe(
      (data:any)=>{
        this.customer_arr=data;
      }
    );
  }
  onAddOrder() {
    let orderObj = {
      fk_pro_id: this.orderForm.value.fk_pro_id,
      qty: this.orderForm.value.qty,
      order_date: this.orderForm.value.order_date,
      fk_customer_id: this.orderForm.value.fk_customer_id,
      order_status: this.orderForm.value.order_status
    };
    this._orderSer.addOrder(orderObj).subscribe((data: any) => {
      console.log(data);
      let orderDeliveryObj = {
        fk_order_id: data.insertId,
        fk_emp_id: this.orderForm.value.fk_emp_id,
        delivery_date: this.orderForm.value.delivery_date,
        comment: this.orderForm.value.comment
      };

      this._orderSer
        .addOrderDelivery(orderDeliveryObj)
        .subscribe((data: any) => {
          console.log(data);
          this._route.navigate(['/nav/order'])
        });
    });
  }

}
