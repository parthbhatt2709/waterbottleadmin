import { Component, OnInit,ViewChild} from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { EmpDataService } from './emp-data.service';
import { emp_class } from './emp_class';
import { Router } from '@angular/router';


@Component({
  selector: 'app-emp',
  templateUrl: './emp.component.html',
  styleUrls: ['./emp.component.css']
})
export class EmpComponent implements OnInit {
  displayedColumns: string[] = ['Check','emp_name','mobile_no','user_email','action'];
  dataSource = new MatTableDataSource();

  emp_arr:emp_class[]=[];
  del_arr:number[]=[];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(public _ser:EmpDataService,public _route:Router) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
     this._ser.getAllemp().subscribe(
      (data:emp_class[])=>
      {
       this.emp_arr=data;
        this.dataSource.data=this.emp_arr;
      }
    );
  }
  onAdd(){
    this._route.navigate(['/nav/addemp']);
   }

  onDelete(item:emp_class){
    if(confirm('are you sure you want to delete?')){
    this._ser.deleteEmp(item.emp_id).subscribe(
        (data:emp_class)=>{
          this.emp_arr.splice(this.emp_arr.indexOf(item),1);
          this.dataSource.data=this.emp_arr;
        }
    );
      }

    }
    onCheckBoxChange(row:emp_class){
      if (this.del_arr.find(x => x == row.emp_id)) {
        this.del_arr.splice(this.del_arr.indexOf(row.emp_id), 1);
      }
      else {
        this.del_arr.push(row.emp_id);
      }
    }
    onDeleteAll()
    {
        if(confirm('Are You Sure To Delete Multiple Users?')){
          this._ser.deleteAll(this.del_arr).subscribe(
            (data:emp_class)=>{
              for (let i = 0; i < this.del_arr.length; i++)
              {
                let x=this.emp_arr.find(x=>x.emp_id==this.del_arr[i]);
                this.emp_arr.splice(this.emp_arr.indexOf(x),1);
              }
            this.dataSource.data=this.emp_arr;
            this.dataSource.paginator=this.paginator;
            this.dataSource.sort=this.sort;
            }
          );
        }
    }

  onUpdate(item:emp_class)
  {
    this._route.navigate(['/nav/updateemp',item.emp_id]);
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
 }
 applyFilter1(filterValue: string) {
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}
}



