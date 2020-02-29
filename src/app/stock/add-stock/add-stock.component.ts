import { Component, OnInit } from '@angular/core';
import { customer_class } from 'src/app/customer/customer_class';
import { emp_class } from 'src/app/emp/emp_class';
import { product_class } from 'src/app/product/product_class';
import { StockServiceService } from '../stock-service.service';
import { Router } from '@angular/router';
import { CustomerServiceService } from 'src/app/customer/customer-service.service';
import { EmpDataService } from 'src/app/emp/emp-data.service';
import { ProductServiceService } from 'src/app/product/product-service.service';
import { stock_class } from '../stock_class';

@Component({
  selector: 'app-add-stock',
  templateUrl: './add-stock.component.html',
  styleUrls: ['./add-stock.component.css']
})
export class AddStockComponent implements OnInit {
  stock_id:number;
  fk_customer_id:number;
  fk_emp_id:number;
  stock_qty:number;
  stock_date:Date;
  fk_pro_id:number;
  selectedCustomer:number;
  selectedEmployee:number;
  selectedProduct:number;
  customer_arr:customer_class[]=[];
  emp_arr:emp_class[]=[];
  pro_arr:product_class[]=[];

  constructor(public _ser:StockServiceService,public _route:Router,public _custser:CustomerServiceService,public _empser:EmpDataService,public _proser:ProductServiceService) { }

  ngOnInit() {
    this._custser.getAllCustomer().subscribe(
      (data:any[])=>{
        console.log(data);
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
  onAddstock(f)
  {
      this._ser.addstock(f.value).subscribe(
      (data:stock_class)=>{
         console.log(data);
         this._route.navigate(['/nav/stock']);
      }
    );
  }

}
