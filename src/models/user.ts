export class User {
  name: String;
  level: Number;

  constructor(name: String = "Noname", level: Number = 1) {
    this.name = name;
    this.level = level;
  }
}
