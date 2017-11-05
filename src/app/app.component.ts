import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import {HomePage} from "../pages/home/home";
import {SlidesPage} from "../pages/slides/slides";
import {User} from "../models/user";
import {ExerciceType} from "../models/exercice_type";
import {Exercice} from "../models/exercice";
import {UserRepository} from "../repository/user_repository";

import {Storage} from "@ionic/storage";

import * as Constant from '../utilities/constants';
import {Question} from "../models/question";
import {Note} from "../models/note";

@Component({
  templateUrl: 'app.html',
  providers: [UserRepository]
})
export class MyApp {
  rootPage:any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public storage: Storage, public userRepository: UserRepository) {

    this.populateStorage();
    this.populateStorageWithNotes();

    this.firstTimeLaunched();

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  firstTimeLaunched() {
    let _this = this;

    _this.userRepository.getUser().then(function(user) {

      console.log(user);

      if (!user) {

        _this.rootPage = SlidesPage;

      } else {

        _this.rootPage = HomePage;

      }
    });
  }

  populateStorage() {
    let _this = this;

    _this.storage.clear();

    let user = new User('Julien', 500);

    _this.storage.set(Constant.db_user_key, user);

    let symphType = new ExerciceType(0, "Symphonique", "musical-note", "Ennoncé");
    let relType = new ExerciceType(2, "Relative", "eye", "Ennoncé");
    let absType = new ExerciceType(1, "Absolue", "eye-off", "Ennoncé");

    let types = [];

    types.push(symphType);
    types.push(relType);
    types.push(absType);

    _this.storage.set(Constant.db_exercice_type, types).catch((error) => console.error(error));
  }

  populateStorageWithNotes() {
    this.storage.set(Constant.db_notes,[
      new Note("A", 1),
      new Note("Bb", 2),
      new Note("B", 3),
      new Note("C", 4),
      new Note("Db", 5),
      new Note("D", 6),
      new Note("Eb", 7),
      new Note("E", 8),
      new Note("F", 9),
      new Note("Gb", 10),
      new Note("G", 11),
      new Note("Ab", 12),
      new Note("A", 13),
      new Note("Bb", 14),
      new Note("B", 15),
      new Note("C", 16),
      new Note("Db", 17),
      new Note("D", 18),
      new Note("Eb", 19),
      new Note("E", 20),
      new Note("F", 21),
      new Note("Gb", 22),
      new Note("G", 23),
      new Note("Ab", 24),
      new Note("A", 25),
      new Note("Bb", 26),
      new Note("B", 27),
      new Note("C", 28),
      new Note("Db", 29),
      new Note("D", 30),
      new Note("Eb", 31),
      new Note("E", 32),
      new Note("F", 33),
      new Note("Gb", 34),
      new Note("G", 35),
      new Note("Ab", 36),
      new Note("A", 37),
      new Note("Bb", 38),
      new Note("B", 39),
      new Note("C", 40),
      new Note("Db", 41),
      new Note("D", 42),
      new Note("Eb", 43),
      new Note("E", 44),
      new Note("F", 45),
      new Note("Gb", 46),
      new Note("G", 47),
      new Note("Ab", 48),
      new Note("A", 49),
      new Note("Bb", 50),
      new Note("B", 51),
      new Note("C", 52),
      new Note("Db", 53),
      new Note("D", 54),
      new Note("Eb", 55),
      new Note("E", 56),
      new Note("F", 57),
      new Note("Gb", 58),
      new Note("G", 59),
      new Note("Ab", 60),
      new Note("A", 61),
      new Note("Bb", 62),
      new Note("B", 63),
      new Note("C", 64)
    ]).catch((error) => console.error(error));
  }
}
