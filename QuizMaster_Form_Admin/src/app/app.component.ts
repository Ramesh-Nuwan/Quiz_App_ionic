import { Component, OnInit } from '@angular/core';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{

  title: string = 'QUIZ MASTER';
  isLogin: boolean = false;

  constructor(private auth: AuthService){}
  
 Logout(){
    this.auth.SignOut().then(()=>{
      console.log("SignOut Completed");
    });
  }


}
