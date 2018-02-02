import { Component, OnInit, Input } from '@angular/core';
import { ColumnComponent } from '../column/column.component';

@Component({
  selector: 'data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {

  constructor() { }

  @Input() data;
  columns: ColumnComponent[] = [];

  ngOnInit() {
    
  }

  /**
   * Function for adding columns
   * @param column 
   */
  addColumn(column){
    this.columns.push(column);
  }

}
