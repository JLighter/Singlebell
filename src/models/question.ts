import { Note } from "./note";

export class Question {

  constructor(
    public nbChoix: number,
    public range: number,
    public answer: Note,
    public notes: Array<Note>,
    public correct: boolean
  )
  {
    this.nbChoix = nbChoix;
    this.range = range;
    this.answer = answer;
    this.notes = notes;
    this.correct = correct;
  }
}
