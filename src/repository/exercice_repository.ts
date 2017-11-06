import {Storage} from "@ionic/storage";
import * as Constant from "../utilities/constants";
import {Injectable} from "@angular/core";
import {Exercice} from "../models/exercice";
import {ExerciceType} from "../models/exercice_type";


@Injectable()
export class ExerciceRepository {

  constructor(private storage: Storage) {}

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
      }, (error) => reject(error))

    });

  }

  getExerciceTypes(): Promise<Array<ExerciceType>> {
    return this.storage.get(Constant.db_exercice_type);
  }

  getExerciceType(id: number): Promise<ExerciceType> {
    let _this = this;

    return new Promise(function(resolve, reject) {

      _this.getExerciceTypes().then(function(exerciceTypes) {

        let exercices = exerciceTypes.filter((x) => x.id == id);

        console.log(exerciceTypes);

        if (exercices[0]) {
          resolve(exercices[0]);
        } else {
          reject("No type with id " + id);
        }

      }, (error) => reject(error));
    });
  }

  addDoneExercice(exercice: Exercice): Promise<any> {
    let _this = this;

    return new Promise(function(resolve, reject) {
      _this.getDoneExercices().then(function(exercices) {
        console.log(exercices);
       exercices.push(exercice);
        _this.storage.set(Constant.db_done_exercice, exercices).then(function(){

          resolve(exercices)

        }, function(error) {

          reject(error);
        });

      }, (error) => reject(error));
    })

  }
}
