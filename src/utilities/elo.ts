import { Injectable } from "@angular/core";

@Injectable()
export class Elo {

  constructor() {}

  // Calcul de la probabilité de gagner du joueur P1
  expected(A: number, B: number): number {
    let exp: number = (B - A) / 400;
    let res: number = 1 / (1 + 10 ** exp);
    return res;
  }

  // Calcul de la nouvelle cote de P1
  calculElo(old: number, exp: number, score: number, k: number = this.kValue(old)): number {
    // +old because if not, this variable is cast to string
    old = +old;
    var newElo: number = old + k * (score - exp);

    if (newElo < 100) {
      newElo = 100;
    }

    return newElo;

  }

  // Calcule la valeur de K en fonction de la cote du joueur
  kValue(elo: number): number {
    return 100;
  }
}
