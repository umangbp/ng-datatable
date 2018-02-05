import { Component, OnInit, Input } from '@angular/core';
import { ColumnComponent } from '../column/column.component';

@Component({
  selector: 'data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {

  columns: ColumnComponent[] = [];     // columns array
  sourceData:Object[] = [];                // holds data received
  tableData:Object[] = [];                  // holds records that are currently shown;
  perPageCountDropdown = [10,20,50,100];   // array for per page records dropdown  
  pageArray:number[] = [];         // array for generating pages
  first:number = 1;                    // starting page no of displayed pagination
  last:number = 5;                     // last page no of displayed pagination 

  showingFrom:number;               // record number from which record is shown in page
  showingTo:number                  // record number to which record is shown in page

  // configuration variables
  totalRecords:number = 0;         // total records count
  totalPages: number = 0;          // total page count
  currentPage: number = 1;         // current page no
  perPageRecords:number = 10;      // per page records  
  pagination_pages:number = 5;

  // Input property to receive data
  @Input() set data(value:any){
    
    this.sourceData = value;
    
    if(this.sourceData !== undefined){
      this.totalRecords = this.sourceData.length;
      // calculating no of pages from total record count
      this.calculatePages(this.totalRecords);
      this.fillRecordsToBeDisplayed();
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
   this.calculatePages(this.totalRecords);
   this.currentPage = Math.ceil(this.showingFrom / this.perPageRecords)
    
    // start from here
  
  }

  /**
   * Function for calculating the pages
   * @param recordCount 
   */
  calculatePages(recordCount:number){
    this.totalPages = Math.ceil(recordCount / this.perPageRecords);
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
      this.fillRecordsToBeDisplayed();
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
      this.fillRecordsToBeDisplayed();
    }
  }

  /**
   * Page change event
   * @param page 
   */
  onPageChange(page:number){

    this.currentPage = page;
    this.fillRecordsToBeDisplayed();
  }

  /**
   * Function to fill records needed to be displayed on table
   */
  fillRecordsToBeDisplayed(){

    this.showingFrom = ((this.currentPage - 1) * this.perPageRecords);
    this.showingTo = this.showingFrom + this.perPageRecords;

    this.tableData = [];

    // if the showingTo count is more than record count then set it to max
    if(this.showingTo > this.totalRecords){
      this.showingTo = this.totalRecords;
    }

    // if the showingTo count is less than zero count then set it to max
    if(this.showingFrom < 0){
      this.showingFrom = 0;
    }

    for(var i = this.showingFrom; i < this.showingTo; i++){
      this.tableData.push(this.sourceData[i]);
    }

  }

}
