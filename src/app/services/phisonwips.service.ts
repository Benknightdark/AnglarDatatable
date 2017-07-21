import { environment } from '../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs';

@Injectable()
export class PhisonwipsService {

 JSONoptions = new RequestOptions({ headers: new Headers({ 'Content-Type': 'application/json;charset=utf-8' }) });
  Host: string = environment.ApiUrl;
  constructor(private http: Http) {

  }

  GetUserData(TableSetting) {
    // tslint:disable-next-line:max-line-length
    return this.http.post(this.Host+'/ApiPhisonWips/ReturnPhisonWips',
      JSON.stringify(TableSetting), this.JSONoptions)
      .map(m => m.json()).share()
  }
  GetUserDataColumnsInfo() {
    return this.http.get(this.Host+'/ApiPhisonWips/GetColumnInfo').map(m => m.json()[0]).share()
  }
  PostUserDataColumnsInfo(TableColumn) {
    return this.http.post(this.Host+'/ApiPhisonWips/UpdateColumnInfo',
      JSON.stringify(TableColumn), this.JSONoptions).map(m => m.json()[0]).share()
  }

}
