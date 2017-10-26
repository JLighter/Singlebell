export class Categorie {
  icon: String;
  name: String;
  description: String;
  page: any;
  type: String;

  constructor(page: any, name: String, icon: String = '', description: String = '', type: String = 'primary') {
    this.icon = icon;
    this.name = name;
    this.page = page;
    this.description = description;
    this.type = type;
  }
}
