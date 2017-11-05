import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ExerciceType} from "../../models/exercice_type";
import {Storage} from "@ionic/storage";
import { ExerciceRepository } from "../../repository/exercice_repository"
import { AlertController } from 'ionic-angular';


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

  constructor(public navCtrl: NavController, public navParams: NavParams, public exerciceRepository: ExerciceRepository,public alertCtrl: AlertController) {

  this.exerciceRepository.getExerciceTypes().then((exTypes)=>{

      this.exercicesType = exTypes;
      console.log(this.exercicesType);
    }).catch((error)=>{

        alert(error);
    });

  }

  selectLevel(){

      let alert = this.alertCtrl.create();
      alert.setTitle('Selectionnez un niveau de difficulté');

      alert.addInput({
        type: 'radio',
        label: 'Facile',
        value: '0',
        checked: true
      });

      alert.addInput({
        type: 'radio',
        label: 'Moyen',
        value: '1',
        checked: false
      });


    alert.addInput({
        type: 'radio',
        label: 'Difficile',
        value: '2',
        checked: false
      });

      alert.addButton('Cancel');
      alert.addButton({
      text: 'OK',
      handler: data => {
        let testRadioOpen = false;
        let testRadioResult = data;
        console.log(data);
      }
      });
      alert.present();
      }


  }
