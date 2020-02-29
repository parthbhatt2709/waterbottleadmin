import { Component, OnInit,ViewChild } from '@angular/core';
import {MatTableDataSource } from '@angular/material';
import { product_class } from './product_class';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { ProductServiceService } from './product-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  displayedColumns: string[] = ['Check','pro_name','Images','pro_desc','pro_mfg','pro_price','action'];
  dataSource = new MatTableDataSource();
  pro_arr:product_class[]=[];
  pro_id:number;
  del_arr:number[]=[];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(public _ser:ProductServiceService,public _route:Router) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this._ser.getAllproduct().subscribe(
      (data:product_class[])=>
      {
        this.pro_arr=data;
        this.dataSource.data=this.pro_arr;
      }
    );
}
onDelete(item:product_class){
  if(confirm('are you sure you want to delete?')){
  this._ser.delete(item.pro_id).subscribe(
      (data:product_class)=>{
        this.pro_arr.splice(this.pro_arr.indexOf(item),1);
        this.dataSource.data=this.pro_arr;
      }
  );
    }

  }
  onAdd(){
    this._route.navigate(['/nav/addproduct']);
   }
   onCheckBoxChange(row:product_class){
    if (this,this.pro_arr.find(x => x == row.pro_id)) {
      this.del_arr.splice(this.del_arr.indexOf(row.pro_id), 1);
    }
    else {
      this.del_arr.push(row.pro_id);
    }
  }
  onDeleteAll()
    {
        if(confirm('Are You Sure To Delete Multiple Users?')){
          this._ser.deleteAll(this.del_arr).subscribe(
            (data:product_class)=>{
              for (let i = 0; i < this.del_arr.length; i++)
              {
                let x=this.pro_arr.find(x=>x.pro_id==this.del_arr[i]);
                this.pro_arr.splice(this.pro_arr.indexOf(x),1);
              }
            this.dataSource.data=this.pro_arr;
            this.dataSource.paginator=this.paginator;
            this.dataSource.sort=this.sort;
            }
          );
        }
    }
   onUpdate(item:product_class)
   {
     this._route.navigate(['/nav/updateproduct',item.pro_id]);
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
