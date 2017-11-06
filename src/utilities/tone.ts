import {Injectable} from "@angular/core";
import Tone from 'tone';
import {Note} from "../models/note";

@Injectable()
export class ToneUtilities {

  constructor() {}

  playNote(note: Note) {
    let synth = new Tone.Synth().toMaster();
    synth.triggerAttackRelease(note.name, "1n");
  }

  playInterval(interval: Array<Note>, delay = 500) {
    if (interval.length != 2) return;

    let synths = new Tone.Synth(interval.length, Tone.Synth).toMaster();

    synths.triggerAttackRelease(interval[0].name, "1n");
    setTimeout(()=> synths.triggerAttackRelease(interval[1].name, "1n"), delay);
  }

  // Play an array of notes with a delay between each note
  playChord(notes: Array<Note>, separetly: boolean) {
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
  }



}
