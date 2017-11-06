import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Question } from "../../models/question";
import { Exercice } from "../../models/exercice";



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

  score : number;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.score = Exercice.getScore(this.navParams.get('exercice'));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResultatPage');
  }

}
