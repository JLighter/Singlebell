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

  public p1 : number;
  public p2: number;
  public score: number;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.p1 = 100;
    this.p2 = 1000;
    this.score = 0.5;
  }

  newRank() {
    this.p1 = Elo.calculElo(this.p1, Elo.expected(this.p1, this.p2), this.score);
  }

  expected(p1,p2) {
    return Elo.expected(p1,p2)
  }
}
