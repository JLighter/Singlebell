import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ExerciceGenerator} from "../../utilities/exercice_generator";
import {Exercice} from "../../models/exercice";
import {Note} from "../../models/note";
import Tone from 'tone';
/**
 * Generated class for the GeneratorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-generator',
  templateUrl: 'generator.html',
  providers: [ExerciceGenerator]
})
export class GeneratorPage {

  private exercice: Exercice;

  private notes: Array<Note>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public generator: ExerciceGenerator) {

  }

  generateExercice() {

    this.generator.newExercice(1).then((exercice)=> {
      this.exercice = exercice;
      console.log(exercice);
    }, (error) => console.error(error))
  }

  generateQuestion() {

    this.generator.newQuestion(this.exercice).then((question)=> {
      this.exercice.questions.push(question);
      console.log(question);
      this.notes = question.notes;
    }, (error) => console.error(error))
  }

  generateSound(tone, height) {
    let synth = new Tone.Synth().toMaster();
    console.log(synth);

    if (tone) {
      synth.triggerAttackRelease(tone+height, "8n")
    } else {
      let timeout = 500;

      setTimeout(()=>{
        synth.triggerAttackRelease(this.notes[0].name, "8n")

        setTimeout(()=>{
          synth.triggerAttackRelease(this.notes[1].name, "8n")

          setTimeout(()=>{
            synth.triggerAttackRelease(this.notes[2].name, "8n")
          }, timeout)

        }, timeout)

      }, timeout);

    }


  }

}
