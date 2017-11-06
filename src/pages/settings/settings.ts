import { Component } from '@angular/core';
import {DateTime, IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {SettingRepository} from "../../repository/setting_repository";

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
  providers: [SettingRepository]
})
export class SettingsPage {

  public hour: DateTime;
  public notification: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public repo: SettingRepository, public toastCtrl: ToastController) {
    this.repo.getNotificationActive().then((active) => this.notification = active);
    this.repo.getNotificationHour().then((hour) => this.hour = hour);
  }

  save() {
    this.repo.setNotificationActive(this.notification);
    this.repo.setNotificationHour(this.hour);

    this.toastCtrl.create({
      message: 'Settings saved',
      duration: 2000
    }).present();
  }

}
