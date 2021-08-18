import { Component, OnInit } from '@angular/core';
import { Task } from '../task.model';
import { of } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.css']
})
export class TrackerComponent implements OnInit {
  name:string=""
  id:string=""
  task:string=""
  dLine:string=""
  tableHTML:string=""
  dataSource = new MatTableDataSource<Task>([]);
  displayedColumns: string[] = ['ID','Name','Task','Deadline']

  constructor() { }

  ngOnInit(): void {
  }

  getInfo(){
    let t = {Name:this.name,ID:this.id,Task:this.task, Deadline:this.dLine};
    this.dataSource.data.push(t);
    this.dataSource.data = this.dataSource.data;
  }

  reset(){
    this.name=""
    this.id=""
    this.task=""
    this.dLine=""
  }
}


