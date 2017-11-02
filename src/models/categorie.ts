export class Categorie {

  constructor(
    public page: any,
    public name: string,
    public icon: string = '',
    public description: string = '',
    public type: string = 'primary')
  {
    this.icon = icon;
    this.name = name;
    this.page = page;
    this.description = description;
    this.type = type;
  }
}
