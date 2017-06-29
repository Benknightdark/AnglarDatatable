import { Component, OnInit, Input, NgZone } from '@angular/core';
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

  AdvancedColumnSearchOption: any = {}
  ShowAdvancedColumnSearch: boolean = false;
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

    this.ShowDataCount = [10, 40, 50, 100]
    this.config = {
      itemsPerPage: this.TableSetting.length,
      currentPage: 1
    }

    this.http.GetUserDataColumnsInfo().subscribe(data => {
      this.Columns = data;
      console.log( this.Columns )
      for (let i = 0; i < this.Columns.TableColumn.length ; i++) {
        if(this.Columns.TableColumn[i].ColumnType=='Date'||this.Columns.TableColumn[i].ColumnType=='DateTime'){
          console.log(this.Columns.TableColumn[i].ColumnName)
          this.AdvancedColumnSearchOption[this.Columns.TableColumn[i].ColumnName]=[]
        }
      }

      this.GetData()

    });
    // $('select').material_select();
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
  CheckAdvancedSearch(ColumnName) {

    return typeof this.Columns.AdvancedColumnSearchOptions[ColumnName] === 'undefined'
  }
  ShowAdvancedColumnSearchForm() {
    this.ShowAdvancedColumnSearch = !this.ShowAdvancedColumnSearch;
    this.ngZone.onMicrotaskEmpty.first().subscribe(() => {

      $('select').material_select()
      $('select').change((e) => {
        this.AdvancedColumnSearchOption[$(e.currentTarget)[0].attributes["ng-reflect-name"].value] = e.currentTarget.value;
        console.log(this.AdvancedColumnSearchOption)
      });


    });
  }
  OnKeyUpAdvColSearch() {
    console.log(this.AdvancedColumnSearchOption)
  }
  OnChangeAdvColSearch() {
    console.log(this.AdvancedColumnSearchOption)
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
