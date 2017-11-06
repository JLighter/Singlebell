import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Note } from "../../models/note";
import { Exercice } from "../../models/exercice";
import { Question } from "../../models/question";
import { ExerciceType } from "../../models/exercice_type";
import { NativeAudio } from '@ionic-native/native-audio';
import { ExerciceGenerator } from '../../utilities/exercice_generator';
import { ExerciceRepository } from '../../repository/exercice_repository';
import { ResultatPage } from '../resultat/resultat';
//import {UserRepository} from "../../repository/user_repository";
import { ToneUtilities } from "../../utilities/tone";

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
  providers : [ExerciceGenerator,ExerciceRepository]
})
export class QuestionsPage {

  nbQuestion : number = 0;
  nbQuestionMax : number = 15;
  speaker = new ToneUtilities();
  type : ExerciceType ;
  difficulty : number;
  exo : Exercice;
  questions : Array<Question> = [];
  choices : Array<Note> = [];
  checkUserChoice : boolean ;
  hidden:boolean = false;0
  switchRefNote : boolean = false;
  btnSwitch:boolean = false;
  currentQuestion : Question ;


  constructor(public navCtrl: NavController, public navParams: NavParams,public nativeAudio: NativeAudio,public exGen : ExerciceGenerator,public exRepo : ExerciceRepository ) {
   this.type = this.navParams.get('exercice_type');
   this.difficulty = this.navParams.get('rank');

   this.generateNewExercice();
  }


  changeChoicesNames(choices : Array<Note>){
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
    if(this.nbQuestion == this.nbQuestionMax){
      this.exo.questions = this.questions;
      //this.exRepo.addDoneExercice(this.exo);
      this.navCtrl.push(ResultatPage,{'questions':this.questions});
    }
    else{

      this.btnSwitch=false;
      this.hidden = false;
      this.checkUserChoice = false;
      this.choices = [];
      this.generateNewQuestion(this.exo);
    }

  }

  generateNewExercice(){
    this.exGen.newExercice(this.type.id,this.difficulty).then((exercice)=>{
      this.exo = exercice;
      this.generateNewQuestion(this.exo);
    })
  }

  generateNewQuestion(exercice: Exercice ){
    this.nbQuestion = this.nbQuestion+1;
    if(this.type.id == 1 && this.difficulty == 0.25){
      this.switchRefNote = true;
    }
    else if(this.type.id == 1 && this.difficulty == 0.5){

      this.switchRefNote = Math.random() >= 0.5;
    }

    this.exGen.newQuestion(exercice).then(function(question){

      return question;

    }).then((question)=>{
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

  playSoundFromChoices(note:Note){
    if(this.type.id == 0){
      this.speaker.playInterval([note,this.currentQuestion.notes[1]])
    }else{
        this.speaker.playNote(note);
  }
}

  playSound(notes: Array<Note>){
    if(this.type.id == 0){
      this.speaker.playInterval(notes);
    }
    else{
      console.log(notes);
      this.speaker.playNote(notes[0]);
    }
  }
}
