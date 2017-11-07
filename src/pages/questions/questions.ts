import {Component, Output} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Note } from "../../models/note";
import { Exercice } from "../../models/exercice";
import { Question } from "../../models/question";
import { ExerciceType } from "../../models/exercice_type";
import { ExerciceGenerator } from '../../utilities/exercice_generator';
import { ExerciceRepository } from '../../repository/exercice_repository';
import { ResultatPage } from '../resultat/resultat';
import { Speaker } from "../../utilities/tone_speaker";
import { Elo } from "../../utilities/elo";
import { UserRepository } from "../../repository/user_repository";
import * as Constant from '../../utilities/constants';

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
  providers : [ExerciceGenerator,ExerciceRepository,UserRepository]
})
export class QuestionsPage {

  nbQuestion : number = 0;
  nbMaxUncorrectQuestion : number = 0;
  nbQuestionMax : number;
  type : ExerciceType ;
  difficulty : number;
  exo : Exercice;
  rank : number = 0;
  choices : Array<Note> = [];
  checkUserChoice : boolean ;
  hidden:boolean = false;
  switchRefNote : boolean = false;
  refNote : Note = null;
  btnSwitch:boolean = false;
  currentQuestion : Question = null;
  userOldRank : number;
  userName : string ;
  isTest : boolean = false;
  selectedIntervals : Array<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams ,public exGen : ExerciceGenerator, public exRepo : ExerciceRepository, public userRepo : UserRepository) {
    this.type = this.navParams.get('exercice_type');

    this.difficulty = this.navParams.get('difficulty');
    this.isTest = this.navParams.get('isTest');
    this.selectedIntervals = this.navParams.get('selectedIntervals');

    this.userRepo.getUser().then((user)=>{
      this.userOldRank = user.level;
      this.userName = user.name;
    });

    this.nbQuestionMax = this.difficulty >= Constant.difficulty_indice_easy ? 7 : this.difficulty >= Constant.difficulty_indice_normal ? 10 : 15;

    this.nbMaxUncorrectQuestion = this.difficulty >= Constant.difficulty_indice_easy ? 7 : 5;

    this.generateNewExercice();
  }

  generateNewExercice(){
    let this_ = this;

    let opts = {
      selectedIntervals: this_.selectedIntervals,
    };

    this.exGen.newExercice(this.type.id,this.difficulty, opts).then((exercice)=>{
      this.exo = exercice;
      this.rank = Math.round(exercice.rank);
      this.generateNewQuestion(this.exo);
    })
  }

  generateNewQuestion(exercice: Exercice ){

    this.nbQuestion = this.nbQuestion+1;

    let this_ = this;

    let rank = exercice.rank;
    if (this.isTest) rank = this.userOldRank;

    this_.exGen.newQuestion(exercice, rank).then((question)=> {
      this_.currentQuestion = question;
      this_.choices = question.answers;

      let answer = question.correctAnswer;

      let octave = parseInt(answer.name[answer.name.length-1]) + (Math.random()>= 0.25 ? + 1 : Math.random()>= 0.5 ? - 1 : 0);

      this_.exGen.generateRefNote(octave).then(function(note) {

        this_.refNote = note;

        if(this_.type.id == 1 && this_.difficulty == Constant.difficulty_indice_easy){

          this_.switchRefNote = true;
        }
        else if(this_.type.id == 1 && this_.difficulty == Constant.difficulty_indice_normal){

          this_.switchRefNote = Math.random() >= 0.5;

        }
      })

    })
  }

  checkAnswer(note: Note, event){

    if(this.hidden==true){
      event.stopPropagation();
    }
    else{
      this.btnSwitch=true;
      this.hidden = true;

      this.currentQuestion.correct = note.position == this.currentQuestion.correctAnswer.position;
      this.currentQuestion.givenAnswer = note;
      this.checkUserChoice = this.currentQuestion.correct;

      this.exo.questions.push(this.currentQuestion);
    }
  }

  nextQuestion(){

    if(this.nbQuestion == this.nbQuestionMax || this.isLoosingGame()){
      this.finalizeParty();
    }
    else{
      this.btnSwitch = false;
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

  finalizeParty() {
    let expected = Elo.expected(this.userOldRank,this.exo.rank);
    let score = Exercice.getScore(this.exo.questions);
    let newRank = Elo.calculElo(this.userOldRank,expected,score);

    if (this.navParams.get('isProgram')) {

      let tomorrow: Date = new Date();
      tomorrow.setDate(tomorrow.getDate()+1);

      this.exRepo.setTimeBeforeNextProgramme(tomorrow);

    }

    this.exRepo.setLastDoneExercices(this.exo);
    this.userRepo.setNewLevel(newRank,this.userName);
    this.exRepo.addDoneExercice(this.exo);
    this.navCtrl.push(ResultatPage,{'exercice':this.exo});
  }

  playSoundFromChoices(note:Note){
    if(this.type.id == 0){
      Speaker.playInterval([this.currentQuestion.notes[0],note])
    }else{
      Speaker.playNote(note);
    }
  }

  playSound(notes: Array<Note>){
    if(this.type.id == 0){
      Speaker.playInterval(notes);
    }
    else{
      Speaker.playNote(notes[0]);
    }
  }

  labelForAnswer(question: Question, answer: Note): string {
    return Question.labelForAnswer(this.exo.type, question.notes, answer);
  }
}
