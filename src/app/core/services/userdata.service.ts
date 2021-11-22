import { User } from './../../models/user.model';
import { Injectable } from '@angular/core';
import{AngularFireDatabase, AngularFireList, AngularFireObject} from '@angular/fire/database';
import { Device } from '@ionic-native/device/ngx';

@Injectable({
  providedIn: 'root'
})
export class UserdataService {

  private db_path = '/users';
  user_ref: AngularFireList<User>= null;
  user : AngularFireObject<any>;
  userId: any;

  constructor(private db: AngularFireDatabase, private device: Device) {
    this.user_ref = this.db.list(this.db_path);
    
   }

  getDeviceId(): any{

    this.userId = this.device.uuid;
    /*this.deviceId.get()
      .then((uuid: any) =>{
        this.userId = uuid;
        console.log('This is Device ID = '+this.userId);
      })
      .catch((error: any) => console.log(error));*/
      
    return this.userId;  
  }

  createUser(id:any): void {
    var userdata = {};
    var data = {};

    data['id'] = id;
    data['current_level'] = 1;
    data['marks'] = {'L1':0};
    userdata[id] = data;

    this.db.object(this.db_path).update(userdata);
    userdata = {};
    data = {};
  }

  updateUser(key: any, completelevel: string, marks: number, currentLevel: number, userState: string): any {
    
    var updateLevel: string = 'L'+completelevel;
    console.log(userState);

    if (userState == "pass") {

      if(Number(completelevel) < currentLevel){

        console.log('completelevel less than current level')
        this.updateMarks(key, updateLevel, marks).then(res=>{
          console.log(res);
         });
      } 
      
      else {
  
        console.log('completelevel Greater than current level')
        var data = {};
        //data['current_level'] = nextLevel;
        data['current_level'] = Number(completelevel)+1;
        console.log(data)
        this.updateMarks(key, updateLevel, marks).then(res=>{
          console.log(res);
         });
        this.db.object(this.db_path+'/'+key).update(data);
      }
      
    } 
    else {

      console.log('****User Fail******')
      this.updateMarks(key, updateLevel, marks).then(res=>{
        console.log(res);
       });
      
    }



  }

  updateMarks(key: any, level: any, value: any): Promise<void>{
    var marks = {}
    marks[level] = value;
    console.log(marks);
    return this.db.object(this.db_path+'/'+key+'/marks').update(marks);
  }

  getUserList(): any{
    this.user = this.db.object(this.db_path);
    return this.user.valueChanges();
  }

  getUserData(key:number): AngularFireObject<User>{
  this.user = this.db.object(this.db_path+'/'+key);
  return this.user;
  }
}
