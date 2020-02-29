// import { Component, OnInit,ViewChild} from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

import { Router } from '@angular/router';
import { QueryValueType } from '@angular/compiler/src/core';
import { BillDataService } from './bill-data.service';
import { ViewChild, OnInit, Component } from '@angular/core';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css']
})
export class BillComponent implements OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(public _billser:BillDataService,public _route:Router) { }
  displayedColumns: string[] = ['bill_date', 'customer_name','action'];
  dataSource=new MatTableDataSource()

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this._billser.getCustomerForBill().subscribe(
      (data:any)=>{
        console.log(data)

        this.dataSource.data=data;
      }
    );

  }

onViewBill(item){
  this._route.navigate(['/nav/generateBill',item.fk_customer_id])
}
  applyFilter1(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
