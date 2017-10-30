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
  templateUrl: 'elo.html',
  providers: [Elo]
})
export class EloPage {

  public p1 : number;
  public p2: number;
  public score: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public elo: Elo) {
    this.p1 = 100;
    this.p2 = 1000;
    this.score = 0.5;
  }

  newRank() {
    console.log(this.p1, this.p2, this.score);
    this.p1 = this.elo.calculElo(this.p1, this.elo.expected(this.p1, this.p2), this.score);
  }
}
