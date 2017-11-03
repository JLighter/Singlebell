import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Categorie} from "../../models/categorie";
import {EloPage} from "../elo/elo";

/**
 * Generated class for the ExtraPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-extra',
  templateUrl: 'extra.html',
})
export class ExtraPage {

  categories: Array<Categorie>;

  constructor(public navCtrl: NavController) {
    this.categories = [];

    this.initCategories();
  }

  initCategories() {
    this.categories.push(new Categorie(
      EloPage,
      'Elo ranking',
      'stats',
      'Comment fonctionne le systeme de classement de SingleBell ?',
      'primary'
    ));
  }

}
