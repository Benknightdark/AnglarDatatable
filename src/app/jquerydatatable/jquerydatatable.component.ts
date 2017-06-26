import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Subject } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-jquerydatatable',
  templateUrl: './jquerydatatable.component.html',
  styleUrls: ['./jquerydatatable.component.css']
})
export class JquerydatatableComponent{
  dtOptions: DataTables.Settings = {};
  persons: any[] = [];
  dtTrigger = new Subject();
  constructor(private http: Http) { }
  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {
    this.dtOptions = {
      displayStart: 1,
      //pageLength:2,
      autoWidth: true,
      ordering: true,
      paging: true,
      processing: true,
      pagingType: 'full_numbers',
      lengthChange: true,
      stateSave: true,
      serverSide:true,
      deferLoading:10,

      columns: [{
        title: 'ID',
        data: 'id'
      }, {
        title: 'First name',
        data: 'firstName'
      }, {
        title: 'Last name',
        data: 'lastName'
      }]
    };
    this.http.get('http://localhost:3000/data')
      .map(this.extractData)
      .subscribe(persons => {
        console.log(localStorage.getItem("DataTables_DataTables_Table_0_/datatable"))
        // console.log(persons)
        this.persons = persons;
        // Calling the DT trigger to manually render the table
        this.dtTrigger.next(a => console.log(a));
        console.log(this.dtOptions)

      });
  }
  private extractData(res: Response) {
    console.log(res.json())
    const body = res.json()[0];
    return body.data || {};
  }

}
