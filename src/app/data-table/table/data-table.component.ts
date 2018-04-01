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
  
  perPageCountDropdown:Array<number> = [10,20,50,100];   // array for per page records dropdown  
  
  // configuration variables
  totalRecords:number = 0;         // total records count
  totalPages: number = 0;          // total page count
  currentPage: number = 1;         // current page no
  perPageRecords:number = 10;      // per page records  
  pagesToDisplay:number = 5;
  
  // arrays for holding visible pages and visible records index
  pageArray:Array<number> = [];    
  visibleRecords:Array<number> = [];    

  // variables for holding start page and end page of current block
  startPage:number;
  endPage:number;

  // variables for holding current record and end record index
  startRecord:number= 0;
  endRecord:number = 0;
  
  // object for holding search terms
  searchTerms = {}

  // Input property to receive data
  @Input() set data(value:any){
    
    if(value !== undefined){

      this.sourceData = value;
      this.tableData = this.sourceData;
      this.totalRecords = this.tableData.length;

      // function to initialize grid
      this.initializeGrid();

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

  ngAfterContentInit()	{

    this.columns.forEach(column => {
      this.searchTerms[column.value] = ''
    });

  }

  /**
   * Function to initialize grid
   */
  initializeGrid(page:number = 1){


    this.filterRecords(this.currentPage, this.perPageRecords);

    //total pages
    this.totalPages = this.calculatePages(this.totalRecords, this.perPageRecords);

    // generate pagination
    this.generatePagination(page);
  }

  /**
   * Function for adding columns
   * @param column 
   */
  addColumn(column){
    this.columns.push(column);
  }

  /**
   * Function to calculate pages
   */
  calculatePages(recordCount:number,recordsPerPage:number){
    return Math.ceil(recordCount/recordsPerPage);
  }

  /**
   * Function to generate pagination
   * @param startingPage 
   */
  generatePagination(startingPage:number){

    if(startingPage > 0 && startingPage <= this.totalPages){

      this.pageArray = [];

      for(var i = startingPage; i <= this.totalPages && i < startingPage + this.pagesToDisplay; i++){
        this.pageArray.push(i);
      }

      // calculating first and last page that need to be displayed
      this.startPage = startingPage;
      this.endPage = this.pageArray[this.pageArray.length - 1];

    }
  }

  /**
   * Function for filling records
   * @param page 
   * @param recordsPerPage 
   */
  filterRecords(page:number, recordsPerPage:number){

    this.visibleRecords = [];

    this.startRecord = ((page - 1) * this.perPageRecords) + 1;    
    this.endRecord = this.startRecord + parseInt(this.perPageRecords.toString()) - 1;
    
    if(this.endRecord > this.totalRecords){
      this.endRecord = this.totalRecords;
    }

    for(var i = this.startRecord; i <= this.endRecord; i++){
      this.visibleRecords.push(i);
    }

  }

  /**
   * Function to move to previous pages block
   */
  previousBlock(){

    this.currentPage = this.currentPage - this.pagesToDisplay
    this.generatePagination(this.currentPage);
    this.filterRecords(this.currentPage, this.perPageRecords);
  }

  /**
   * Function to move to next pages block
   */
  nextBlock(){
    this.currentPage = this.endPage + 1;
    this.generatePagination(this.currentPage);
    this.filterRecords(this.currentPage, this.perPageRecords);
  }

  /**
   * Function to handle page change
   * @param page 
   */
  onPageChange(page:number){
    this.currentPage = page;
    this.filterRecords(this.currentPage, this.perPageRecords);
  }

  /**
   * Function to handle per page record count change
   * @param event 
   */
  onPerPageRecordsCountChange(event){
    
    var updated_page_location:number = Math.ceil(this.startRecord/this.perPageRecords);
    
    this.startRecord = 0;
    this.endRecord = 0;
    
    this.currentPage = 1;

    // calculate update pagination block (i.e in which block updated page resides)
    var page_block = Math.ceil(updated_page_location / this.pagesToDisplay)

    var first_page_of_block = ((page_block - 1) * this.pagesToDisplay) + 1;
    
    this.currentPage = updated_page_location;

    // reinitialize the grid
    this.initializeGrid(first_page_of_block);

  }

  onSearch(){

    console.log(this.searchTerms);

    this.tableData.filter((item) => {
      //console.log(item);
    })

  }

}
