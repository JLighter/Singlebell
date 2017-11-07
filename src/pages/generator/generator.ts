import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ExerciceGenerator} from "../../utilities/exercice_generator";
import {Exercice} from "../../models/exercice";
import {Note} from "../../models/note";
import Tone, {default as tone} from 'tone';
import {ToneSpeaker} from "../../utilities/tone";
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
  providers: [ExerciceGenerator, ToneSpeaker]
})
export class GeneratorPage {

  private exercice: Exercice;
  private question: Question;

  private notes: Array<Note>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public generator: ExerciceGenerator, private speaker: ToneSpeaker) {

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
      this.notes = question.notes;

      console.log(question)
    }, (error) => console.error(error))
  }

  playExercice() {
    let synth = new Tone.Synth().toMaster();

    if (this.exercice.type.id == 0) {
      this.speaker.playInterval(this.question.notes);
    } else {
      this.speaker.playChord(this.question.notes, false);
    }
  }

  playTone(tone = "C", height = 4) {
    let synth = new Tone.Synth().toMaster();

    synth.triggerAttackRelease(tone+height, "8n")

  }

}
