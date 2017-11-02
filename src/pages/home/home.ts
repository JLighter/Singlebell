import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from "@ionic/storage";

import * as Constant from "../../utilities/constants";

import { Categorie } from "../../models/categorie";
import { User } from "../../models/user";

import {EloPage} from "../elo/elo";
import { ExercicesPage } from "../exercices/exercices";
import {ProgressPage} from "../progress/progress";
import {Exercice} from "../../models/exercice";
import {ExerciceType} from "../../models/exercice_type";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  categories: Array<Categorie>;

  constructor(public navCtrl: NavController, public storage: Storage) {
    this.categories = [];

    this.initCategories();

    this.firstTimeLaunched();

    this.setDoneExercices();
  }

  firstTimeLaunched() {
    var _this = this;

    _this.storage.clear();

    _this.storage.get(Constant.db_user_key)
      .then(function(user : User) {

        if (!user) {

          // TODO: Do anything to send the user to the ranking tests

          var user = new User("Julien", 500);

          _this.storage.set(Constant.db_user_key, user).then(function(value) {
            _this.storage.keys().then(function(keys) {
              console.log(keys);
            });
          });

        }


      }, function(error) {
        console.error(error);
      });
  }

  setDoneExercices() {
    let _this = this;

    let symphType = new ExerciceType(0, "Symphonique", "musical-note", "");
    let relType = new ExerciceType(2, "Relative", "eye", "");
    let absType = new ExerciceType(1, "Absolue", "eye-off", "");

    let exercices = [
      new Exercice(10, 15, new Date().getTime(), relType, 100),
      new Exercice(15, 15, new Date().getTime(), relType, 120),
      new Exercice(5, 16, new Date().getTime(), relType, 160),
      new Exercice(12, 16, new Date().getTime(), relType, 120),
      new Exercice(11, 16, new Date().getTime(), relType, 150),
      new Exercice(11, 16, new Date().getTime(), symphType, 350),
      new Exercice(2, 5, new Date().getTime(), symphType, 350),
      new Exercice(7, 10, new Date().getTime(), symphType, 340),
      new Exercice(6, 10, new Date().getTime(), absType, 460),
      new Exercice(5, 12, new Date().getTime(), absType, 490),
      new Exercice(5, 12, new Date().getTime(), absType, 480),
      new Exercice(7, 17, new Date().getTime(), absType, 780),
      new Exercice(5, 7, new Date().getTime(), absType, 750),
      new Exercice(17, 20, new Date().getTime(), absType, 880)
    ];

    _this.storage.set(Constant.db_done_exercice, exercices);
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
