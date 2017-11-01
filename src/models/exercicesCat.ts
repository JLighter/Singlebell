import { Exercice } from "./exercice";

export class ExercicesCat {

  constructor(
    public icon: String,
    public name: String,
    public description: String,
    public exercices: Exercice[])
  {
    this.icon = icon;
    this.name = name;
    this.description = description;
    this.exercices = exercices;
  }
}
