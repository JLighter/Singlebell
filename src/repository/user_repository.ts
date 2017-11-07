import * as Constant from "../utilities/constants";
import {Storage} from "@ionic/storage";
import {Injectable} from "@angular/core";
import { User } from "../models/user";


@Injectable()
export class UserRepository {
  user : User ;
  constructor(private storage: Storage) {}

  getUser() {
    return this.storage.get(Constant.db_user_key)
  }
  setNewLevel(newLevel : number, userName: string){
    if (newLevel <= 0) newLevel = 0;
    if (newLevel >= 1000) newLevel = 1000;
    this.storage.remove(Constant.db_user_key).then(()=>{
      this.user = new User(userName,newLevel);
      this.storage.set(Constant.db_user_key,this.user).then(()=>{
        console.log(this.storage.get(Constant.db_user_key));
      });
    });
  }

}
