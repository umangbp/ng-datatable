import { Component, OnInit, Input } from '@angular/core';
import { ColumnComponent } from '../column/column.component';

@Component({
  selector: 'data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {

  tableData:Object[] = [];

  perPageCountDropdown = [10,20,50];  

  @Input() set data(value:any){
    this.tableData = value;
  }
  
  columns: ColumnComponent[] = [];

  constructor() {
  
  }

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
