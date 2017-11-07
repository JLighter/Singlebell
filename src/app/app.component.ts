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
      new Note("A1", 1),
      new Note("Bb1", 2),
      new Note("B1", 3),
      new Note("C2", 4),
      new Note("Db2", 5),
      new Note("D2", 6),
      new Note("Eb2", 7),
      new Note("E2", 8),
      new Note("F2", 9),
      new Note("Gb2", 10),
      new Note("G2", 11),
      new Note("Ab2", 12),
      new Note("A2", 13),
      new Note("Bb2", 14),
      new Note("B2", 15),
      new Note("C3", 16),
      new Note("Db3", 17),
      new Note("D3", 18),
      new Note("Eb3", 19),
      new Note("E3", 20),
      new Note("F3", 21),
      new Note("Gb3", 22),
      new Note("G3", 23),
      new Note("Ab3", 24),
      new Note("A3", 25),
      new Note("Bb3", 26),
      new Note("B3", 27),
      new Note("C4", 28),
      new Note("Db4", 29),
      new Note("D4", 30),
      new Note("Eb4", 31),
      new Note("E4", 32),
      new Note("F4", 33),
      new Note("Gb4", 34),
      new Note("G4", 35),
      new Note("Ab4", 36),
      new Note("A4", 37),
      new Note("Bb4", 38),
      new Note("B4", 39),
      new Note("C5", 40),
      new Note("Db5", 41),
      new Note("D5", 42),
      new Note("Eb5", 43),
      new Note("E5", 44),
      new Note("F5", 45),
      new Note("Gb5", 46),
      new Note("G5", 47),
      new Note("Ab5", 48),
      new Note("A5", 49),
      new Note("Bb5", 50),
      new Note("B5", 51),
      new Note("C6", 52),
      new Note("Db6", 53),
      new Note("D6", 54),
      new Note("Eb6", 55),
      new Note("E6", 56),
      new Note("F6", 57),
      new Note("Gb6", 58),
      new Note("G6", 59),
      new Note("Ab6", 60),
      new Note("A6", 61),
      new Note("Bb6", 62),
      new Note("B6", 63),
      new Note("C7", 64)
    ]).catch((error) => console.error(error));
  }
}
