import { ConfigService } from 'src/app/services/config.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http:HttpClient, private _config:ConfigService) { }

  post(request:any, data:any) : Observable<any>{
    return this._http.post(`${this._config.baseUri}/${request}`, data);
  }
  get(request:any) : Observable<any>{
    return this._http.get(`${this._config.baseUri}/${request}`);
  }
  put(request:any,data:any) : Observable<any>{
    return this._http.put(`${this._config.baseUri}/${request}`, data);
  }
  delete(request:any) : Observable<any>{
    return this._http.delete(`${this._config.baseUri}/${request}`);
  }
}

