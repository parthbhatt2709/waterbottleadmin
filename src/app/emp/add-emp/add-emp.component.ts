import { Component, OnInit } from '@angular/core';
import { user_class } from 'src/app/user/user_class';
import { UserServiceService  } from 'src/app/user/user-service.service';
import { EmpDataService } from '../emp-data.service';
import { emp_class } from '../emp_class';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-emp',
  templateUrl: './add-emp.component.html',
  styleUrls: ['./add-emp.component.css']
})
export class AddEmpComponent implements OnInit {
  emp_id:number;
  emp_name:string;
  mobile_no:number;
  fk_user_email:string;
  user_email:user_class;
  selected:string;
  emp_arr:emp_class[]=[];
  user_arr:user_class[]=[];

  constructor(public _empser:EmpDataService,public _route:Router,public _userSer:UserServiceService) { }

  ngOnInit() {
    this._userSer.getAllUser().subscribe(
      (data:any[])=>{
        console.log(data);
        this.user_arr=data;
      }
    );

  }
  onAddemp(f)
{
    this._empser.addEmp(f.value).subscribe(
      (data:emp_class[])=>{
        console.log(data)
        this._route.navigate(['/nav/emp']);
      }
    );
  }

}
