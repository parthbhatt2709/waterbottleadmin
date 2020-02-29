import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServiceService } from '../user-service.service';
import { user_class } from '../user_class';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  user_email:string;
  user_password:string;
  user_type:string;
  constructor(public _activated_routes:ActivatedRoute,public _ser:UserServiceService,public _route:Router) { }

  ngOnInit() {
    this.user_email=this._activated_routes.snapshot.params['user_email'];
    console.log(this.user_email);
    this._ser.getUserById(this.user_email).subscribe(
      (data:user_class)=>{
        console.log(data);
         this.user_password=data[0].user_password;
         this.user_type=data[0].user_type;
      }
    );


  }
  onUpdateUser(item:user_class)
  {
    this._ser.updateUser(new user_class(this.user_email,this.user_password,this.user_type)).subscribe(
      (data:user_class)=>{
        console.log(data);
        alert("Data is updated")
        this._route.navigate(['/nav/']);
      }
    );
  }


}
