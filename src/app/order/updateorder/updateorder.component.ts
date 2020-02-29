import { Component, OnInit } from '@angular/core';
import { customer_class } from 'src/app/customer/customer_class';
import { product_class } from 'src/app/product/product_class';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductServiceService } from 'src/app/product/product-service.service';
import { CustomerServiceService } from 'src/app/customer/customer-service.service';
import { OrderDataService } from '../order-data.service';
import { order_class } from '../order_class';
import { EmpDataService } from 'src/app/emp/emp-data.service';
import { emp_class } from 'src/app/emp/emp_class';

@Component({
  selector: 'app-updateorder',
  templateUrl: './updateorder.component.html',
  styleUrls: ['./updateorder.component.css']
})
export class UpdateorderComponent implements OnInit {
 fk_customer_id:number;
 selectedCustomer:number;
 selectedProduct:number;
 selectedEmployee:number;
 customer_arr:customer_class[]=[];
 pro_arr:product_class[]=[];
 emp_arr:emp_class[]=[];
 fk_pro_id:number;
 qty:number;
 order_id:number;
 order_date:Date;
 order_status:string;
  constructor(public _activated_routes:ActivatedRoute,public _ser:OrderDataService,public _custser:CustomerServiceService,public _proser:ProductServiceService,public _route:Router) { }

  ngOnInit() {
    this.order_id=this._activated_routes.snapshot.params['order_id'];
    this._ser.getorderbyid(this.order_id.toString()).subscribe(
      (data:order_class[])=>{
        console.log(data);
        this.selectedProduct=data[0].fk_pro_id;
        this.qty=data[0].qty;
        this.order_date=data[0].order_date;
         this.selectedCustomer=data[0].fk_customer_id;
         this.order_status=data[0].order_status;
       }
    );
    this._custser.getAllCustomer().subscribe(
      (data:any[])=>{
        console.log(data);
        this.customer_arr=data;
      }
    );
    this._proser.getAllproduct().subscribe(
      (data:any[])=>{
        this.pro_arr=data;
      }
    );

    // this._empser.getAllemp().subscribe(
    //   (data:any[])=>{
    //     this.emp_arr=data;
    //   }
    // );

  }
  onupdateorder()
  {
    this._ser.updateorder(new order_class(this.selectedProduct,this.qty,this.order_date,this.selectedCustomer,this.order_status,this.order_id)).subscribe(
      (data:order_class[])=>{
        this._route.navigate(['/nav/order']);
      }
    );
  }
  }
