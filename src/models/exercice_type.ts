export class ExerciceType {

  selected: boolean = false;

  constructor(
    public id: number,
    public name: string,
    public icon: string,
    public description: string)
  {
    this.id = id;
    this.icon = icon;
    this.name = name;
    this.description = description;
  }
}
