import {Storage} from "@ionic/storage";
import * as Constant from "../utilities/constants";
import {Injectable} from "@angular/core";


@Injectable()
export class ExerciceRepository {

  constructor(public storage: Storage) {}

  getDoneExercices(): Promise<any> {
    return this.storage.get(Constant.db_done_exercice)
  }

  getDoneExercicesOfType(id: number): Promise<any> {

    let _this = this;

    return new Promise(function(resolve, reject) {

      _this.getDoneExercices().then(function(exercices) {

        exercices = exercices.filter(function(x) {
          return x.type.id == id
        });

        resolve(exercices);
      }, function(error) {

        reject(error)
      })

    });

  }

  getExerciceTypes(): Promise<any> {
    return this.storage.get(Constant.db_exercice_type)
  }
}
