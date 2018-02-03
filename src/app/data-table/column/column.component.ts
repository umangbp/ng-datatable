import { Component, OnInit, Input } from '@angular/core';
import { DataTableComponent } from '../table/data-table.component';

@Component({
  selector: 'column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.css']
})
export class ColumnComponent implements OnInit {

  @Input() value;
  @Input() header;
  @Input() sort;

  constructor(dataTableComponent: DataTableComponent) {
    dataTableComponent.addColumn(this);
  }

  ngOnInit() {
    
  }

}
