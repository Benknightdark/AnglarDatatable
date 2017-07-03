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

  //paging group
  @Input() config//: PaginationInstance
  @Input() collection

  ShowDataCount = [];

  //AdvancedColumnSearch
  @Input() AdvancedColumnSearchOption;
  @Output() AdvSearchEvent = new EventEmitter();
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
    this.ShowDataCount = [10, 40, 50, 100]
  }
  ChangeDataCount(length) {
    this.TableSetting.length = length
    this.config.itemsPerPage = this.TableSetting.length
    this.OnGetData.emit(this.config)
  }
  Detail(id) { console.log("detail", id) }
  Edit(id) { console.log("Edit", id) }
  Delete(id) { console.log("Delete", id) }
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
                this.TableSetting.CustomAdvancedColumnSearch = this.AdvancedColumnSearchOption;
                 this.OnGetData.emit()
          //  this.AdvSearchEvent.emit(this.AdvancedColumnSearchOption)
          }
        }
      });
    });
  }
  OnKeyUpAdvColSearch() {
   this.TableSetting.CustomAdvancedColumnSearch= this.AdvancedColumnSearchOption
        this.OnGetData.emit()
  //  this.AdvSearchEvent.emit(this.AdvancedColumnSearchOption)
  }
  OnChangeAdvColSearch() {
      this.TableSetting.CustomAdvancedColumnSearch= this.AdvancedColumnSearchOption
           this.OnGetData.emit()
   // this.AdvSearchEvent.emit(this.AdvancedColumnSearchOption)
  }
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
      console.log($($(e.path[1])[0])[0].children[i].id)
      //  ColumnArray.push($($(e.path[1])[0])[0].children[i].id)
      for (let j = 0; j < this.Columns.TableColumn.length; j++) {
        if (this.Columns.TableColumn[j].ColumnName == $($(e.path[1])[0])[0].children[i].id) {
          this.Columns.TableColumn[j].SortSeq = i + 1;
        }
      }
    }
    //  this.PostUserDataColumnsInfo(this.Columns.TableColumn)
    this.ColumnSettingDragendEvent.emit(this.Columns.TableColumn)
  }
}
