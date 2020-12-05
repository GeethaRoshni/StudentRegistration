import { Component, OnInit } from '@angular/core';
import { ActionRenderer } from './cellRenderer/action-renderer';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  gridApi:any;
    gridColumnApi:any;
    colDefs :any[]=[];
    rowData :any[]= [];
    cityData :any[]= [];
    context :any;
    frameworkComponents:any;

  constructor() { }

  ngOnInit(): void {
    this.getColdefs();
    this.context = { componentParent: this };
    this.frameworkComponents = {
    actionRenderer: ActionRenderer,
    }
    this.cityData = [
      {id: 1, collegeName: 'TKR', cityName: 'Hyderabad', grade: 'A'},
      {id: 2, collegeName: 'MNR', cityName: 'Hyderabad', grade: 'B'},
      {id: 1, collegeName: 'SRM', cityName: 'Chennai', grade: 'A'},
      {id: 2, collegeName: 'VIT', cityName: 'Chennai', grade: 'A'},
      {id: 1, collegeName: 'Christ', cityName: 'Banglore', grade: 'A'},
      {id: 2, collegeName: 'VMW', cityName: 'Banglore', grade: 'A'}
  
    ];
  }

  onGridReady(params:any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
}

getColdefs(){
   this.colDefs = [
    { field: 'id', headerName:'ID', width: 150, checkboxSelection:true },
    { field: 'collegeName', headerName:'College Name', width: 150 },
    { field: 'cityName', headerName:'City Name', width: 150 },
    { field: 'grade', headerName:'Grade', width: 150 },
    { headerName:'Action', cellRenderer:'actionRenderer',width: 150 ,flex:1}
   ]
}
getRowdata(city:string){
  let cityList :any[]=[];

  console.log(city);
  this.cityData.forEach(data =>{
    if(city==data.cityName){
      cityList.push(data);
    }
  });
  this.rowData=cityList;
   
}
apply(params:any){
  console.log(params);
}

}
