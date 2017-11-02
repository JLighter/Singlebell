import {ExerciceType} from "./exercice_type";

export class Exercice {

  constructor(
    public score: number,
    public questions: number,
    public date: number,
    public type: ExerciceType,
    public rank: number = 0)
  {
    this.score = score;
    this.questions = questions;
    this.date = date;
    this.type = type;
    this.rank = rank;
  }
}
