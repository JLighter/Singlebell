export class Exercice {

  constructor(
    public name: String,
    public description: String,
    public type: String,
    public choiceNb : Number,
    public question: String,
    public rank: Number = 0)
  {
    this.name = name;
    this.description = description;
    this.question = question;
    this.choiceNb = choiceNb;
    this.rank = rank;
    this.type = type;
  }
}
