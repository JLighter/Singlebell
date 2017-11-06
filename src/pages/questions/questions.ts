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
import { ToneUtilities } from "../../utilities/tone";
import { Elo } from "../../utilities/elo";
import { UserRepository } from "../../repository/user_repository";
import { User } from "../../models/user";



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
  providers : [ExerciceGenerator,ExerciceRepository,Elo,UserRepository]
})
export class QuestionsPage {

  nbQuestion : number = 0;
  nbMaxUncorrectQuestion : number = 0;
  nbQuestionMax : number;
  speaker = new ToneUtilities();
  type : ExerciceType ;
  difficulty : number;
  exo : Exercice;
  choices : Array<Note> = [];
  checkUserChoice : boolean ;
  hidden:boolean = false;
  switchRefNote : boolean = false;
  btnSwitch:boolean = false;
  currentQuestion : Question = null;
  userOldRank : number;
  userName : string ;


  constructor(public navCtrl: NavController, public navParams: NavParams,public nativeAudio: NativeAudio,public exGen : ExerciceGenerator,public exRepo : ExerciceRepository ,public elo: Elo, public userRepo : UserRepository) {
   this.type = this.navParams.get('exercice_type');
   this.difficulty = this.navParams.get('rank');
   this.userRepo.getUser().then((user)=>{
     this.userOldRank = user.level;
     this.userName = user.name;
   })

   this.nbQuestionMax = this.difficulty <= 0.25 ? 7 :
                        this.difficulty <= 0.5 ? 10 : 15;

   this.nbMaxUncorrectQuestion = this.difficulty <= 0.25 ? 7 : 5;

   this.generateNewExercice();
  }

  changeChoicesNames(choices : Array<Note>){
  }

  checkAnswer(position: number, event){

    if(this.hidden==true){
      event.stopPropagation();
    }
    else{
      this.btnSwitch=true;
      this.hidden = true;

      this.currentQuestion.correct = position == this.currentQuestion.correctAnswer.position;

      this.exo.questions.push(this.currentQuestion);
    }
  }

  nextQuestion(){

    if(this.nbQuestion == this.nbQuestionMax || this.isLoosingGame()){
      let expected = this.elo.expected(this.userOldRank,this.exo.rank);
      let score = Exercice.getScore(this.exo.questions);
      let newRank = this.elo.calculElo(this.userOldRank,expected,score);
      this.userRepo.setNewLevel(newRank,this.userName);
      this.exRepo.addDoneExercice(this.exo);
      this.navCtrl.push(ResultatPage,{'exercice':this.exo});
    }
    else{
      this.btnSwitch=false;
      this.hidden = false;
      this.checkUserChoice = false;
      this.generateNewQuestion(this.exo);
    }

  }

  // Function defined in order to prevent the user to lose 5 multiple questions or other
  isLoosingGame(): boolean {
    var count = 0;

    this.exo.questions.forEach((question) => {
      if (question.correct == false) count++;
      else count = 0;

      if (count >= this.nbMaxUncorrectQuestion) return false
    });

    return false
  }

  finalizeExercice() {

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

<<<<<<< HEAD
    let _this = this;

    _this.exGen.newQuestion(exercice).then((question)=> {
      _this.currentQuestion = question;
      _this.choices = question.answers;
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
