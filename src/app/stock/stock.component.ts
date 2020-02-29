import { Component, OnInit,ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { stock_class } from './stock_class';
import { StockServiceService } from './stock-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {
  displayedColumns: string[] = ['Check','customer_name','emp_name','stock_qty','stock_date','pro_name','action'];
  dataSource = new MatTableDataSource();
  stock_arr:stock_class[]=[];
  stock_id:number;
  del_arr:number[]=[];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(public _ser:StockServiceService,public _route:Router) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this._ser.getAllstock().subscribe(
      (data:stock_class[])=>
      {
        this.stock_arr=data;
        this.dataSource.data=this.stock_arr;
      }
    );
  }
  onCheckBoxChange(row:stock_class){
    if (this.del_arr.find(x => x == row.stock_id)) {
      this.del_arr.splice(this.del_arr.indexOf(row.stock_id), 1);
    }
    else {
      this.del_arr.push(row.stock_id);
    }
  }
  onDeleteAll(){

    if(confirm('Are You Sure To Delete Multiple Users?')){
      this._ser.deleteAll(this.del_arr).subscribe(
        (data:stock_class)=>{
          for (let i = 0; i < this.del_arr.length; i++)
          {
            let x=this.stock_arr.find(x=>x.stock_id==this.del_arr[i]);
            this.stock_arr.splice(this.stock_arr.indexOf(x),1);
          }
        this.dataSource.data=this.stock_arr;
        this.dataSource.paginator=this.paginator;
        this.dataSource.sort=this.sort;
        }
      );
    }
  }
  onDelete(item:stock_class){
    if(confirm('are you sure you want to delete?')){
    this._ser.deletestock(item.stock_id).subscribe(
        (data:stock_class[])=>{
          this.stock_arr.splice(this.stock_arr.indexOf(item),1);
          this.dataSource.data=this.stock_arr;
        }
    );
      }
    }
    onAdd(){
      this._route.navigate(['/nav/addstock']);
     }

     onUpdate(item:stock_class)
     {

        this._route.navigate(['/nav/updatestock',item.stock_id]);

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
