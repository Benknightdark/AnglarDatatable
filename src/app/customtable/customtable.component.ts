import { Component, OnInit, Input } from '@angular/core';
import { Http } from '@angular/http';
import { UserdataService } from '../services/userdata.service';
import { PaginationInstance } from "ngx-pagination/dist/pagination-instance";
import { environment } from '../../environments/environment';
@Component({
  selector: 'app-customtable',
  templateUrl: './customtable.component.html',
  styleUrls: ['./customtable.component.css']
})

export class CustomtableComponent implements OnInit {
  //table and columns
  tabledata
  TableSetting: any
  Columns;

  //paging group
  config: PaginationInstance
  collection = [];
  ShowDataCount = [];

  //AdvancedColumnSearch
  CustomAdvancedColumnSearch = []
  ShowAdvancedColumnSearch:boolean=false;
  constructor(private http: UserdataService) { }

  ngOnInit() {
    this.http.GetUserDataColumnsInfo().subscribe(data => {
      this.Columns = data;
      this.TableSetting = {
        start: 0,
        length: 10,
        KeyWordSearch: "",
        OrderRule: "",
        SelectedColumn: ""
      };

      this.ShowDataCount = [10, 40, 50, 100]
      this.config = {
        itemsPerPage: this.TableSetting.length,
        currentPage: 1
      }
      this.GetData()
      //Custom AdvancedColumnSearch
      this.CustomAdvancedColumnSearch.push({ ColumnName: "UserType", ApiType: "Get", ApiUrl: environment.ApiUrl + "/ApiUserData/UserType" })

    });
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
  SortTable(Column) {

    if (this.TableSetting.OrderRule == "" || this.TableSetting.OrderRule == "DESC") {
      this.TableSetting.SelectedColumn = Column.ColumnName;
      this.TableSetting.OrderRule = "ASC"
    } else {
      this.TableSetting.SelectedColumn = Column.ColumnName;
      this.TableSetting.OrderRule = "DESC"
    }
    console.log(this.TableSetting)
    this.GetData();


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
