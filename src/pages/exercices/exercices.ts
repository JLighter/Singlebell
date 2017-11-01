import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Categorie } from "../../models/categorie";
import { ExoCat } from "../../utilities/exo";


/**
 * Generated class for the ExercicesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-exercices',
  providers:[ExoCat],
  templateUrl: 'exercices.html',
})
export class ExercicesPage {

  categories

  constructor(public navCtrl: NavController, public navParams: NavParams,private exoCat: ExoCat ) {

    this.categories = exoCat.getCategories() ;
    console.log(this.categories);
  }
}
