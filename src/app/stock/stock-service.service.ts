import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { stock_class } from './stock_class';
import {environment  } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class StockServiceService {
   public url:string=environment.url +"stock/";
   deleteUrl:string=environment.url+"deletestock/";
  constructor(public _http:HttpClient) { }
  deleteAll(item:number[])
  {
    let body=JSON.stringify(item);
    let head=new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.deleteUrl,body,{headers:head});
  }
  getAllstock()
  {
    return this._http.get(this.url);
  }
  deletestock(stock_id:number){
    return this._http.delete(this.url+stock_id);
  }
  addstock(item:stock_class){
    let body=JSON.stringify(item);
    let head1=new HttpHeaders().set(environment.header, environment.value);
    return this._http.post(this.url,body,{headers:head1});
  }
  getstockbyid(stock_id:string)
  {
    return this._http.get(this.url+stock_id)
  }
  updatestock(item:stock_class){
    let body=JSON.stringify(item);
    let head1=new HttpHeaders().set(environment.header, environment.value);
    return this._http.put(this.url+item.stock_id,body,{headers:head1});
}
}
