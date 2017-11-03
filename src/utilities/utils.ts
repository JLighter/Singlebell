export class Utils {

  static generateRandomInteger(min, max) {
    return Math.floor(max - Math.random()*(max-min))
  }

}
