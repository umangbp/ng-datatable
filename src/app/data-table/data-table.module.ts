import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataTableComponent } from './table/data-table.component';
import { ColumnComponent } from './column/column.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    DataTableComponent,
    ColumnComponent
  ],
  exports: [
    DataTableComponent,
    ColumnComponent
  ]
})
export class DataTableModule { }
