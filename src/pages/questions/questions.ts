import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Note } from "../../models/note";
import { Exercice } from "../../models/exercice";
import { Question } from "../../models/question";
import { ExerciceType } from "../../models/exercice_type";
import { NativeAudio } from '@ionic-native/native-audio';
import { ExerciceGenerator } from '../../utilities/exercice_generator';
import { ExerciceRepository } from '../../repository/exercice_repository';
import {UserRepository} from "../../repository/user_repository";


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
  providers : [ExerciceGenerator]
})
export class QuestionsPage {

  type : ExerciceType ;
  rank : number;
  exo : Exercice;
  questions : Array<Question> = [];
  choices : Array<Note> = [];
  checkUserChoice : boolean ;
  hidden:boolean = false;
  btnSwitch:boolean = false;
  currentQuestion : Question ;
  soundPath : string = "assets/audio/";

  constructor(public navCtrl: NavController, public navParams: NavParams,public nativeAudio: NativeAudio,public exGen : ExerciceGenerator) {
   this.type = this.navParams.get('exercice_type');
   this.rank = this.navParams.get('rank');
   this.generateNewExercice();
  }

  checkAnswer(position: number,event){

    if(this.hidden==true){
      event.stopPropagation();
    }
    else{
      this.btnSwitch=true;
      this.hidden = true;
      if(position == this.currentQuestion.answer.position){
        this.checkUserChoice = true;
        this.currentQuestion.correct = this.checkUserChoice;
      }
      else{
        this.checkUserChoice = false;
      }
      this.currentQuestion.correct = this.checkUserChoice;
      this.questions.push(this.currentQuestion);
    }

  }

  nextQuestion(){
    this.btnSwitch=false;
    this.hidden = false;
    this.checkUserChoice = false;
    this.choices = [];
    this.generateNewQuestion(this.exo);
  }

  generateNewExercice(){
    this.exGen.newExercice(this.type.id).then((exercice)=>{
      this.exo = exercice;
      this.generateNewQuestion(this.exo);
    })
  }

  generateNewQuestion(exercice: Exercice ){
    this.exGen.newQuestion(exercice).then(function(question){

      return question;

    }).then((question)=>{
      console.log(question);
      this.currentQuestion = question;
      this.choices.push(question.answer);
      return this.exGen.falseAnswers(this.type.id,question.range,question.notes,question.nbChoix).then(function(fake){
         return fake;
       })

    }).then((fake)=>{
      for(let i =0; i<fake.length ;i++){
        this.choices.push(fake[i]);
      }
    })
  }

  playSound(note:Note){
    console.log('note');
    this.nativeAudio.preloadSimple(note.name,this.soundPath+note.position+'.wav');
    this.nativeAudio.play(note.name);
  }

}
