import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

import { ActivatedRoute } from '@angular/router';
import { BillDataService } from '../bill/bill-data.service';

@Component({
  selector: 'app-generate-bill',
  templateUrl: './generate-bill.component.html',
  styleUrls: ['./generate-bill.component.css']
})
export class GenerateBillComponent implements OnInit {
  displayedColumns: string[] = ['customer_name', 'pro_name', 'pro_price', 'qty', 'order_date', 'order_status', 'action'];
  displayedColumns1:string[]=['customer_name', 'pro_name', 'pro_price', 'qty', 'order_date', 'order_status','bill_amount','bill_date','ispaid','payment_type'];
  dataSource = new MatTableDataSource()
  dataSource1=new MatTableDataSource()
  fk_customer_id: number;
  total = 0;
  bill_date: Date;
  billarr: any[] = [];
  flag: number = 0
  pastOrderFlag:number=0;

  constructor(public _billser: BillDataService, public _activateRoutes: ActivatedRoute) { }

  ngOnInit() {
    this.fk_customer_id = this._activateRoutes.snapshot.params['fk_customer_id'];
    this._billser.getDataByID(this.fk_customer_id).subscribe(
      (data: any) => {
        console.log(data);
        this.dataSource.data = data;
        this.dataSource1.data=data;
        for (let i = 0; i < data.length; i++) {
          this.bill_date = data[0].bill_date;
          this.total += data[i].qty * data[i].pro_price
        }


      }
    );
    this._billser.getBillDetails().subscribe(
      (data: any) => {
        this.billarr = data;
      }
    );

  }
  onGenerateBill(item) {
    console.log(item)
    var billobj = {
      fk_customer_id: item.fk_customer_id,
      bill_amount: item.pro_price * item.qty,
      bill_date: null,
      ispaid: "no",
      payment_type: "cash",
      fk_pro_id: item.fk_pro_id,
      fk_order_id: item.order_id
    }

    console.log(this.billarr)

    for (let i = 0; i < this.billarr.length; i++) {
      if (this.billarr[i].fk_order_id == billobj.fk_order_id) {
        this.flag = 1;
        // console.log("bill already generated")
        // this._route.navigate(['/nav/generateBill',item.fk_customer_id])
      }
    }

    if (this.flag == 0) {
      this._billser.addBill(billobj).subscribe(
        (data: any) => {
          alert("Bill Generated")

        }
      );
    }
    this.pastOrderFlag=0;
  }
  onPastOrderDetails(){
    this.pastOrderFlag=1;
  }

}
