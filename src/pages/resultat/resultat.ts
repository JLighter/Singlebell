import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Question } from "../../models/question";
import { Exercice } from "../../models/exercice";
import {ExercicesPage} from "../exercices/exercices";
import { QuestionsPage } from "../questions/questions";
import { ExerciceType } from "../../models/exercice_type";
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
  exType : ExerciceType;
  score : number;
  test: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.exercice = this.navParams.get('exercice');
    this.test = this.navParams.get('test');
    this.exType = new ExerciceType(1, "Absolue", "eye-off", "Identifiez la note joué");
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

  goTest() {
    this.navCtrl.push(QuestionsPage,{rank:0.5,exercice_type:this.exType})
  }

  labelForAnswer(question: Question, answer: Note): string {
    return Question.labelForAnswer(this.exercice.type, question.notes, answer);
  }

}
