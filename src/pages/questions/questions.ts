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
  providers : [ExerciceGenerator,
      ExerciceRepository,UserRepository]
})
export class QuestionsPage {

  type : ExerciceType ;
  exo : Exercice;
  questions : Array<Question>;
  choices : Array<String>;
  checkUserChoice : boolean ;
  hidden:boolean = false;
  btnSwitch:boolean = false;
  currentQuestion : Question ;
  soundPath : string = "../../assets/audio/";

  constructor(public navCtrl: NavController, public navParams: NavParams,public nativeAudio: NativeAudio,public exGen : ExerciceGenerator) {
    console.log(this.exGen.exerciceRepository);
    this.type = new ExerciceType(0,"Absolue melodique","","Identifiez correctement la note joué")
    console.log(this.type);

    this.exGen.userRepository.getUser().then((user)=> {
      this.exo = exGen.newExercice(this.type);
      this.currentQuestion = exGen.newQuestion(this.exo);
    })

    // this.currentQuestion = exGen.newQuestion(this.exo) ;
    //
    // /*Fake generated questions*/
    // console.log(this.currentQuestion);
    // this.choices = this.currentQuestion.answers ;
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


      this.currentQuestion = this.exGen.newQuestion(this.exo);
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
