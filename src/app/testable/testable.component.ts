import { Component, OnInit, NgZone } from '@angular/core';
import { UserdataService } from "app/services/userdata.service";
import { PaginationInstance } from "ngx-pagination/dist/ngx-pagination";

@Component({
  selector: 'app-testable',
  templateUrl: './testable.component.html',
  styleUrls: ['./testable.component.css']
})
export class TestableComponent implements OnInit {
  TableSetting
  AdvancedColumnSearchOption = []
  ShowTable: boolean = true
  config: PaginationInstance
  collection = [];
  tabledata: any;
  Columns
  constructor(private http: UserdataService, private ngZone: NgZone) { }

  ngOnInit() {
    this.TableSetting = {
      start: 0,
      length: 10,
      KeyWordSearch: "",
      OrderRule: "",
      SelectedColumn: "",
      CustomAdvancedColumnSearch: this.AdvancedColumnSearchOption
    };
    this.config = {
      itemsPerPage: this.TableSetting.length,
      currentPage: 1
    }
    this.GetUserDataColumnsInfo()
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
  OnGetDataEvent(event) {
    this.GetData()
  }
  OnColumnSettingDragendEvent(ColumnArray) {
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
      //   this.GetData()
    });
  }
  OnAdvSearchEvent(event) {
    this.TableSetting.CustomAdvancedColumnSearch = event;
    this.GetData();
  }

}