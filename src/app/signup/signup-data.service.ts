import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class SignupDataService {
   private url:string= environment.url+"signup/";
   private cust_url:string=environment.url+"customer/";
  constructor(private _http:HttpClient) { }
  signup(obj)
  {
    console.log(obj);
    const body =JSON.stringify(obj);
    const head=new HttpHeaders().set(environment.header,environment.value);
    return this._http.post(this.url,body,{headers:head});
  }
  customerAdd(obj){
    let body=JSON.stringify(obj);
    let head1=new HttpHeaders().set(environment.header,environment.value);
    return this._http.post(this.cust_url,body,{headers:head1});
  }
}
