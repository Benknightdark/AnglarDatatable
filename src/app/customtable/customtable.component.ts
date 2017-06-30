import { Component, OnInit, Input, NgZone } from '@angular/core';
import { Http } from '@angular/http';
import { UserdataService } from '../services/userdata.service';
import { PaginationInstance } from "ngx-pagination/dist/pagination-instance";
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import 'rxjs'

@Component({
  selector: 'app-customtable',
  templateUrl: './customtable.component.html',
  styleUrls: ['./customtable.component.css']
})

export class CustomtableComponent implements OnInit {
  ScreenWidth
  //table and columns
  tabledata
  TableSetting: any
  Columns;
  ShowTable: boolean = true;

  //paging group
  config: PaginationInstance
  collection = [];
  ShowDataCount = [];

  //AdvancedColumnSearch

  AdvancedColumnSearchOption = []
  ShowAdvancedColumnSearch: boolean = false;
  constructor(private http: UserdataService, private ngZone: NgZone) { }

  ngOnInit() {
    this.ScreenWidth = document.documentElement.clientWidth;
    Observable.fromEvent(window, 'resize')
      .map(() => {
        return document.documentElement.clientWidth;
      })
      .subscribe(data => {
        this.ScreenWidth = data
      });
    this.TableSetting = {
      start: 0,
      length: 10,
      KeyWordSearch: "",
      OrderRule: "",
      SelectedColumn: "",
      CustomAdvancedColumnSearch: this.AdvancedColumnSearchOption
    };

    this.ShowDataCount = [10, 40, 50, 100]
    this.config = {
      itemsPerPage: this.TableSetting.length,
      currentPage: 1
    }
    this.GetUserDataColumnsInfo();

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
    this.GetData();
  }
  CheckAdvancedSearch(ColumnName) {

    return typeof this.Columns.AdvancedColumnSearchOptions[ColumnName] === 'undefined'
  }
  ShowAdvancedColumnSearchForm() {
    this.ShowAdvancedColumnSearch = !this.ShowAdvancedColumnSearch;
    this.ngZone.onMicrotaskEmpty.first().subscribe(() => {
      $('select').material_select()
      $('select').change((e) => {
        for (let i = 0; i < this.AdvancedColumnSearchOption.length; i++) {
          if (this.AdvancedColumnSearchOption[i].ColumnName == $(e.currentTarget)[0].attributes["ng-reflect-name"].value) {
            this.AdvancedColumnSearchOption[i].Value = e.currentTarget.value;
          }
        }
        this.GetData();
      });
    });
  }
  OnKeyUpAdvColSearch() {
    this.GetData();
  }
  OnChangeAdvColSearch() {
    this.GetData();
  }

  ShowColumnsSettingModal() {

    $('.modal').modal('open');
    $('.sortable').sortable().sortable({
      items: ':not(.disabled)',
      handle: 'i',

    })
  }
  ColumnSettingChanged() {

    this.GetData();
  }
  ColumnSettingDragend(e) {
    const ColumnArray = []
    for (let i = 0; i < $($(e.path[1])[0])[0].children.length; i++) {
      console.log($($(e.path[1])[0])[0].children[i].id)
      //  ColumnArray.push($($(e.path[1])[0])[0].children[i].id)
      for (let j = 0; j < this.Columns.TableColumn.length; j++) {
        if (this.Columns.TableColumn[j].ColumnName == $($(e.path[1])[0])[0].children[i].id) {
          this.Columns.TableColumn[j].SortSeq = i + 1;
        }
      }



    }
    this.PostUserDataColumnsInfo(this.Columns.TableColumn)

  }
  GetUserDataColumnsInfo() {
    this.http.GetUserDataColumnsInfo().subscribe(data => {
      $('.modal').modal();
      this.Columns = data;
      this.AdvancedColumnSearchOption = []
      for (let i = 0; i < this.Columns.TableColumn.length; i++) {
        if (this.Columns.TableColumn[i].ColumnType == 'Date' || this.Columns.TableColumn[i].ColumnType == 'DateTime') {
          this.AdvancedColumnSearchOption.push({
            ColumnName: this.Columns.TableColumn[i].ColumnName,
            Value: { start: "", End: "" }
            , FilterType: "Array"
          })
        } else {
          this.AdvancedColumnSearchOption.push({ ColumnName: this.Columns.TableColumn[i].ColumnName, Value: "", FilterType: "String" })
        }
      }
      console.log(this.Columns)
      this.GetData()
    });
  }
  PostUserDataColumnsInfo(ColumnArray) {
    this.http.PostUserDataColumnsInfo(ColumnArray).subscribe(data => {
      $('.modal').modal();
      this.Columns = data;
      this.AdvancedColumnSearchOption = []
      for (let i = 0; i < this.Columns.TableColumn.length; i++) {
        if (this.Columns.TableColumn[i].ColumnType == 'Date' || this.Columns.TableColumn[i].ColumnType == 'DateTime') {
          this.AdvancedColumnSearchOption.push({
            ColumnName: this.Columns.TableColumn[i].ColumnName,
            Value: { start: "", End: "" }
            , FilterType: "Array"
          })
        } else {
          this.AdvancedColumnSearchOption.push({ ColumnName: this.Columns.TableColumn[i].ColumnName, Value: "", FilterType: "String" })
        }
      }
      this.ngZone.onMicrotaskEmpty.first().subscribe(() => {
        $('.sortable').sortable().sortable({
          items: ':not(.disabled)',
          handle: 'i',
        })
      })
      this.GetData()
    });
  }
  GetData() {
    this.ShowTable = !this.ShowTable
    this.http.GetUserData(this.TableSetting).subscribe(a => {

      this.collection = []
      for (let i = 1; i <= a.totoalcount; i++) {
        this.collection.push(i);
      }
      this.tabledata = a.data
      this.config.itemsPerPage = this.TableSetting.length
      this.ShowTable = !this.ShowTable
    })

  }
}
