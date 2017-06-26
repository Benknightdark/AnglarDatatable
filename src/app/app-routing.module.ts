import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JquerydatatableComponent } from './jquerydatatable/jquerydatatable.component';
import { SmarttableComponent } from './smarttable/smarttable.component';
import { CustomtableComponent } from './customtable/customtable.component';

const routes: Routes = [
  { path: "", component: CustomtableComponent },
  {
    path: 'datatable',
    component: JquerydatatableComponent

  },
  {
    path: 'smarttable',
    component: SmarttableComponent

  },
  { path: "customtable", component: CustomtableComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
