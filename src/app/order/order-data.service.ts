import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { order_class } from './order_class';
import { order_delivery_class } from './order_delivery_class';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderDataService {
  order_url:string="http://localhost:3000/order/"
  orderDelivery_url:string="http://localhost:3000/orderdelivery/"
  product_url:string="http://localhost:3000/product/"
  customer_url:string="http://localhost:3000/customer/"
  employee_url:string="http://localhost:3000/emp/"
  constructor(public _http:HttpClient) { }
  addOrder(item:order_class)
  {
      let body=JSON.stringify(item);
      console.log(body);
      let head1=new HttpHeaders().set('Content-Type','application/json');
      return this._http.post(this.order_url,body,{headers:head1});
  }
  addOrderDelivery(item:order_delivery_class)
  {
      let body=JSON.stringify(item);
      console.log(body);
      let head1=new HttpHeaders().set('Content-Type','application/json');
      return this._http.post(this.orderDelivery_url,body,{headers:head1});
  }
  getAllProduct(){
    return this._http.get(this.product_url)
  }
  getAllCustomer(){
    return this._http.get(this.customer_url)
  }
  getAllEmployee(){
    return this._http.get(this.employee_url)
  }
  deleteorder(order_id:number)
  {
    return this._http.delete(this.order_url+order_id);
  }
 getorderbyid(order_id:string)
  {
    return this._http.get(this.order_url+order_id)
  }
  updateorder(item:order_class){
    let body=JSON.stringify(item);
    let head1=new HttpHeaders().set(environment.header, environment.value);
    return this._http.put(this.order_url+item.order_id,body,{headers:head1});
  }
  getAllOrder(){
    return this._http.get(this.order_url)
  }
 }
