import { Note } from "./note";

export class Question {

  constructor(
    public nbChoix: number,
    public range: number,
    public answers: Array<string>,
    public notes: Array<Note>,
    public correct: boolean,
    public reponse : Note
  )
  {
    this.nbChoix = nbChoix;
    this.range = range;
    this.answers = answers;
    this.notes = notes;
    this.correct = correct;
    this.reponse = reponse;

  }
}
