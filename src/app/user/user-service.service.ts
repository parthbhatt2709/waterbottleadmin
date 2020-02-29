import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { user_class } from './user_class';
import { environment } from "../../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  public url:string=environment.url+'user/';
  deleteUrl:string=environment.url+"deleteuser/";
  constructor(public _http:HttpClient) { }
  deleteAll(item:string[])
  {
    let body=JSON.stringify(item);
    let head=new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.deleteUrl,body,{headers:head});
  }
  getAllUser()
  {
    return this._http.get(this.url);
  }
  addUser(item:user_class){
    let body=JSON.stringify(item);
    let head1=new HttpHeaders().set(environment.header, environment.value);
    return this._http.post(this.url,body,{headers:head1});
  }
  deleteUser(user_email:string){
    return this._http.delete(this.url+user_email);
  }
  getUserById(user_email:string)
  {
    return this._http.get(this.url+user_email)
  }
  updateUser(item){
    console.log(item);
    let body=JSON.stringify(item);
    let head1=new HttpHeaders().set(environment.header, environment.value);
    return this._http.put(this.url+item.user_email,body,{headers:head1});
  }
}
