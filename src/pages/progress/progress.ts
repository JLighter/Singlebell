import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {User} from "../../models/user";

import {Exercice} from "../../models/exercice";
import {ExerciceType} from "../../models/exercice_type";
import {UserRepository} from "../../repository/user_repository";
import {ExerciceRepository} from "../../repository/exercice_repository";

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
  providers: [UserRepository, ExerciceRepository]
})
export class ProgressPage {

  user      : User = new User();
  progress  : number = 0;
  label     : string = "0/1000";
  exercices : Array<Exercice> = [];
  exerciceTypes: Array<ExerciceType> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public userRepository: UserRepository, public exerciceRepository: ExerciceRepository) {
    let _this = this;

    _this.userRepository.getUser().then((user) => _this.user = user);

    _this.exerciceRepository.getDoneExercices().then((exercices) => _this.exercices = exercices);

    _this.exerciceRepository.getExerciceTypes().then((types) => _this.exerciceTypes = types);

  }

  exercicesOfType(id: number): Array<Exercice> {
    return this.exercices.filter((x) => x.type.id == id )
  }

  nbOfExerciceOfType(id: number): number {
    return this.exercices.filter((x) => x.type.id == id ).length;
  }

  progressLabel(exercice: Exercice) {
    return Exercice.getScore(exercice.questions) + '/' + exercice.questions.length
  }

  progressPourcent(exercice: Exercice) {
    return Exercice.getScore(exercice.questions)/exercice.questions.length * 100
  }

}
