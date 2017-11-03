import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Note } from "../../models/note";
import { Exercice } from "../../models/exercice";
import { Question } from "../../models/question";
import { ExerciceType } from "../../models/exercice_type";
import { NativeAudio } from '@ionic-native/native-audio';

/**
 * Generated class for the QuestionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-questions',
  templateUrl: 'questions.html',
})
export class QuestionsPage {

  questions : Array<Question>;
  choices : Array<String>;
  checkUserChoice : boolean ;
  hidden:boolean = false;
  btnSwitch:boolean = false;
  currentQuestion : Question;
  soundPath : string = "../../assets/audio/";

  constructor(public navCtrl: NavController, public navParams: NavParams,public nativeAudio: NativeAudio) {

    /*Fake generated questions*/
    this.questions = [new Question(4,2,['Do','Re','Mi','Fa'],[new Note('Do',1)],false,new Note('Do',1)),
                      new Question(4,2,['Do','Sol','Mi','La'],[new Note('Do',1)],false,new Note('Do',1))
                      ]

    this.currentQuestion = this.questions[1];
    console.log(this.currentQuestion);
    this.choices = this.currentQuestion.answers ;
  }

  checkAnswer(choice: any){

    this.btnSwitch=true;
    this.hidden = true;

    console.log(choice);
    if(choice == this.currentQuestion.notes[0].name){
      this.checkUserChoice = true;
    }
    else{
      this.checkUserChoice = false;
    }
  }

  nextQuestion(){
    this.btnSwitch=false;
    this.hidden = false;
    this.checkUserChoice = false;
    this.currentQuestion = this.questions[1];
    /* Put response false/true in the question object
      Push the question in the Storage
      Then generate the new question with the function
      Put the generated question in the this.currentQuestion
    */
  }

  playSound(){
    for(let i =0; i < this.currentQuestion.notes.length; i++){
      this.nativeAudio.preloadSimple(this.currentQuestion.notes[i].name,this.soundPath+this.currentQuestion.notes[i].name.toString()+'.wav')
      this.nativeAudio.play(this.currentQuestion.notes[i].name);
    }

  }

}
