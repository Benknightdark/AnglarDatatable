import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JquerydatatableComponent } from './jquerydatatable/jquerydatatable.component';
import { SmarttableComponent } from './smarttable/smarttable.component';

const routes: Routes = [
  {
    path: 'datatable',
    component:JquerydatatableComponent

  },
    {
    path: 'smarttable',
    component:SmarttableComponent

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
