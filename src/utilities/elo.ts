export class Elo {

  constructor() {}

  // Calcul de la probabilité de gagner du joueur P1
  static expected(A: number, B: number): number {
    let exp: number = (B - A) / 400;
    return 1 / (1 + 10 ** exp);
  }

  // Calcul de la nouvelle cote de P1
  static calculElo(old: number, exp: number, score: number, k: number =  this.kValue(old)): number {
    // +old because if not, this variable is cast to string
    old = +old;
    var newElo: number = old + k * (score - exp);

    if (newElo < 100) {
      newElo = 100;
    }

    return newElo;

  }

  // Calcule la valeur de K en fonction de la cote du joueur
  static kValue(elo: number): number {
    return 100;
  }

  static rankByDifficulty(userLevel : number , difficulty : number) {
    var rank = (userLevel * Math.log(10) + 400 * Math.log(-(difficulty-1)/difficulty))/Math.log(10);

    if (rank > 1000) rank = 1000;
    if (rank < 1) rank = 1;

    return rank
  }
}
