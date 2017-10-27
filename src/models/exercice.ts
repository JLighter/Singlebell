export class Exercice {

  constructor(
    public page: any,
    public icon: String,
    public name: String,
    public description: String,
    public type: String,
    public rank: Number = 0)
  {
    this.icon = icon;
    this.name = name;
    this.description = description;
    this.rank = rank;
    this.type = type;
    this.page = page
  }
}
