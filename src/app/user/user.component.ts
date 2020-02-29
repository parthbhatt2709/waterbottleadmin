import { Component, OnInit,ViewChild} from '@angular/core';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { UserServiceService } from './user-service.service';
import { user_class } from './user_class';
import { Router } from "@angular/router";
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
//import { ViewmoreuserComponent } from './viewmoreuser/viewmoreuser.component';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  displayedColumns: string[] = ['Check','user_email', 'user_password', 'user_type', 'action'];
  dataSource = new MatTableDataSource();
  user_arr:user_class[]=[];
  flag:boolean=false;
  user_email:string;
  user_password:string;
  user_type:string;
  del_arr:string[]=[];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(public _dialog:MatDialog,public _ser:UserServiceService,public _route:Router) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this._ser.getAllUser().subscribe(
      (data:user_class[])=>
      {
        this.user_arr=data;
        this.dataSource.data=this.user_arr;
      }
    );
  }
  onAdd(){
    this._route.navigate(['/nav/adduser']);
  }
  onDelete(item:user_class){

   if(confirm('are you sure you want to delete?')){
    this._ser.deleteUser(item.user_email).subscribe(
      (data:user_class)=>{
        this.user_arr.splice(this.user_arr.indexOf(item),1);
        this.dataSource.data=this.user_arr;
      }
    );
    }
  }
  onCheckBoxChange(row:user_class){
    if (this.del_arr.find(x => x == row.user_email)) {
      this.del_arr.splice(this.del_arr.indexOf(row.user_email), 1);
    }
    else {
      this.del_arr.push(row.user_email);
    }
  }
    onDeleteAll()
    {
        if(confirm('Are You Sure To Delete Multiple Users?')){
          this._ser.deleteAll(this.del_arr).subscribe(
            (data:user_class)=>{
              for (let i = 0; i < this.del_arr.length; i++)
              {
                let x=this.user_arr.find(x=>x.user_email==this.del_arr[i]);
                this.user_arr.splice(this.user_arr.indexOf(x),1);
              }
            this.dataSource.data=this.user_arr;
            this.dataSource.paginator=this.paginator;
            this.dataSource.sort=this.sort;
            }
          );
        }
    }

  onUpdate(item:user_class)
  {
    this._route.navigate(['/nav/updateUser',item.user_email]);
  }
  // viewmore(row)
  // {
  //    this._dialog.open(ViewmoreuserComponent,{
  //    data:row
  //    });


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

