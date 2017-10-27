export class Categorie {

  constructor(
    public page: any,
    public name: String,
    public icon: String = '',
    public description: String = '',
    public type: String = 'primary')
  {
    this.icon = icon;
    this.name = name;
    this.page = page;
    this.description = description;
    this.type = type;
  }
}
