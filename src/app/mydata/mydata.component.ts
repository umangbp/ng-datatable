import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'mydata',
  templateUrl: './mydata.component.html',
  styleUrls: ['./mydata.component.css']
})
export class MydataComponent implements OnInit {

  dataToSend;
  constructor(private httpClient: HttpClient) {

  }

  ngOnInit() {

    this.httpClient.get('../../assets/myData.json').subscribe((res)=>{
      this.dataToSend = res;
    })
  }

}
