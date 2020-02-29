import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { product_class } from './product_class';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {
   public url:string=environment.url +"product/";
   deleteUrl:string=environment.url+"deleteproduct/";
  constructor(public _http:HttpClient) { }
  deleteAll(item:number[])
  {
    let body=JSON.stringify(item);
    let head=new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.deleteUrl,body,{headers:head});
  }
  getAllproduct()
  {
    return this._http.get(this.url);
  }
  delete(pro_id:number)
  {
    return this._http.delete(this.url+pro_id);
  }
  addProduct(item:FormData){
    //let body=JSON.stringify(item);
    //let head1=new HttpHeaders().set(environment.header, environment.value);
    return this._http.post(this.url,item);
  }
  getproductbyid(pro_id:string)
  {
    return this._http.get(this.url+pro_id)
  }
  updateproduct(pro_id:number,item:FormData){
    // let body=JSON.stringify(item);
    // let head1=new HttpHeaders().set(environment.header, environment.value);
    console.log(pro_id)
    return this._http.put(this.url+pro_id,item);
  }
}
