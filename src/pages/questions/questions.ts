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
  exo : Exercice;
  questions : Array<Question>;
  choices : Array<Note> = [];
  checkUserChoice : boolean ;
  hidden:boolean = false;
  btnSwitch:boolean = false;
  currentQuestion : Question ;
  soundPath : string = "../../assets/audio/";

  constructor(public navCtrl: NavController, public navParams: NavParams,public nativeAudio: NativeAudio,public exGen : ExerciceGenerator) {
   this.type = new ExerciceType(0,"Absolue melodique","","Identifiez correctement la note joué");
   this.generateNewQuestion();

  //  this.exGen.newQuestion(this.exo).then((questions)=>{
  //    this.currentQuestion = questions;
  //    this.choices.push(questions.answer);
  //    this.questions.push(questions);
  //  })
   //
  //  this.exGen.falseAnswers(this.type.id,this.currentQuestion.range,this.currentQuestion.notes,this.currentQuestion.nbChoix).then((choices)=>{
   //
  //     for(let i=0; i<choices.length;i++){
  //       this.choices.push(choices[i]);
  //     }
  //  });


    // this.currentQuestion = exGen.newQuestion(this.exo) ;
    //
    // /*Fake generated questions*/
    // console.log(this.currentQuestion);
  }

  checkAnswer(position: number){

    this.btnSwitch=true;
    this.hidden = true;

    console.log(position);
    if(position == this.currentQuestion.answer.position){
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

  generateNewQuestion(){

    this.exGen.newExercice(this.type.id).then((exercice)=>{
      this.exo = exercice;
      return exercice
    }).then((exercice)=>{

     return this.exGen.newQuestion(exercice).then(function(question){
        return question;
      })

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
    this.nativeAudio.preloadSimple(note.name,this.soundPath+note.position+'.wav')
    this.nativeAudio.play(note.name);
  }

}
