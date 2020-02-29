import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerServiceService } from '../customer-service.service';
import { customer_class } from '../customer_class';
import { user_class } from 'src/app/user/user_class';
import { UserServiceService } from 'src/app/user/user-service.service';

@Component({
  selector: 'app-update-customer',
  templateUrl: './update-customer.component.html',
  styleUrls: ['./update-customer.component.css']
})
export class UpdateCustomerComponent implements OnInit {
  customer_id:number;
  customer_name:string;
  customer_address:string;
  customer_mobileno:number;
  fk_user_email:string;
  user_email:user_class;
  selected:string;
  user_arr:user_class[]=[];
  constructor(public _activated_routes:ActivatedRoute,public _ser:CustomerServiceService,public _route:Router,public _userser:UserServiceService) { }

  ngOnInit() {
    this.customer_id=this._activated_routes.snapshot.params['customer_id'];
    console.log(this.customer_id);
    this._ser.getcustomerbyid(this.customer_id.toString()).subscribe(
      (data:customer_class)=>{
        console.log(data);
         this.customer_name=data[0].customer_name;
         this.customer_address=data[0].customer_address;
         this.customer_mobileno=data[0].customer_mobileno;
         this.fk_user_email=data[0].fk_user_email;
      }
    );
    this._userser.getAllUser().subscribe(
      (data:any[])=>{
        console.log(data);
        this.user_arr=data;
      }
    );



  }
  onupdatecustomer(item:customer_class)
  {
    this._ser.updatecustomer(new customer_class(this.customer_id,this.customer_name,this.customer_address,this.customer_mobileno,this.selected)).subscribe(
      (data:customer_class)=>{
        this._route.navigate(['/nav/customer']);
      }
    );
  }

}

