import { Injectable } from "@angular/core";

@Injectable()
export class Elo {

<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
  // TODO : There is upgrade to do before next push

>>>>>>> b8b8f8f9cdf03efc4a3b612e5c08080476e22820
>>>>>>> 947bbf5be6b988d773731315b98679064d8cce7d
  constructor() {}

  // Calcul de la probabilité de gagner du joueur P1
  expected(A: number, B: number): number {
<<<<<<< HEAD
    var exp = (B - A) / 400;
    return 1 / (1 + 10 ** exp);
=======
<<<<<<< HEAD
    var exp = (B - A) / 400;
    return 1 / (1 + 10 ** exp);
=======
    return 1 / (1 + 10 ** (B - A) / 400);
>>>>>>> b8b8f8f9cdf03efc4a3b612e5c08080476e22820
>>>>>>> 947bbf5be6b988d773731315b98679064d8cce7d
  }

  // Calcul de la nouvelle cote de P1
  calculElo(old: number, exp: number, score: number): number {
    return old + this.valeurK(old) * (score - exp);
  }

  // Calcule la valeur de K en fonction de la cote du joueur
  valeurK(elo: number): number {
<<<<<<< HEAD
    return 100;
=======
<<<<<<< HEAD
    return 100;
=======
    let k = 20;

    return k;
>>>>>>> b8b8f8f9cdf03efc4a3b612e5c08080476e22820
>>>>>>> 947bbf5be6b988d773731315b98679064d8cce7d
  }
}
