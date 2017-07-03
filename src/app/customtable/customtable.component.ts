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
  @Output() KeyWordSearchEvent = new EventEmitter();
  @Output() SortTableEvent = new EventEmitter()

  //paging group
  @Input() config//: PaginationInstance
  @Input() collection
  @Output() PageChangeEvent = new EventEmitter();
  @Output() ChangeDataCountEvent = new EventEmitter();
  ShowDataCount = [];

  //AdvancedColumnSearch
  @Input() AdvancedColumnSearchOption;
  @Output() AdvSearchEvent = new EventEmitter();
  ShowAdvancedColumnSearch: boolean = false;
  constructor(private http: UserdataService, private ngZone: NgZone) { }

  //ColumnSetting
  @Output() ColumnSettingChangedEvent = new EventEmitter();
  @Output() ColumnSettingDragendEvent=new EventEmitter();
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
    console.log(this.TableSetting)
    console.log(this.config)
    this.ChangeDataCountEvent.emit(this.config)

  }
  Detail(id) { console.log("detail", id) }
  Edit(id) { console.log("Edit", id) }
  Delete(id) { console.log("Delete", id) }
  pageChanged(number) {
    this.config.currentPage = number;
    if (this.config.currentPage === 1) {
      this.TableSetting.start = 0
      this.PageChangeEvent.emit({ s: this.TableSetting.start })
    } else {
      this.TableSetting.start = (number - 1) * this.TableSetting.length
      this.PageChangeEvent.emit({ s: this.TableSetting.start })
    }
  }
  KeyWordSearch(keyword) {
    this.TableSetting.KeyWordSearch = keyword;
    this.KeyWordSearchEvent.emit(this.TableSetting.KeyWordSearch)
  }
  SortTable(Column) {
    if (this.TableSetting.OrderRule == "" || this.TableSetting.OrderRule == "DESC") {
      this.TableSetting.SelectedColumn = Column.ColumnName;
      this.TableSetting.OrderRule = "ASC"
    } else {
      this.TableSetting.SelectedColumn = Column.ColumnName;
      this.TableSetting.OrderRule = "DESC"
    }
    this.SortTableEvent.emit(this.TableSetting.OrderRule)
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
            this.AdvSearchEvent.emit(this.AdvancedColumnSearchOption)
          }
        }
      });
    });
  }
  OnKeyUpAdvColSearch() {
    this.AdvSearchEvent.emit(this.AdvancedColumnSearchOption)
  }
  OnChangeAdvColSearch() {
    this.AdvSearchEvent.emit(this.AdvancedColumnSearchOption)
  }

  ShowColumnsSettingModal() {

    $('.modal').modal('open');
    $('.sortable').sortable().sortable({
      items: ':not(.disabled)',
      handle: 'i',

    })
  }
  ColumnSettingChanged() {
    this.ColumnSettingChangedEvent.emit()
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
