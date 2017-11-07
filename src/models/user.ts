export class User {
  constructor(public name: string = "NoName", public level: number = 1) {
    this.name = name;
    this.level = level;
  }
}
