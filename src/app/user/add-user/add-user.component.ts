import { Component, OnInit } from '@angular/core';
import { user_class } from '../user_class';
import { UserServiceService } from '../user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  user_email:string;
  user_password:string;
  user_type:string;
  constructor(public _ser:UserServiceService,public _route:Router) { }

  ngOnInit() {
  }
  onAddUser(f){
    this._ser.addUser(f.value).subscribe(
      (data:user_class)=>{
       this._route.navigate(['/nav/']);
      }
    );

  }

}
