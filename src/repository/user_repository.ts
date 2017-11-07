import * as Constant from "../utilities/constants";
import {Storage} from "@ionic/storage";
import {Injectable} from "@angular/core";
import { User } from "../models/user";


@Injectable()
export class UserRepository {

  constructor(private storage: Storage) {}

  getUser(): Promise<any> {
    return this.storage.get(Constant.db_user_key);
  }

  setUser(user:User): Promise<any> {
    return this.storage.set(Constant.db_user_key, user);
  }

  setNewLevel(newLevel : number): Promise<any>{
    if (newLevel <= 1) newLevel = 1;
    if (newLevel >= 1000) newLevel = 1000;

    return this.storage.get(Constant.db_user_key).then((user) => {

      user = new User(user.name, newLevel);

      return this.storage.set(Constant.db_user_key, user)
    })


  }

}
