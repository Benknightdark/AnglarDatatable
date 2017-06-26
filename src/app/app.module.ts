import {HttpModule} from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataTablesModule } from 'angular-datatables';
import { JquerydatatableComponent } from './jquerydatatable/jquerydatatable.component';
import { SmarttableComponent } from './smarttable/smarttable.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
@NgModule({
  declarations: [
    AppComponent,
    JquerydatatableComponent,
    SmarttableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    DataTablesModule,
        Ng2SmartTableModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
