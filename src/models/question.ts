import { Note } from "./note";
import {Exercice} from "./exercice";
import {ExerciceType} from "./exercice_type";
import * as Constant from '../utilities/constants';

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

  public static labelForAnswer(type: ExerciceType, questionNotes: Array<Note>, answer: Note): string {
    if (type.id == Constant.exercice_id_type_relative) {
      return answer.position - questionNotes[0].position  + "/2"
    } else if (type.id == Constant.exercice_id_type_asolute) {
      return answer.name
    }
  }
}
