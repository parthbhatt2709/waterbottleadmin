import { Component, OnInit } from '@angular/core';
import { EmpDataService } from '../emp-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { emp_class } from '../emp_class';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { user_class } from 'src/app/user/user_class';
import { UserServiceService } from 'src/app/user/user-service.service';
@Component({
  selector: 'app-update-emp',
  templateUrl: './update-emp.component.html',
  styleUrls: ['./update-emp.component.css']
})
export class UpdateEmpComponent implements OnInit {
  emp_id: number;
  emp_update: FormGroup;
  selected:string;
  user_arr:user_class[]=[];
  constructor(public _activated_routes: ActivatedRoute, public _ser: EmpDataService, public _route: Router,public _userser:UserServiceService) { }

  ngOnInit() {

    this.emp_id = this._activated_routes.snapshot.params['emp_id'];
    console.log(this.emp_id);
    this.emp_update = new FormGroup({
      emp_name: new FormControl(null, [Validators.required]),
      mobile_no: new FormControl(null),
      emp_id:new FormControl(null),
      fk_user_email:new FormControl(null)

    });
    this._ser.getempbyid(this.emp_id.toString()).subscribe(
      (data: emp_class[]) => {
        this.formDataBind(data[0]);
      }
    );
    this._userser.getAllUser().subscribe(
      (data:any[])=>{
        console.log(data);
        this.user_arr=data;
      }
    );
}

  formDataBind(item: emp_class) {
    this.emp_update.patchValue({
      emp_name:item.emp_name,
      mobile_no:item.mobile_no,
      emp_id:item.emp_id,
      fk_user_email:item.fk_user_email
    });
  }
  onEmpSubmit() {
    this._ser.updateEmp(this.emp_update.value).subscribe(
      (data: emp_class) => {
        this._route.navigate(['/nav/emp']);
      }
    );
  }

}
