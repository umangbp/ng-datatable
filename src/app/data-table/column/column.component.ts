import { Component, OnInit, Input } from '@angular/core';
import { DataTableComponent } from '../table/data-table.component';

@Component({
  selector: 'column',
  template: ``,
  styleUrls: ['./column.component.css']
})
export class ColumnComponent implements OnInit {

  @Input() value;
  @Input() header;
  @Input() search:boolean;
  @Input() sort:boolean;
  @Input() visible:boolean = true;
 
  constructor(dataTableComponent: DataTableComponent) {
    dataTableComponent.addColumn(this);
  }

  ngOnInit() {
    
  }

}
