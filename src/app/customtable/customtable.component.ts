import { Component, OnInit, Input } from '@angular/core';
import { Http } from '@angular/http';
import { UserdataService } from '../services/userdata.service';
import { PaginationInstance } from "ngx-pagination/dist/pagination-instance";


@Component({
  selector: 'app-customtable',
  templateUrl: './customtable.component.html',
  styleUrls: ['./customtable.component.css']
})
export class CustomtableComponent implements OnInit {
  tabledata
  TableSetting: any
  Columns = [];
  config: PaginationInstance
  collection = [];
  constructor(private http: UserdataService) { }

  ngOnInit() {
    this.Columns = ['ID', 'UserName', "DisplayName", "UserType", "IsEnabled", "IsAdmin", "Email", "Tel", "Mobile", "Remark", "ExpiredDT", "LastLogonDT", "InitUID", "InitDT", "ModifiedUID", "ModifiedDT"];
    this.TableSetting = { start: 0, length: 10 };
    this.config = {
      itemsPerPage: this.TableSetting.length,
      currentPage: 1
    }
    this.GetData()
  }
  Detail(id) { console.log("detail", id) }
  Edit(id) { console.log("Edit", id) }
  Delete(id) { console.log("Delete", id) }
  pageChanged(number) {
    console.log('change to page', number);
    this.config.currentPage = number;
    if (this.config.currentPage === 1) {
      this.TableSetting.start = 0
    } else {
      this.TableSetting.start = (number - 1) * this.TableSetting.length
    }

    this.GetData()
  }
  GetData() {
    this.http.GetUserData(this.TableSetting).subscribe(a => {
      this.collection = []
      this.tabledata = (a.data)
      for (let i = 1; i <= a.totoalcount; i++) {
        this.collection.push(i);
      }
    })
  }


}
