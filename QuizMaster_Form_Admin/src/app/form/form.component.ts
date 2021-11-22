import { AuthService } from './../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/service/firebase.service';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Quiz } from './../models/quiz.model';
import { AppComponent } from '../app.component';
import firebase from 'firebase';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  question_Id: Number = 1;
  answer_Id: Number = 1;
  submitDissable: Boolean = true;
  quiz: Quiz;
  q_id: number =1;
  a_id: number;
  form: FormGroup;
  totalQuestions: Number;

  levels = [1,2,3,4,5,6,7,8,9,10];

  constructor(private firebase: FirebaseService, private formbuilder: FormBuilder,  private appcomponent: AppComponent, private auth: AuthService) { 
    console.log("FormComponent constructor CALL");
  }

  ngOnInit(): void {
    this.QuizForm();
    console.log(this.form.value);
    this.appcomponent.isLogin = true;

  }


  SaveQuiz() {
    this.firebase.CreateQuiz(this.quiz, this.form.get('name').value).then((res)=>{
      console.log(res);
      console.log('Quiz Saved Sucessfully');
    });
    console.log('SaveQuiz CLICKED');
  }

  GetAllQuiz() {
    this.firebase.GetQuizList().snapshotChanges().subscribe((data) => {
      data.forEach(item => {
        //var a = item.payload.toJSON();
        //console.log('item.payload.toJSON', a);
        //a['$key'] = item.key;
        //console.log('item.key', item.key);
        //console.log('aaa', a);
        //this.quiz.(a as Quiz);
        //this.quiz.name = a['$key'];
        //console.log('this.quiz', this.quiz);

//Model Type Assing Code here......
        /*var obj: any = {};
        obj['id'] = 1;
        obj['name'] = "aaaaaaaaaaa";
        obj['correct'] = 1;
        this.answer.push(obj);
        console.log('oooobbbjjj', obj);
        console.log('this.answer.pushj', this.answer);
        this.question['answers'] = this.answer;
        console.log('this.question',this.question);*/
      });
    });
    console.log('GetAllQuiz CLICKED');
  }

  QuizForm(){
    this.form = this.formbuilder.group({
      name: ['', Validators.required],
      time: ['', Validators.required],
      pass_mark: ['', Validators.required],
      total_questions: ['', Validators.required],
      quiz_level: ['', Validators.required],
      questions: this.formbuilder.array([]),
    });
  }

  questions(): FormArray {

    return this.form.get("questions") as FormArray;
  }

  newQuestion(): FormGroup {

    return this.formbuilder.group({ 
      id:[this.q_id],
      name: ['', Validators.required],
      marks: ['', Validators.required],
      answers: this.formbuilder.array([])
    });
  }

  addQuestion() {
    this.questions().push(this.newQuestion());
    this.q_id++;
  }

  removeQuestion(q_index: number){
    this.questions().removeAt(q_index);  
  }


  answers(q_index: number) : FormArray {
    return this.questions().at(q_index).get("answers") as FormArray
  }

  newAnswer(): FormGroup {
    return this.formbuilder.group({
      id: [this.a_id],
      name: ['', Validators.required],
      correct: ['', Validators.required] 
    })
  }

  addAnswer(q_id: number, an_id: number) {
    this.a_id = this.answers(q_id).length;
    this.a_id++;  
    this.answers(q_id).push(this.newAnswer());
  }

  removeAnswer(q_index: number, a_index: number){
    this.answers(q_index).removeAt(a_index);  
  }

  submit(){ 
    if (this.form.valid) {
      this.quiz = this.form.value;
      console.log(this.quiz);
      this.SaveQuiz();
      this.QuizForm(); 
    } else{
      alert('Please Complete Form')
    }

  }



}
