import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ExerciceGenerator} from "../../utilities/exercice_generator";
import {Exercice} from "../../models/exercice";
import Tone, {default as tone} from 'tone';
import {Speaker} from "../../utilities/tone_speaker";
import {Question} from "../../models/question";

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
  providers: [ExerciceGenerator, Speaker]
})
export class GeneratorPage {

  private exercice: Exercice;
  private question: Question;

  constructor(public navCtrl: NavController, public navParams: NavParams, public generator: ExerciceGenerator) {

  }

  generateExercice() {
    this.generator.newExercice(0, 0.5).then((exercice)=> {
      this.exercice = exercice;
      console.log(exercice);
    }, (error) => console.error(error))
  }

  generateQuestion() {

    this.generator.newQuestion(this.exercice).then((question)=> {
      this.exercice.questions.push(question);
      this.question = question;

      console.log(question)
    }, (error) => console.error(error))
  }

  playExercice() {
    let synth = new Tone.Synth().toMaster();

    if (this.exercice.type.id == 0) {
      Speaker.playInterval(this.question.notes);
    } else {
      Speaker.playChord(this.question.notes, false);
    }
  }

  static playTone(tone = "C", height = 4) {
    let synth = new Tone.Synth().toMaster();

    synth.triggerAttackRelease(tone+height, "8n")

  }

}
