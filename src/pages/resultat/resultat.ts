import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Question } from "../../models/question";
import { Exercice } from "../../models/exercice";
import {ExercicesPage} from "../exercices/exercices";
import {Note} from "../../models/note";
import {ExerciceRepository} from "../../repository/exercice_repository";


/**
 * Generated class for the ResultatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-resultat',
  templateUrl: 'resultat.html',
  providers: [ExerciceRepository]
})
export class ResultatPage {

  exercice : Exercice;
  score : number = 0;

  scorePourcent = 0;
  scoreLabel = "10/10";
  typeLabel = "Type";
  questions: Array<Question> = [];
  numberLabel = "x0";

  constructor(public navCtrl: NavController, public navParams: NavParams, public exorepo: ExerciceRepository) {

    this.exercice = this.navParams.get('exercice');


    let score = Exercice.getScore(this.exercice.questions);

    this.scoreLabel = score + "/" + this.exercice.questions.length;
    this.typeLabel = this.exercice.type.name;
    this.questions = this.exercice.questions;
    this.numberLabel = "x" + this.exercice.questions.length;
    this.scorePourcent = score/this.exercice.questions.length * 100;

  }

  progressLabel(exercice: Exercice) {
    return Exercice.getScore(exercice.questions) + '/' + exercice.questions.length
  }

  progressPourcent(exercice: Exercice) {
    return Exercice.getScore(exercice.questions)/exercice.questions.length * 100
  }

  popHome() {
    this.navCtrl.popToRoot();
  }

  labelForAnswer(question: Question, answer: Note): string {
    return Question.labelForAnswer(this.exercice.type, question.notes, answer);
  }

}
