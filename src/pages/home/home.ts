import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from "@ionic/storage";

import * as Constant from "../../utilities/constants";

import { Categorie } from "../../models/categorie";
import { User } from "../../models/user";

import {EloPage} from "../elo/elo";
import { ExercicesPage } from "../exercices/exercices";
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

    this.firstTimeLaunched()
  }

  firstTimeLaunched() {
    var _this = this;

    _this.storage.get(Constant.db_user_key)
      .then(function(user : User) {

        if (!user) {

          // TODO: Do anything to send the user to the ranking tests

          var user = new User();

          _this.storage.set(Constant.db_user_key, user);

        }

        console.log(user);

      }, function(error) {
        console.error(error);
      });
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
      EloPage,
      'Extra',
      'game-controller-a',
      'Des jeux à faire tout le temps !',
      'primary'
    ));
  }

}
