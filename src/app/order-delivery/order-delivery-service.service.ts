import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class OrderDeliveryServiceService {
  public url:string=environment.url+"orderdelivery/";
  public orderurl:string=environment.url+"order/";
  public empurl:string=environment.url+"emp/";

  constructor(public _http:HttpClient) { }
  getAllOrderdel()
   {
     return this._http.get(this.url);
   }
   deleteOrderdel(order_delivery_id:number){
    return this._http.delete(this.url+order_delivery_id);
   }
}
