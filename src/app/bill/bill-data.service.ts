import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class BillDataService {
  url:string="http://localhost:3000/bill/";
  customer_url:string="http://localhost:3000/customersForBill/"
  billdetails_url:string="http://localhost:3000/getBillDetails/"
  constructor(public _http:HttpClient) { }
  getBillDetails(){
    return this._http.get(this.billdetails_url)
  }
  getAllData(){
    return this._http.get(this.url)
  }
  getDataByID(fk_customer_id)
  {
    return this._http.get(this.url+fk_customer_id)
  }
  getCustomerForBill(){
    return this._http.get(this.customer_url)
  }
  addBill(item){
    let body=JSON.stringify(item);
    let head1=new HttpHeaders().set(environment.header, environment.value);
    return this._http.post(this.url,body,{headers:head1});
  }
}
