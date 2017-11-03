import { Component } from '@angular/core';
import {Navbar, NavController} from 'ionic-angular';
import { Storage } from "@ionic/storage";

import * as Constant from "../../utilities/constants";

import { Categorie } from "../../models/categorie";

import {EloPage} from "../elo/elo";
import { ExercicesPage } from "../exercices/exercices";
import { QuestionsPage } from "../questions/questions"
import {ProgressPage} from "../progress/progress";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  categories: Array<Categorie>;

  constructor(public navCtrl: NavController, public storage: Storage) {
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
      QuestionsPage,
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
      EloPage,
      'Extra',
      'game-controller-a',
      'Des jeux à faire tout le temps !',
      'primary'
    ));
  }

}
