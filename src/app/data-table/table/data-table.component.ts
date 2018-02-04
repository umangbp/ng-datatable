import { Component, OnInit, Input } from '@angular/core';
import { ColumnComponent } from '../column/column.component';

@Component({
  selector: 'data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {

  columns: ColumnComponent[] = [];     // columns array
  tableData:Object[] = [];                // holds table data
  perPageCountDropdown = [10,20,50,100];   // array for per page records dropdown  
  pageArray:number[] = [];         // array for generating pages
  first:number = 1;                    // starting page no of displayed pagination
  last:number = 5;                     // last page no of displayed pagination 

  // configuration variables
  totalRecords:number = 0;         // total records count
  totalPages: number = 0;          // total page count
  currentPage: number = 1;         // current page no
  perPageRecords:number = 10;      // per page records  

  // Input property to receive data
  @Input() set data(value:any){
    
    this.tableData = value;
    
    if(this.tableData !== undefined){
      this.totalRecords = this.tableData.length;
      
      // calculating no of pages from total record count
      this.calculatePages(this.totalRecords);
    }
    
  }
  

  /**
   * Default class constructor
   */
  constructor() {
  }

  /**
   * OnInit lifecycle call
   */
  ngOnInit() {
    
  }

  /**
   * Function for adding columns
   * @param column 
   */
  addColumn(column){
    this.columns.push(column);
  }

  /**
   * Callback function when per page count changes
   */
  perPageCountChange(){
    alert(this.perPageRecords);
  }

  /**
   * Function for calculating the pages
   * @param recordCount 
   */
  calculatePages(recordCount:number){
    this.totalPages = Math.ceil(this.totalRecords / this.perPageRecords);
    this.generatePagination();
  }

  /**
   * Function contains logic for generating pagination
   */
  generatePagination(){ 

    // clearing the pageArray to hold next block of pages
    this.pageArray = [];

    for( var i = this.first; i <= this.last; i++){  
      
      if(i > this.totalPages){
        this.last = i;
        break;
      }
      else{
        this.pageArray.push(i);
      }
    }

  }

  /**
   * Callback when clicked on prev in pagination
   */
  prev(){
    if(this.first !== 1 && this.first - 5 > 0){
      this.last = this.first - 1;
      this.first = this.first - 5;
      this.generatePagination();
      this.currentPage = this.first;
    }
  }

  /**
   * Callback function to handle next click pagination 
   */
  next(){
    if(this.last <= this.totalPages && this.last + 5 <= this.totalPages){
      this.first = this.last + 1;
      this.last = this.last + 5;
      this.generatePagination();
      this.currentPage = this.first;
    }
  }

  /**
   * Page change event
   * @param page 
   */
  onPageChange(page:number){
    this.currentPage = page;
  }

}
