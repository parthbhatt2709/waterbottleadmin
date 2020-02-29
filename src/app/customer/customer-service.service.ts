import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { customer_class } from './customer_class';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CustomerServiceService {
  public url:string= environment.url + "customer/";
  deleteUrl:string=environment.url+"deletecustomer/";
  constructor(public _http:HttpClient) { }
  deleteAll(item:number[])
  {
    let body=JSON.stringify(item);
    let head=new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.deleteUrl,body,{headers:head});
  }
  getAllCustomer()
  {
    return this._http.get(this.url);
  }
  addCustomer(item:customer_class){
    let body=JSON.stringify(item);
    let head1=new HttpHeaders().set(environment.header, environment.value);
    return this._http.post(this.url,body,{headers:head1});
  }
  getAllUserEmail()
  {
    return this._http.get(this.url);
  }
  getcustomerbyid(customer_id:string)
  {
    return this._http.get(this.url+customer_id  )
  }
  updatecustomer(item:customer_class){
    let body=JSON.stringify(item);
    let head1=new HttpHeaders().set(environment.header, environment.value);
    return this._http.put(this.url+item.customer_id,body,{headers:head1});
  }
  deletecustomer(customer_id:number){
    return this._http.delete(this.url+customer_id);
  }

}
