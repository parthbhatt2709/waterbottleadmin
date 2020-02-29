import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { emp_class } from './emp_class';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class EmpDataService {
  public url:string=environment.url + "emp/";
  public userurl:string=environment.url + "userEmail/";
  deleteUrl:string=environment.url+"deleteemp/";
  constructor(public _http:HttpClient) { }
  deleteAll(item:number[])
  {
    let body=JSON.stringify(item);
    let head=new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.deleteUrl,body,{headers:head});
  }
   getAllemp()
   {
     return this._http.get(this.url);
   }
   deleteEmp(emp_id:number){
    return this._http.delete(this.url+emp_id);
   }
   addEmp(item:emp_class){
     console.log(item)
    let body=JSON.stringify(item);
    let head1=new HttpHeaders().set(environment.header, environment.value);
    return this._http.post(this.url,body,{headers:head1});
  }
  getempbyid(emp_id:string)
  {
    return this._http.get(this.url+emp_id)
  }
  updateEmp(item:emp_class){
    let body=JSON.stringify(item);
    let head1=new HttpHeaders().set(environment.header, environment.value);
    return this._http.put(this.url+item.emp_id,body,{headers:head1});
  }



}
