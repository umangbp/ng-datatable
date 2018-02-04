import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataTableComponent } from './table/data-table.component';
import { ColumnComponent } from './column/column.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
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
