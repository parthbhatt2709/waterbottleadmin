import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StockServiceService } from '../stock-service.service';
import { stock_class } from '../stock_class';
import { customer_class } from 'src/app/customer/customer_class';
import { emp_class } from 'src/app/emp/emp_class';
import { product_class } from 'src/app/product/product_class';
import { CustomerServiceService } from 'src/app/customer/customer-service.service';
import { EmpDataService } from 'src/app/emp/emp-data.service';
import { ProductServiceService } from 'src/app/product/product-service.service';

@Component({
  selector: 'app-update-stock',
  templateUrl: './update-stock.component.html',
  styleUrls: ['./update-stock.component.css']
})
export class UpdateStockComponent implements OnInit {
 stock_id:number;
 fk_customer_id:number;
 fk_emp_id:number;
 selectedCustomer:number;
 selectedEmployee:number;
 selectedProduct:number;
 customer_arr:customer_class[]=[];
 emp_arr:emp_class[]=[];
 pro_arr:product_class[]=[];
 stock_qty:number;
 stock_date:Date;
 fk_pro_id:number;
 stock_arr:stock_class[]=[];
  constructor(public _activated_routes:ActivatedRoute,public _ser:StockServiceService,public _custser:CustomerServiceService,public _empser:EmpDataService,public _proser:ProductServiceService,public _route:Router) { }

  ngOnInit() {
    this.stock_id=this._activated_routes.snapshot.params['stock_id'];
    this._ser.getstockbyid(this.stock_id.toString()).subscribe(
      (data:stock_class[])=>{
        console.log(data);
         this.selectedCustomer=data[0].fk_customer_id;
         this.selectedEmployee=data[0].fk_emp_id;
         this.stock_qty=data[0].stock_qty;
         this.stock_date=data[0].stock_date;
         this.selectedProduct=data[0].fk_pro_id;
      }
    );
    this._custser.getAllCustomer().subscribe(
      (data:any[])=>{
        this.customer_arr=data;
      }
    );

    this._empser.getAllemp().subscribe(
      (data:any[])=>{
        this.emp_arr=data;
      }
    );
    this._proser.getAllproduct().subscribe(
      (data:any[])=>{
        this.pro_arr=data;
      }
    );
    }

  onupdatestock()
  {
console.log(this.selectedEmployee);
    this._ser.updatestock(new stock_class(this.stock_id,this.selectedCustomer,this.selectedEmployee,this.stock_qty,this.stock_date,this.selectedProduct)).subscribe(
      (data:stock_class[])=>{
        this._route.navigate(['/nav/stock']);
      }
    );
  }


  }



