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
      console.log(this.Columns)
      this.AdvancedColumnSearchOption = []
      this.AdvancedColumnSearchOption = this.Columns.AdvancedColumnSearch

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
      console.log("getdata")
    })

  }

  OnColumnSettingDragendEvent(TableColumn) {
    this.http.PostUserDataColumnsInfo(TableColumn).subscribe(data => {
      this.Columns = data;
      console.log(this.Columns)
      this.AdvancedColumnSearchOption = []
      this.AdvancedColumnSearchOption = this.Columns.AdvancedColumnSearch

      this.ngZone.onMicrotaskEmpty.first().subscribe(() => {
        $('.sortable').sortable().sortable({
          items: ':not(.disabled)',
          handle: 'i',
        })
      })

    });
  }
  OnGetDataEvent(event) {
    this.GetData()
  }
  OnAdvSearchEvent(event) {
    this.TableSetting.CustomAdvancedColumnSearch = event;
    this.GetData();
  }
  OnRowButtonClickEvent(url){
    console.log(url)
  }

}
