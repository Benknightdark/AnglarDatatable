import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataTablesModule } from 'angular-datatables';
import { JquerydatatableComponent } from './jquerydatatable/jquerydatatable.component';
import { SmarttableComponent } from './smarttable/smarttable.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { CustomtableComponent } from './customtable/customtable.component';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { UserdataService } from './services/userdata.service';
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    JquerydatatableComponent,
    SmarttableComponent,
    CustomtableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpModule,
    RouterModule,
    FormsModule,
    DataTablesModule,
    Ng2SmartTableModule,
    NgxPaginationModule

  ],
  providers: [UserdataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
