import { Injectable } from "@angular/core";
import { Categorie } from "../models/categorie";
import { Exercices } from "../models/exercices";
import { Notes } from "../models/notes";


@Injectable()
export class ExoCat {

  categorie : Array<Categorie>
  exercices : Array<Exercices>

  constructor() {

    this.categorie = [new Categorie('NotesID','Identification de Notes','icon','Identifiez les notes jouées'),
                      new Categorie('IntervallesID','Identification d\'intervalles','icon','Identifiez les Intervales jouées')];

    this.exercices = [new Exercices('1.1','Notes X par rapport à notes Y','NotesID','Exo'),
    new Exercices('2.1','Intervalles de mort','IntervallesID','Exo'),
    new Exercices('1.1','Notes X par rapport à notes Y','NotesID','Exo')]
  }

  getCategories():Array<Categorie>{

    return this.categorie;
  }

  getExercices(categorieName : String):Array<Exercices>{
    let exoByCat = [];
    this.exercices.forEach(function(element){
      if(element.categorieName && element.categorieName == categorieName ){
        exoByCat.push(element);
      }
    });
    return exoByCat;
  }

}
