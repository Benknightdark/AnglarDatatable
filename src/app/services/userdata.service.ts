import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs';
@Injectable()
export class UserdataService {
  JSONoptions = new RequestOptions({ headers: new Headers({ 'Content-Type': 'application/json;charset=utf-8' }) });

  constructor(private http: Http) {

  }
  GetUserData(TableSetting) {
    // tslint:disable-next-line:max-line-length
    return this.http.post('http://localhost:5566/ApiUserData/ReturnInfoFabUsers',
      JSON.stringify(TableSetting), this.JSONoptions)
      .map(m => m.json()).share()
  }
  GetUserDataColumnsInfo() {
    return this.http.get('http://localhost:5566/ApiUserData/GetColumnInfo').map(m => m.json()[0]).share()
  }
  PostUserDataColumnsInfo(ColumnInfo) {
    return this.http.post('http://localhost:5566/ApiUserData/UpdateColumnInfo',
      JSON.stringify(ColumnInfo), this.JSONoptions).map(m => m.json()[0]).share()
  }
}
