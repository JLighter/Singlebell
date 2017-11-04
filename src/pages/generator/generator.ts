import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ExerciceGenerator} from "../../utilities/exercice_generator";
import {Exercice} from "../../models/exercice";

/**
 * Generated class for the GeneratorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-generator',
  templateUrl: 'generator.html',
  providers: [ExerciceGenerator]
})
export class GeneratorPage {

  private exercice: Exercice;

  constructor(public navCtrl: NavController, public navParams: NavParams, public generator: ExerciceGenerator) {

  }

  generateExercice() {
    let _this = this;

    this.generator.newExercice(1).then(function(exercice) {
      _this.exercice = exercice;
      console.log(exercice);
    }, (error) => console.error(error))
  }

  generateQuestion() {
    let _this = this;

    _this.generator.newQuestion(_this.exercice).then(function(question) {
      _this.exercice.questions.push(question);
      console.log(question);
    }, (error) => console.error(error))
  }

}
