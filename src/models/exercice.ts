import {ExerciceType} from "./exercice_type";
import {Question} from "./question";

export class Exercice {

  constructor(
    public questions: Array<Question>,
    public date: number,
    public type: ExerciceType,
    public rank: number = 0)
  {
    this.questions = questions;
    this.date = date;
    this.type = type;
    this.rank = rank;
  }

  static getScore(questions: Array<Question>) {
    let score = 0;
    questions.forEach(function(question) {
      score += question.correct ? 1 : 0;
    });
    return score;
  }
}
