import { Component } from '@angular/core';
import {NavController} from 'ionic-angular';
import { Categorie } from "../../models/categorie";

import { ExercicesPage } from "../exercices/exercices";
import {ProgressPage} from "../progress/progress";
import {ExtraPage} from "../extra/extra";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  categories: Array<Categorie>;

  constructor(public navCtrl: NavController) {
    this.categories = [];

    this.initCategories();
  }

  initCategories() {
    this.categories.push(new Categorie(
      null,
      'Au programme',
      'easel',
      '10 exercices spécialement choisient pour vous !',
      'primary'
    ));

    this.categories.push(new Categorie(
      ExercicesPage,
      'Exercices',
      'bulb',
      'Tous les exercices que vous pouvez débloqués !',
      'primary'
    ));

    this.categories.push(new Categorie(
      ProgressPage,
      'Progression',
      'podium',
      'Les statistique sur votre progression.',
      'primary'
    ));

    this.categories.push(new Categorie(
      ExtraPage,
      'Extra',
      'game-controller-a',
      'Des jeux à faire tout le temps !',
      'primary'
    ));
  }

}
