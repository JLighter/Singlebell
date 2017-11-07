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
  exercices : Array<Exercice> = [];
  exerciceTypes: Array<ExerciceType> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public userRepository: UserRepository, public exerciceRepository: ExerciceRepository) {
    let this_ = this;

    this_.userRepository.getUser().then((user) => this_.user = user);

    this_.exerciceRepository.getDoneExercices().then((exercices) => this_.exercices = exercices);

    this_.exerciceRepository.getExerciceTypes().then((types) => this_.exerciceTypes = types);

  }

  exercicesOfType(id: number): Array<Exercice> {
    if (!this.exercices || this.exercices.length == 0) return null;
    else return this.exercices.filter((x) => x.type.id == id );
  }

  nbOfExerciceOfType(id: number): number {
    if (!this.exercices || this.exercices.length == 0) return 0;
    return this.exercices.filter((x) => x.type.id == id ).length;
  }

  progressLabel(exercice: Exercice) {
    return Exercice.getScore(exercice.questions) + '/' + exercice.questions.length
  }

  progressPourcent(exercice: Exercice) {
    return Exercice.getScore(exercice.questions)/exercice.questions.length * 100
  }

}
