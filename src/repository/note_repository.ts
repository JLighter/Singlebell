import * as Constant from "../utilities/constants";
import {Storage} from "@ionic/storage";
import {Injectable} from "@angular/core";
import {Note} from "../models/note";

@Injectable()
export class NoteRepository {

  constructor(private storage: Storage) {}

  getNotes() : Promise<any> {
    return this.storage.get(Constant.db_notes)
  }

  getNotesByPosition(positions: Array<number>) : Promise<Array<Note>> {
    let _this = this;
    return new Promise(function(resolve, reject) {
      _this.storage.get(Constant.db_notes).then(function(notes: Array<Note>) {

        notes = notes.filter((note) => {
          positions.forEach((position) =>{
            if (note.position === position){
              return true
            }
          });
          return false
        });

        resolve(notes);

      }, (error) => reject(error))
    });
  }

  getNotesByName(name: string) : Promise<Array<Note>> {
    let _this = this;
    return new Promise(function(resolve, reject) {

      _this.storage.get(Constant.db_notes).then(function(notes: Array<Note>) {

        resolve(notes.filter((note) => note.name === name))

      }, (error) => reject(error))

    });
  }

}
