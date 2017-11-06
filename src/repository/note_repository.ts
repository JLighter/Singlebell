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

        notes = notes.filter((note) => positions.filter((position) => note.position == position).length != 0);

        resolve(notes);

      }, (error) => reject(error))
    });
  }

  getNotesByName(names: Array<string>) : Promise<Array<Note>> {
    let _this = this;
    return new Promise(function(resolve, reject) {

      _this.storage.get(Constant.db_notes).then(function(notes: Array<Note>) {

        notes = notes.filter((note) => names.filter((name) => note.name == name).length != 0);

        resolve(notes);

      }, (error) => reject(error))

    });
  }

}
