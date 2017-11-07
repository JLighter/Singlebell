import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import {HomePage} from "../pages/home/home";
import {SlidesPage} from "../pages/slides/slides";
import {User} from "../models/user";
import {ExerciceType} from "../models/exercice_type";
import {UserRepository} from "../repository/user_repository";

import {Storage} from "@ionic/storage";

import * as Constant from '../utilities/constants';
import {Note} from "../models/note";
import {ExerciceRepository} from "../repository/exercice_repository";

@Component({
  templateUrl: 'app.html',
  providers: [UserRepository, ExerciceRepository]
})
export class MyApp {

  rootPage:any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public storage: Storage, public userRepository: UserRepository) {

    let this_ = this;

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      this_.populateStorage().then(() => {

        return this_.populateStorageWithNotes();

      }).then(() => {

        return this_.firstTimeLaunched();

      }, error => console.error(error));

      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  firstTimeLaunched(): Promise<any> {
    let _this = this;

    return _this.userRepository.getUser().then(function(user) {

      _this.rootPage = HomePage;

      if (!user) {
        let user = new User();
        _this.userRepository.setUser(user);
        _this.rootPage = SlidesPage;
      }

    }, (error) => console.log(error))

  }

  populateStorage(): Promise<any> {
    let _this = this;

    let symphType = new ExerciceType(0, "Intervale", "musical-note", "Identifiez l'interval joué");
    let absType = new ExerciceType(1, "Absolue", "eye-off", "Identifiez la note joué");

    let types = [];

    types.push(symphType);
    types.push(absType);

    return _this.storage.set(Constant.db_exercice_type, types).catch((error) => console.error(error));
  }

  populateStorageWithNotes(): Promise<any> {
    return this.storage.set(Constant.db_notes,[
      new Note("C2", 1),
      new Note("Db2", 2),
      new Note("D2", 3),
      new Note("Eb2", 4),
      new Note("E2", 5),
      new Note("F2", 6),
      new Note("Gb2", 7),
      new Note("G2", 8),
      new Note("Ab2", 9),
      new Note("A2", 10),
      new Note("Bb2", 11),
      new Note("B2", 12),
      new Note("C3", 13),
      new Note("Db3", 14),
      new Note("D3", 15),
      new Note("Eb3", 16),
      new Note("E3", 17),
      new Note("F3", 18),
      new Note("Gb3", 19),
      new Note("G3", 20),
      new Note("Ab3", 21),
      new Note("A3", 22),
      new Note("Bb3", 23),
      new Note("B3", 24),
      new Note("C4", 25),
      new Note("Db4", 27),
      new Note("D4", 28),
      new Note("Eb4", 29),
      new Note("E4", 30),
      new Note("F4", 31),
      new Note("Gb4", 32),
      new Note("G4", 33),
      new Note("Ab4", 34),
      new Note("A4", 35),
      new Note("Bb4", 36),
      new Note("B4", 37),
      new Note("C5", 38),
      new Note("Db5", 39),
      new Note("D5", 40),
      new Note("Eb5", 41),
      new Note("E5", 42),
      new Note("F5", 43),
      new Note("Gb5", 44),
      new Note("G5", 45),
      new Note("Ab5", 46),
      new Note("A5", 47),
      new Note("Bb5", 48),
      new Note("B5", 49)
    ]).catch((error) => console.error(error));
  }
}
