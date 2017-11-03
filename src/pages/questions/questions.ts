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
  soundPath : string;

  constructor(public navCtrl: NavController, public navParams: NavParams,public nativeAudio: NativeAudio) {

    /*Fake generated questions*/
    this.soundPath ="../../assets/audio/"
    this.questions = [new Question("Quel est cette note ?",4,['Do','Re','Mi','Fa'],[new Note('Do','do_sound.mp3',1)]),new Question("Quel est cette note ?",4,['miB','LA','DO','SI'],[new Note('Do','1.wav',1)])]

    this.currentQuestion = this.questions[0];
    this.choices = this.currentQuestion.answers ;
  }

  checkAnswer(choice: String){

    this.btnSwitch=true;
    this.hidden = true;
    if(choice == this.currentQuestion.note[0].name){
      this.checkUserChoice = true;
    }
    else{
      this.checkUserChoice = false;
    }
  }

  nextQuestion(){

    /* Put response false/true in the question object
      Push the question in the Storage
      Then generate the new question with the function
      Put the generated question in the this.currentQuestion
    */
  }

  playSound(){
    this.nativeAudio.preloadSimple(this.currentQuestion.note[0].name,this.soundPath+'do_sound.mp3')
    this.nativeAudio.play(this.currentQuestion.note[0].name);
  }

}
