import { Component, OnInit,ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import { customer_class } from './customer_class';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { CustomerServiceService } from './customer-service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
    displayedColumns: string[] = ['Check','customer_name','customer_address','customer_mobileno','fk_user_email','action'];
    dataSource = new MatTableDataSource();
    customer_arr:customer_class[]=[];
    customer_id:number;
    del_arr:number[]=[];
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
   constructor(public _ser:CustomerServiceService,public _route:Router) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this._ser.getAllCustomer().subscribe(
      (data:customer_class[])=>
      {
        this.customer_arr=data;
        this.dataSource.data=this.customer_arr;
      }
    );
  }

  onAdd(){
    this._route.navigate(['/nav/addCustomer']);
   }
   onDelete(item:customer_class){
    if(confirm('are you sure you want to delete?')){
  this._ser.deletecustomer(item.customer_id).subscribe(
      (data:customer_class)=>{
        this.customer_arr.splice(this.customer_arr.indexOf(item),1);
        this.dataSource.data=this.customer_arr;
      }
  );
    }

  }
  onCheckBoxChange(row:customer_class){
    if (this.del_arr.find(x => x == row.customer_id)) {
      this.del_arr.splice(this.del_arr.indexOf(row.customer_id), 1);
    }
    else {
      this.del_arr.push(row.customer_id);
    }
  }
  onDeleteAll()
    {
        if(confirm('Are You Sure To Delete Multiple Users?')){
          this._ser.deleteAll(this.del_arr).subscribe(
            (data:customer_class)=>{
              for (let i = 0; i < this.del_arr.length; i++)
              {
                let x=this.customer_arr.find(x=>x.customer_id==this.del_arr[i]);
                this.customer_arr.splice(this.customer_arr.indexOf(x),1);
              }
            this.dataSource.data=this.customer_arr;
            this.dataSource.paginator=this.paginator;
            this.dataSource.sort=this.sort;
            }
          );
        }
    }

  onUpdate(item:customer_class)
   {
     this._route.navigate(['/nav/updatecustomer',item.customer_id]);
   }

   applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
 }
 applyFilter1(filterValue: string) {
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}
}
