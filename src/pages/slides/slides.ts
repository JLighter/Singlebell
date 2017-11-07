import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ExerciceType } from '../../models/exercice_type';
import { QuestionsPage } from '../questions/questions';




/**
 * Generated class for the SlidesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-slides',
  templateUrl: 'slides.html',
})
export class SlidesPage {

  @ViewChild(Slides) slides: Slides;
  exType : ExerciceType ;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.exType = new ExerciceType(0, "Intervale", "musical-note", "Identifiez l'interval joué");

  }

  goToTest() {
    this.navCtrl.push(QuestionsPage,{rank:0.5,exercice_type:this.exType,test:true});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SlidesPage');
  }

}
