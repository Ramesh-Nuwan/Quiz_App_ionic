import { User } from './../../../models/user.model';
import { UserdataService } from './../../../core/services/userdata.service';
import { LevelService } from './../../../core/services/level.service';
import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';



@Component({
  selector: 'app-user-level',
  templateUrl: './user-level.component.html',
  styleUrls: ['./user-level.component.scss'],
})
export class UserLevelComponent implements OnInit {

  //level_Image: any = [{level: 1, image:'Polygon_1'},{level: 2, image:'Polygon_2'},{level: 3, image:'Polygon_3'},{level: 4, image:'Polygon_4'},{level: 5, image:'Polygon_5'},{level: 6, image:'Polygon_1'},{level: 7, image:'Polygon_2'},{level: 8, image:'Polygon_3'},{level: 9, image:'Polygon_4'},{level: 10, image:'Polygon_5'}];
  levelDetails:any;
  currentLevel: number=1;
  userId: any = null;
  userKey: any;
  marks: any[] = [];
  levelMarks:any = {};
  userList: any;
  isDataLoad: boolean = false;

  constructor(private userService: UserdataService, private levelServise: LevelService, private loadingController: LoadingController) {
   }

  ngOnInit() {

    this.loadingEvent();
    this.getDeviceId();
    this.getOneUser(this.userKey);
    this.getLevelsDetails();

  }

  ngOnDestroy(){
    this.loadingController.dismiss().then(res =>{
      console.log(res);
    });
  }

  /*getAllUserData(){

    this.userService.getUserList().snapshotChanges().pipe(
        map(changes =>
          changes.map(c =>
            ({ key: c.payload.key, ...c.payload.val() })
          )
        )
      ).subscribe(userData => {
        userData.forEach(element => {
          this.userList = element.key;
          console.log( typeof element.key);
        });
        
      });
  }*/

  loadingEvent(){
    console.log(this.isDataLoad);
    if(!this.isDataLoad){
      this.loadingController.create({
        cssClass: 'loading',
        spinner: 'bubbles',
        message: 'Loading',
        translucent: true
      }).then(load=>{
        load.present();
      });
    }

  }
  
  getLevelsDetails(){
    this.levelServise.getlevels().subscribe(res=>{
      this.levelDetails = res.levels;
      console.log('this.levelDetails', this.levelDetails);
    })
  }
  
  getOneUser(key:any): any{
  
    this.userService.getUserData(key).valueChanges().subscribe(res=>{
      if(res){
        console.log('a User in DB'); 
        this.userId = res.id;
        this.currentLevel = res.current_level;   
        this.marks = Object.values(res.marks);

        //Testing code here
        this.levelMarks = res.marks;
        console.log(this.levelMarks);
        console.log(this.levelMarks['L10']);


        console.log(this.marks);
        console.log(this.userId);
      }
      else{
        console.log('a User NOT in DB'); 
        console.log(this.userId==null);
        this.createUser();
      }

      this.isDataLoad = true;
      this.loadingController.dismiss().then(res =>{
        console.log(res);
      });

    });
  }

  createUser(){

    this.userService.createUser(this.userKey);
    console.log(this.userKey);
    /*this.userService.getUserList().subscribe(res=>{
      console.log(res);
      if(res[this.userKey]){
        //console.log('User Found');
      }else{
        //console.log('User NOT found');
      }
      console.log(res[this.userKey]);
    });*/
  }
  
  getDeviceId(){
    this.userKey = this.userService.getDeviceId();
    console.log('This is Device ID : '+this.userKey);
  }

}
