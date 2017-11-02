import { Note } from "./note";

export class Question {

  constructor(
    public label: string,
    public nbChoix: number,
    public answers : Array<string>,
    public note: Note,
    public position : number
  )
  {
    this.label = label;
    this.nbChoix = nbChoix;
    this.answers = answers;
    this.note = note;
    this.position = position;
  }
}
