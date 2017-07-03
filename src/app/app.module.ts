import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomtableComponent } from './customtable/customtable.component';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { UserdataService } from './services/userdata.service';
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms';
import { TestableComponent } from './testable/testable.component';
@NgModule({
  declarations: [
    AppComponent,
    CustomtableComponent,
    TestableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpModule,
    RouterModule,
    FormsModule,
    NgxPaginationModule

  ],
  providers: [UserdataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
