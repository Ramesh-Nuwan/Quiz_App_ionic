import { AuthService } from './../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  form: FormGroup;
  hide = true;

  constructor(private formbuilder: FormBuilder, private auth: AuthService) { }

  ngOnInit(): void {

    this.RegisterForm();
  }

  RegisterForm(){
    this.form = this.formbuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  Register(username, email, password){

    this.auth.SignUp(username, email, password).then(()=>{
      console.log("Sign Up Completed");
    });
    console.log("form value", this.form.value);
 
   }
}
