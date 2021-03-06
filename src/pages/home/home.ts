import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { Categorie } from "../../models/categorie";

import { ExercicesPage } from "../exercices/exercices";
import { QuestionsPage } from "../questions/questions"
import {ProgressPage} from "../progress/progress";
import {ExtraPage} from "../extra/extra";
import {ExerciceRepository} from "../../repository/exercice_repository";
import {Exercice} from "../../models/exercice";
import {Utils} from "../../utilities/utils";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [ExerciceRepository]
})
export class HomePage {

  public categories: Array<Categorie>;
  public programLocked: boolean = false;
  public lockTimer: number;

  constructor(public navCtrl: NavController, public repo: ExerciceRepository) {
    this.categories = [];

    let this_ = this;

    // Verify if the user can go to programme
    this.repo.getTimeBeforeNextProgramme().then((time) => {

      if (time) {
        time = Date.parse(time);
        let today = Date.now();

        this_.programLocked = time > today;

        this_.lockTimer = time;
      }

      this.initCategories();

    });

  }

  initCategories() {

    this.categories.push(new Categorie(
      null,
      'Programme',
      'easel',
      "Un exercice spécialement choisi pour vous !",
      this.programLocked ? 'grey' : 'primary'
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
      'Les statistiques de votre progression.',
      'primary'
    ));

    this.categories.push(new Categorie(
      ExtraPage,
      'Extra',
      'game-controller-a',
      'Des jeux bonus !',
      'primary'
    ));
  }

  pushFor(categorie: Categorie) {
    if (categorie.name == 'Programme') {
      if (!this.programLocked) this.launchProgramme()
    } else {
      this.navCtrl.push(categorie.page);
    }
  }

  launchProgramme() {

    let rand = Math.random();

    var rank = rand;

    this.repo.getLastDoneExercice().then(exercice => {
      let typeId = 0;

      if (exercice) {
        if (exercice.type.id == 0 && rand > 0.75) typeId = 1;
        if (exercice.type.id == 1 && rand > 0.75) typeId = 0;

        let indice = Exercice.getScore(exercice.questions)/ exercice.questions.length;

        if ( indice < 0.5 ) rank = 0.25;
        else if ( indice < 0.75 ) rank = 0.5;
        else rank = 1;
      }

      return this.repo.getExerciceType(typeId)

    }).then(type => {

      this.navCtrl.push(QuestionsPage,{
        difficulty:rank,
        exercice_type:type,
        is_program:true,
        selected_intervals:[Utils.generateRandomInteger(2,9)]
      })

    })
  }

}
