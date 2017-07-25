import { Component, OnInit, Input, NgZone, Output, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';
import { UserdataService } from '../services/userdata.service';
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
  @Input() tabledata
  @Input() TableSetting: any
  @Input() Columns;
  @Input() ShowTable: boolean
  @Output() OnGetData = new EventEmitter()
  @Output() RowButtonClickEvent = new EventEmitter();
  //paging group
  @Input() config//: PaginationInstance
  @Input() collection
  ShowDataCount = [];
  //AdvancedColumnSearch
  @Input() AdvancedColumnSearchOption;
  ShowAdvancedColumnSearch: boolean = false;
  //ColumnSetting
  @Output() ColumnSettingChangedEvent = new EventEmitter();
  @Output() ColumnSettingDragendEvent = new EventEmitter();
  constructor(private ngZone: NgZone) { }
  ngOnInit() {
    this.ScreenWidth = document.documentElement.clientWidth;
    Observable.fromEvent(window, 'resize')
      .map(() => {
        return document.documentElement.clientWidth;
      })
      .subscribe(data => {
        this.ScreenWidth = data
      });
    //分頁數量集合
    this.ShowDataCount = [10, 40, 50, 100]
  }
  //分頁按鈕
  ChangeDataCount(length) {
    this.TableSetting.length = length
    this.config.itemsPerPage = this.TableSetting.length
    this.OnGetData.emit(this.config)
  }
  pageChanged(number) {
    this.config.currentPage = number;
    if (this.config.currentPage === 1) {
      this.TableSetting.start = 0
      this.OnGetData.emit({ s: this.TableSetting.start })
    } else {
      this.TableSetting.start = (number - 1) * this.TableSetting.length
      this.OnGetData.emit({ s: this.TableSetting.start })
    }
  }
  //表格事件
  KeyWordSearch(keyword) {
    this.TableSetting.KeyWordSearch = keyword;
    this.OnGetData.emit(this.TableSetting.KeyWordSearch)
  }
  SortTable(Column) {
    if (this.TableSetting.OrderRule == "" || this.TableSetting.OrderRule == "DESC") {
      this.TableSetting.SelectedColumn = Column.ColumnName;
      this.TableSetting.OrderRule = "ASC"
    } else {
      this.TableSetting.SelectedColumn = Column.ColumnName;
      this.TableSetting.OrderRule = "DESC"
    }
    this.OnGetData.emit(this.TableSetting.OrderRule)
  }
  //進階欄位搜尋
  CheckAdvancedSearch(ColumnName) {
    return typeof this.Columns.AdvancedColumnSearchOptions[ColumnName] === 'undefined'
  }
  ShowAdvancedColumnSearchForm() {
    this.ShowAdvancedColumnSearch = !this.ShowAdvancedColumnSearch;
    //material下拉選單的change event detect (因為material 下拉選單會與angular change事件繫結產生衝突，所以只好額外建立change event detect)
    this.ngZone.onMicrotaskEmpty.first().subscribe(() => {
      $('select').material_select()
      $('select').change((e) => {
        for (let i = 0; i < this.AdvancedColumnSearchOption.length; i++) {
          if (this.AdvancedColumnSearchOption[i].ColumnName == $(e.currentTarget)[0].attributes["ng-reflect-name"].value) {
            this.AdvancedColumnSearchOption[i].Value = e.currentTarget.value;
            this.TableSetting.CustomAdvancedColumnSearch = this.AdvancedColumnSearchOption;
            this.OnGetData.emit()
          }
        }
      });
    });
  }
  OnKeyUpAdvColSearch() {
    this.TableSetting.CustomAdvancedColumnSearch = this.AdvancedColumnSearchOption
    this.OnGetData.emit()
  }
  OnChangeAdvColSearch() {
    this.TableSetting.CustomAdvancedColumnSearch = this.AdvancedColumnSearchOption
    this.OnGetData.emit()
  }
  //欄位設定Modal視窗
  ShowColumnsSettingModal() {

    $('.modal').modal('open');
    $('.sortable').sortable().sortable({
      items: ':not(.disabled)',
      handle: 'i',

    })
  }
  ColumnSettingChanged() {
    this.OnGetData.emit()
  }
  ColumnSettingDragend(e) {
    const ColumnArray = []
    for (let i = 0; i < $($(e.path[1])[0])[0].children.length; i++) {

      for (let j = 0; j < this.Columns.TableColumn.length; j++) {
        if (this.Columns.TableColumn[j].ColumnName == $($(e.path[1])[0])[0].children[i].id) {
          this.Columns.TableColumn[j].SortSeq = i + 1;
        }
      }
    }
   // console.log(this.Columns)
    this.ColumnSettingDragendEvent.emit(this.Columns)//this.Columns.TableColumn
  }
  //CRUD按鈕
  OnClickRowButton(action,id) { this.RowButtonClickEvent.emit(action+"/" + id); }
}
