import { Component, OnInit, Inject } from '@angular/core';
import {  MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { user_class } from '../user_class';

@Component({
  selector: 'app-viewmoreuser',
  templateUrl: './viewmoreuser.component.html',
  styleUrls: ['./viewmoreuser.component.css']
})
export class ViewmoreuserComponent implements OnInit {
  public user_email:string;
  public user_password:string;
  public user_type:string;

  constructor(public diaplogref:MatDialogRef<ViewmoreuserComponent>,
    @Inject(MAT_DIALOG_DATA)public data:user_class) { }

  ngOnInit() {
    this.user_email=this.data.user_email;
    this.user_password=this.data.user_password;
    this.user_type=this.data.user_type;
  }

}
