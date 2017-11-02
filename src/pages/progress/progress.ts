import { Component } from '@angular/core';
import {Storage} from "@ionic/storage";
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {User} from "../../models/user";

import * as Constant from "../../utilities/constants";
import {Exercice} from "../../models/exercice";
import {ExerciceType} from "../../models/exercice_type";

/**
 * Generated class for the ProgressPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-progress',
  templateUrl: 'progress.html',
})
export class ProgressPage {

  user      : User = new User();
  progress  : number = 0;
  label     : string = "0/1000";
  exercices : Array<Exercice> = [];
  exerciceTypes: Array<ExerciceType> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {
    this.getUser();
    this.getDoneExercices();
  }

  getUser() {
    let _this = this;

    _this.storage.get(Constant.db_user_key).then(function(user : User) {

      _this.user = user;
      _this.progress = (user.level / 1000) * 100;
      _this.label = user.level + "/1000";

    }, function(error) {

      console.error(error);
    });
  }

  getDoneExercices() {
    let _this = this;

    _this.storage.get(Constant.db_done_exercice).then(function(exercices : Array<Exercice>) {

      _this.exercices = exercices;

      _this.exercices.forEach(function(exercice) {
        let types = _this.exerciceTypes.find(function(type) {
          return exercice.type.id === type.id;
        });

        if (!types) {
          _this.exerciceTypes.push(exercice.type);
        }
      });

      console.log(_this.exercices, _this.exerciceTypes);

    }, function(error) {

      console.error(error);
    });
  }

  exercicesOfType(id: number): Array<Exercice> {
    return this.exercices.filter(function(x) {
      return x.type.id == id
    })
  }

  nbOfExerciceOfType(id: number): number {
    return this.exercices.filter(function(x) {
      return x.type.id == id
    }).length
  }

}
