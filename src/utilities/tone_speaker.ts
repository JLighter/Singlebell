import {Injectable} from "@angular/core";
import Tone from 'tone';
import {Note} from "../models/note";

@Injectable()
export class Speaker {

  public synth = new Tone.Synth();

  constructor() {
    this.synth.toMaster();
  }

  playNote(note: Note) {
    this.synth.triggerAttackRelease(note.name, "0.8");
  }

  playInterval(interval: Array<Note>, delay = 800) {
    if (interval.length != 2) return;

    this.synth.triggerAttackRelease(interval[0].name, "0.8");
    setTimeout(()=> this.synth.triggerAttackRelease(interval[1].name, "0.8"), delay);
  }

  // Play an array of notes with a delay between each note
  /*static playChord(notes: Array<Note>, separetly: boolean) {
    let synths = new Tone.PolySynth(notes.length, Tone.Synth).toMaster();

    let noteNames: Array<string> = [];
    notes.forEach((note) => noteNames.push(note.name));

    if (!separetly) {

      let synth = new Tone.PolySynth(notes.length, Tone.Synth).toMaster();

      synth.triggerAttackRelease(noteNames, "1n")

    } else {

      let seq = new Tone.Sequence((time, note) => {
        synths.triggerAttackRelease(note)
      }, noteNames, "8n");
      seq.start(0);
      seq.stop('1m');
      Tone.Transport.start().stop('1m');
    }
  }*/

}
