export class Exercice {
  icon: String;
  name: String;
  description: String;
  rank: Number;
  type: String;
  page: any;

  constructor(page: any, icon: String, name: String, description: String, type: String, rank: Number = 0) {
    this.icon = icon;
    this.name = name;
    this.description = description;
    this.rank = rank;
    this.type = type;
    this.page = page
  }
}
