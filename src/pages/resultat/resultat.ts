import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Question } from "../../models/question";
import { Exercice } from "../../models/exercice";
import {ExercicesPage} from "../exercices/exercices";
import {Note} from "../../models/note";


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
})
export class ResultatPage {

  exercice : Exercice;
  score : number;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.exercice = this.navParams.get('exercice');
    this.score = Exercice.getScore(this.exercice.questions);

    console.log(this.exercice)
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
