import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Exercice} from "../../models/exercice";

/**
 * Generated class for the ExercicesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-exercices',
  templateUrl: 'exercices.html',
})
export class ExercicesPage {

  public exercices: Array<Exercice>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.exercices = [];

    this.exercices.push(new Exercice(
      null,
      'none',
      'Exercice 1',
      'Descrption sommaire lorem ipsum dolor sit amet',
      'primary',
      10
    ))
  }

}
