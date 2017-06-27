import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs';
@Injectable()
export class UserdataService {
  JSONoptions = new RequestOptions({ headers: new Headers({ 'Content-Type': 'application/json;charset=utf-8' }) });
  TableSetting: any={start:0,length:10};
  constructor(private http: Http) {

  }
  GetUserData() {
     this.TableSetting.start = 0;
    this.TableSetting.length = 10;
    // tslint:disable-next-line:max-line-length
    return this.http.post('http://localhost:5566/ApiUserData/ReturnInfoFabUsers',
     JSON.stringify(this.TableSetting), this.JSONoptions)
    .map(m => m.json())
  }
}
