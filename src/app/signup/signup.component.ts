import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { SignupDataService } from './signup-data.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  invalidArrayNames: String[] = [
    'jinal',
    'shah',
    'krunal'
  ];
  constructor(private _signupData: SignupDataService) { }

  ngOnInit() {

    this.signupForm = new FormGroup({
      user_email: new FormControl(null, [Validators.required, Validators.email]),
      password_group: new FormGroup({
        user_password: new FormControl(null, [Validators.required]),
        user_confirm_password: new FormControl(null)
      }, [this.passwordMatch.bind(this)]),
      user_type: new FormControl('user'),
      customer_name: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.pattern('[a-zA-Z]*'), this.checkUname.bind(this)]),
      customer_address: new FormControl(null),
      customer_mobileno: new FormControl(null, [Validators.required, Validators.maxLength(10), Validators.pattern('[0-9]*')])
    });
  }
  onSignup() {
    let userobj = {
      user_email: this.signupForm.value.user_email,
      user_password: this.signupForm.value.password_group.user_password,
      user_type: this.signupForm.value.user_type
    };
    let customerobj = {
      customer_name: this.signupForm.value.customer_name,
      customer_address: this.signupForm.value.customer_address,
      customer_mobileno: this.signupForm.value.customer_mobileno,
      fk_user_email: this.signupForm.value.user_email
    };
    this._signupData.signup(userobj).subscribe(
      (x: any) => {
        this._signupData.customerAdd(customerobj).subscribe(
          (y: any) => {
            alert('patyu');
          }
        );
      }
    );
  }
  passwordMatch(c: AbstractControl): { [s: string]: boolean } {
    const pass = c.get('user_password').value;
    const cpass = c.get('user_confirm_password').value;
    if (pass != cpass) {

      return { 'sarkhanathi': true };
    }
    return null;
  }
  checkUname(c: AbstractControl): { [s: string]: boolean } {

    if (this.invalidArrayNames.indexOf(c.value) != -1) {
      return { 'invalidName': true };
    }
    return null;
  }
}



