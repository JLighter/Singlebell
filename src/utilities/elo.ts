import { Injectable } from "@angular/core";

@Injectable()
export class Elo {

  constructor() {}

  // Calcul de la probabilité de gagner du joueur P1
  expected(A: number, B: number): number {
    var exp = (B - A) / 400;
    return 1 / (1 + 10 ** exp);
  }

  // Calcul de la nouvelle cote de P1
  calculElo(old: number, exp: number, score: number): number {
    return old + this.valeurK(old) * (score - exp);
  }

  // Calcule la valeur de K en fonction de la cote du joueur
  valeurK(elo: number): number {
    return 100;
  }
}
