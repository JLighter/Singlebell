import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ExerciceType} from "../../models/exercice_type";
import {Storage} from "@ionic/storage";
import { ExerciceRepository } from "../../repository/exercice_repository"
import { AlertController } from 'ionic-angular';
import { QuestionsPage } from '../questions/questions'

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
  providers: [ExerciceRepository]

})
export class ExercicesPage {

  public exercicesType: Array<ExerciceType>;
  public difficulty : number;
  public selectedType : ExerciceType;

  constructor(public navCtrl: NavController, public navParams: NavParams, public exerciceRepository: ExerciceRepository,public alertCtrl: AlertController) {

  this.exerciceRepository.getExerciceTypes().then((exTypes)=>{

      this.exercicesType = exTypes;
      console.log(this.exercicesType);
    }).catch((error)=>{

        alert(error);
    });

  }

  selectLevel(exTypeSelected : ExerciceType){

      let alert = this.alertCtrl.create();
      alert.setTitle('Selectionnez un niveau de difficulté');

      alert.addInput({
        type: 'radio',
        label: 'Facile',
        value: '0.25',
        checked: true
      });

      alert.addInput({
        type: 'radio',
        label: 'Moyen',
        value: '0.5',
        checked: false
      });


    alert.addInput({
        type: 'radio',
        label: 'Difficile',
        value: '0.75',
        checked: false
      });

      alert.addButton('Cancel');
      alert.addButton({
      text: 'OK',
      handler: data => {
        this.difficulty = data;
        this.navCtrl.push(QuestionsPage,{rank:this.difficulty,exercice_type:exTypeSelected})
      }
      });
      alert.present();
      }


  }
