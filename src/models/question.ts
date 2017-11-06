import { Note } from "./note";

export class Question {

  constructor(
    public nbChoix: number,
    public range: number,
    public correctAnswer: Note,
    public notes: Array<Note>,
    public correct: boolean,
    public answers: Array<Note> = []
  )
  {
    this.nbChoix = nbChoix;
    this.range = range;
    this.correctAnswer = correctAnswer;
    this.notes = notes;
    this.correct = correct;
    this.answers = answers
  }
}
