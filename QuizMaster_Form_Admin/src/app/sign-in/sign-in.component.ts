import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  form : FormGroup;
  hide = true;

  constructor(private formbuilder: FormBuilder, private auth: AuthService, public router: Router, private appcomponent: AppComponent) { }

  ngOnInit(): void {

    this.LoginForm();
    this.appcomponent.isLogin = false;
    
  }

  LoginForm(){
    this.form = this.formbuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  Login(email, password){

    console.log("form value", this.form.value);
    this.auth.SignIn(email, password).then(()=>{
      console.log("Loging Completed");
    });

  }

  signup(){
    console.log("Navigate to register form")
    this.router.navigate(['register-user']);
  }
}
