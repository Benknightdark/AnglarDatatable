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
  Columns //= [];
  config: PaginationInstance
  collection = [];
  ShowDataCount = []
  constructor(private http: UserdataService) { }

  ngOnInit() {
this.http.GetUserDataColumnsInfo().subscribe(data=>this.Columns=data);
  //  this.Columns = ['ID', 'UserName', "DisplayName", "UserType", "IsEnabled", "IsAdmin", "Email", "Tel", "Mobile", "Remark", "ExpiredDT", "LastLogonDT", "InitUID", "InitDT", "ModifiedUID", "ModifiedDT"];
    this.TableSetting = {
      start: 0,
      length: 10,
      KeyWordSearch: "",
      OrderRule: "",
      SelectedColumn: ""
    };
    this.ShowDataCount = [2, 5, 10, 50, 100]
    this.config = {
      itemsPerPage: this.TableSetting.length,
      currentPage: 1
    }
    this.GetData()

  }
  ChangeDataCount(length) {
    console.log(length)
    this.TableSetting.length = length
    this.config.itemsPerPage = this.TableSetting.length
    this.GetData();

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
  KeyWordSearch(keyword) {
    this.TableSetting.KeyWordSearch = keyword;
    console.log(keyword)
    this.GetData()
  }
  SortTable(ColumnName) {

    if (this.TableSetting.OrderRule == "" || this.TableSetting.OrderRule == "DESC") {
      this.TableSetting.SelectedColumn = ColumnName;
      this.TableSetting.OrderRule = "ASC"
    } else {
      this.TableSetting.SelectedColumn = ColumnName;
      this.TableSetting.OrderRule = "DESC"
    }


  }
  GetData() {
    this.http.GetUserData(this.TableSetting).subscribe(a => {
      this.collection = []
      for (let i = 1; i <= a.totoalcount; i++) {
        this.collection.push(i);
      }
      this.tabledata = a.data
      $('select').material_select()
      this.config.itemsPerPage = this.TableSetting.length
    })

  }
}
