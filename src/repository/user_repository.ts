import * as Constant from "../utilities/constants";
import {Storage} from "@ionic/storage";
import {Injectable} from "@angular/core";

@Injectable()
export class UserRepository {

  constructor(private storage: Storage) {}

  getUser() {
    return this.storage.get(Constant.db_user_key)
  }

}
