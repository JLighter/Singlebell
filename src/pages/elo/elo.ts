import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Elo } from "../../utilities/elo";

/**
 * Generated class for the EloPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-elo',
  templateUrl: 'elo.html'
})
export class EloPage {

  results : Array<number> = [0,0,0,0];
  p1: number = 100;
  p2: number = 1000;
  diffP1;
  diffP2;
  score: number = 0.5;

  constructor(public navCtrl: NavController, public navParams: NavParams, public elo: Elo) {
  }

  newRank() {
    this.p1 = this.elo.calculElo(this.p1, this.elo.expected(this.p1, this.p2), this.score);
  }
}
