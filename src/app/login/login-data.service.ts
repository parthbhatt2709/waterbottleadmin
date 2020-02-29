import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class LoginDataService {
  private url: string = environment.url + "login/"
  constructor(private _http: HttpClient) { }
  login(obj) {
    const body = JSON.stringify(obj);
    const head = new HttpHeaders().set(environment.header, environment.value);
    return this._http.post(this.url, body, { headers: head });
  }
}
