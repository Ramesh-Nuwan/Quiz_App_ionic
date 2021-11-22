import { Component, OnInit, ViewChild } from '@angular/core';
import { QuizService } from '../../../core/services/quiz.service';
import { UserdataService } from './../../../core/services/userdata.service';
import { Question } from '../../../models/question.model';
import { Quiz } from '../../../models/quiz.model';
import { ActivatedRoute } from '@angular/router';
import { CountdownEvent, CountdownComponent} from 'ngx-countdown';
import { LoadingController } from '@ionic/angular';
import { isNull } from '@angular/compiler/src/output/output_ast';
import { promise } from 'protractor';

@Component({
  selector: 'app-view-quiz',
  templateUrl: './view-quiz.component.html',
  styleUrls: ['./view-quiz.component.scss'],
})
export class ViewQuizComponent implements OnInit {

  @ViewChild('timer') counter: CountdownComponent;

  level: number = 1;
  currentLevel: number;
  quiz: Quiz = null;
  question: Question = null;
  totalMarks: number = 0;
  showResult: boolean = false;
  userStatus: string = 'fail';
  total_question: number = 0;
  correct_answers: number = 0;
  id: any; 
  config: any;
  time: number;
  loadingMsg: string;
  show_alert: boolean = false;


  constructor( private quizSrv: QuizService, private userService: UserdataService, private route:ActivatedRoute, private loadingController: LoadingController) { 

    this.route.params.subscribe(res => {     
      this.level = Number(res.level);
      this.currentLevel = Number(res.currentLevel);
      this.getMyQuiz(); 
    });

  }

  ngOnInit() {
    this.id = this.userService.getDeviceId();

  }

  ngOnDestroy(){
    this.loadingController.dismiss().then(res =>{
      console.log(res);
    });
  }

  /*loadingEvent(){
      const loading = this.loadingController.create({
        cssClass: 'loading',
        spinner: 'dots',
        message: this.loadingMsg,
        translucent: true,
        duration: 500
      });
      loading.then(load=>{
        load.present().then(res => {
          console.log(res);
        });
      });
  }*/

  load(time:number) {
    const loading = this.loadingController.create({
      cssClass: 'loading',
      spinner: 'dots',
      message: this.loadingMsg,
      translucent: true,
      duration: time
    });
    return loading;
  }


  handleTimer(e: CountdownEvent) {

    if(e.action=="start"){
      console.log('Actions', e);
      console.log('CountDown Start');
    }

    if(e.action=="done"){      
      console.log('Actions', e);
      console.log('CountDown Complete');
      this.question = this.quiz.questions[this.question.id++];
      this.timer_satrt();

      if(!this.question){
        if(this.quiz.pass_mark <= this.totalMarks){
          this.userStatus = 'pass';
          //var nextlevel = this.level+1;
        }
        this.showResult = true;
        this.update(this.id, this.level.toString(), this.totalMarks, this.currentLevel);
        console.log(' this.totalMarks', this.totalMarks); 
      }
    }
  }

  getMyQuiz(){
    console.log('--getMyQuiz--'+this.level);
    this.loadingMsg = 'Loading';
    this.load(null).then(load=>{
      load.present();
    });

    var quiz_obj;
    this.quizSrv.quiz_filter(this.level).then((data)=>{
      data.forEach(d=>{
        quiz_obj = d.val();
      })
      console.log('QUIZ RESPONSE', quiz_obj)

      if (quiz_obj == null) {
        this.loadingController.dismiss().then(res=>{
          this.loadingMsg = '';
          console.log('Spinner Close', res);
        });
        this.show_alert = true
  
      } else {
        this.quiz = quiz_obj;
        console.log(this.quiz);
        this.question = this.quiz.questions[0];
        this.total_question = this.quiz.total_questions;
        this.time = this.quiz.time;
        this.config = {leftTime: this.time, format: 'mm:ss'};
  
        this.loadingController.dismiss().then(res=>{
          this.loadingMsg = '';
          console.log('Spinner Close', res);
        });
      }

    });



    /*this.quizSrv.getQuiz(this.level).subscribe (
      ret=>{
          console.log('QUIZ RESPONSE', ret)
          if (ret == null) {
            this.loadingController.dismiss().then(res=>{
              this.loadingMsg = '';
              console.log('Spinner Close', res);
            }); 
            this.show_alert = true
 
          } else {
            this.quiz = ret;
            console.log(this.quiz);
            this.question = this.quiz.questions[0];
            this.total_question = this.quiz.total_questions;
            this.time = this.quiz.time;
            this.config = {leftTime: this.time, format: 'mm:ss'};
    
            this.loadingController.dismiss().then(res=>{
              this.loadingMsg = '';
              console.log('Spinner Close', res);
            });
          }

        //console.log('QUIZ RESPOSE', Boolean(ret))
      }
    
    );*/
  }

  saveAnswer(question,answer){
    question.answer = answer.id;
    console.log('question', question);
    console.log('answer', answer);
    console.log('question.answer', question.answer);

    if(answer.correct == 1){
      this.totalMarks += question.marks;
      this.correct_answers++;
    }
    this.load(300).then(load => {
      load.present();
      load.onWillDismiss().then(res => {
        console.log(res);
        this.question = this.quiz.questions[question.id];
        this.reset_timer();
        console.log(!this.question);
        if(!this.question){

          if(this.quiz.pass_mark <= this.totalMarks){
            this.userStatus = 'pass';
            //var nextlevel = this.level+1;
            this.update(this.id, this.level.toString(), this.totalMarks, this.currentLevel);
            console.log(' this.totalMarks', this.totalMarks); 
          } else {
            this.update(this.id, this.level.toString(), this.totalMarks, this.currentLevel);
            console.log(' this.totalMarks', this.totalMarks); 
          }
          this.showResult = true;

        }
      });
    });
    // this.question = this.quiz.questions[question.id];
    // this.reset_timer();

 
  }

  /*saveUserQuizData(){
    //var a = this.quizSrv.saveQuizData(this.quiz);
    console.log(this.quiz);
  }*/

 update(id: any, completeLevel: string, marks: number, currentLevel: number){

   //var completeLevel = 'L'+completeLevel;
   this.userService.updateUser(id, completeLevel, marks, currentLevel, this.userStatus);
  }

  reset_timer() {
    this.counter.restart();
  }

/*added timer_start() function because if user unable to click any answer and UI render next question but in this process countdown 
compenent not restart with resetTimer()*/

  timer_satrt(){
    this.config = {leftTime: this.time, format: 'mm:ss', demand: false};
    this.counter.begin();
  }
}
