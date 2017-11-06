import * as Constant from "../utilities/constants";
import {Storage} from "@ionic/storage";
import {Injectable} from "@angular/core";
import {DateTime} from "ionic-angular";

@Injectable()
export class SettingRepository {

  constructor(private storage: Storage) {}

  getNotificationActive(): Promise<any> {
    return this.storage.get(Constant.settings_notification_active)
  }

  getNotificationHour(): Promise<any> {
    return this.storage.get(Constant.settings_notification_hour)
  }

  setNotificationActive(bool: boolean) : Promise<any> {
    return this.storage.set(Constant.settings_notification_active, bool)
  }

  setNotificationHour(hour: DateTime) : Promise<any> {
    return this.storage.set(Constant.settings_notification_hour, hour)
  }

}
