import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { UserdataService } from '../services/userdata.service';


@Component({
  selector: 'app-customtable',
  templateUrl: './customtable.component.html',
  styleUrls: ['./customtable.component.css']
})
export class CustomtableComponent implements OnInit {
  tabledata
  TableSetting;
  Columns = [];
  constructor(private http: UserdataService) {
    //  this.TableSetting = {
    //     page: 1,
    //     limit: 10
    //   }
  }

  ngOnInit() {
    this.Columns = ['ID', 'UserName', "DisplayName", "UserType", "IsEnabled", "IsAdmin", "Email", "Tel", "Mobile", "Remark", "ExpiredDT", "LastLogonDT", "InitUID", "InitDT", "ModifiedUID", "ModifiedDT"];
     this.http.GetUserData().subscribe(a=>{

this.tabledata=(a.data)
console.log(
this.tabledata[0]['UserName'])

    })
    //  this.tabledata
  }

}
