import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Categorie } from "../../models/categorie";
import { ExercicesPage } from "../exercices/exercices";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  categories: Array<Categorie>;

  exercicePage = ExercicesPage;

  constructor(public navCtrl: NavController) {
    this.categories = [];

    this.categories.push(new Categorie(
      null,
      'Au programme',
      'easel',
      '10 exercices spécialement choisient pour vous !',
      'primary'
    ));

    this.categories.push(new Categorie(
      this.exercicePage,
      'Exercices',
      'bulb',
      'Tous les exercices que vous pouvez débloqués !',
      'primary'
    ));

    this.categories.push(new Categorie(
      null,
      'Progression',
      'podium',
      'Les statistique sur votre progression.',
      'primary'
    ));

    this.categories.push(new Categorie(
      null,
      'Extra',
      'game-controller-a',
      'Des jeux à faire tout le temps !',
      'primary'
    ));
  }

}
