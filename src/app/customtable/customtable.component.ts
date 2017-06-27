import { Component, OnInit,Input } from '@angular/core';
import { Http } from '@angular/http';
import { UserdataService } from '../services/userdata.service';


@Component({
  selector: 'app-customtable',
  templateUrl: './customtable.component.html',
  styleUrls: ['./customtable.component.css']
})
export class CustomtableComponent implements OnInit {
  tabledata
  TableSetting: any={};
  Columns = [];
  Pages=[];
  constructor(private http: UserdataService) {}

  ngOnInit() {
   this.TableSetting={start:0,length:10};
    this.Columns = ['ID', 'UserName', "DisplayName", "UserType", "IsEnabled", "IsAdmin", "Email", "Tel", "Mobile", "Remark", "ExpiredDT", "LastLogonDT", "InitUID", "InitDT", "ModifiedUID", "ModifiedDT"];
    this.http.GetUserData(this.TableSetting).subscribe(a => {
      this.tabledata = (a.data)
      console.log(a)
      console.log(Math.ceil(14/10))
      for(let i=0;i<Math.ceil(14/10);i++){
        this.Pages.push(i+1)
      }
    })
    //  this.tabledata
  }
  Detail(id){console.log("detail",id)}
  Edit(id){console.log("Edit",id)}
  Delete(id){console.log("Delete",id)}

}
