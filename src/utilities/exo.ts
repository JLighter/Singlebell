import { Injectable } from "@angular/core";
import { ExercicesCat } from "../models/exercicesCat";
import { Exercice } from "../models/exercice";
import { Notes } from "../models/notes";


@Injectable()
export class ExoCat {
  notes : Notes[];

  constructor() {

  }
  generateNotesExo(level: number): Array<Exercice> {

    return ;
  }
}
