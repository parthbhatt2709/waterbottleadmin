import { Component, OnInit,ViewChild} from '@angular/core';
import { MatTableDataSource,MatDialog} from '@angular/material';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { OrderDataService } from './order-data.service';
import { order_class } from "./order_class";
import { Router } from '@angular/router';
//import { ViewmoreorderComponent } from './viewmoreorder/viewmoreorder.component';
//import{ViewmoreorderComponent} from './viewmoreorder/Viewmoreorder.component';
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  displayedColumns: string[] = ['product_name','qty','order_date','customer_name','order_status','action'];
  dataSource =new MatTableDataSource();
  order_arr:order_class[]=[];
  order_id:number;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(public _dialog:MatDialog,public _ser:OrderDataService,public _route:Router) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this._ser.getAllOrder().subscribe(
      (data:order_class[])=>
      {
        this.order_arr=data;
        this.dataSource.data=this.order_arr;
      }
    );
  }
  onDelete(item:order_class)
  {
    if(confirm('are you sure you want to delete?')){
    this._ser.deleteorder(item.order_id).subscribe(
      (data:order_class[])=>{
       this.order_arr.splice(this.order_arr.indexOf(item),1);
       this.dataSource.data=this.order_arr;
      }
    );
    }
  }
  onUpdate(item:order_class)
  {
   this._route.navigate(['/nav/updateorder',item.order_id ])
  }
  onAdd()
  {
    this._route.navigate(['/nav/addorder']);
  }
  // viewmore(row)
  //  {
  //     this._dialog.open(ViewmoreorderComponent,{
  //    data:row
  //     });
  //   }


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
