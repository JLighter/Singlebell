import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ExercicesCat } from "../../models/exercicesCat";

/**
 * Generated class for the ExercicesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-exercices',
  templateUrl: 'exercices.html',
})
export class ExercicesPage {

  public categories : Array<ExercicesCat>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.categories = [];

    this.categories.push(new ExercicesCat(
      'icon',
      'Identification de notes',
      'Trouvez la note jouez',
      [])
    )
  }
}
