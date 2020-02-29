import { Component, OnInit } from '@angular/core';
import { CustomerServiceService } from '../customer-service.service';
import { Router } from '@angular/router';
import { customer_class } from '../customer_class';
import { UserServiceService } from 'src/app/user/user-service.service';
import { user_class } from 'src/app/user/user_class';


@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {
  customer_id:number;
  customer_name:string;
  customer_address:string;
  customer_mobileno:number;
  fk_user_email:string;
  user_email:user_class;
  selected:string;
  user_arr:user_class[]=[];
  constructor(public _ser:CustomerServiceService,public _route:Router,public _userSer:UserServiceService) { }

  ngOnInit() {
    this._userSer.getAllUser().subscribe(
      (data:any[])=>{
        console.log(data);
        this.user_arr=data;
      }
    );
  }

  onAddcustomer(f)
  {
    this._ser.addCustomer(f.value).subscribe(
      (data:customer_class)=>{
        console.log(data);
        this._route.navigate(['/nav/customer']);
      }
    );
  }
}
