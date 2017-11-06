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
  user : User ;


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
      if (!user) {
         _this.user = new User('Julien', 500);
         _this.storage.set(Constant.db_user_key,_this.user);
        _this.rootPage = SlidesPage;

      } else {
        _this.user = user;
        _this.rootPage = HomePage;

      }
    });
  }

  populateStorage() {
    let _this = this;

    //_this.storage.clear();
    console.log('user populate storage');
    console.log(_this.user)
    _this.storage.set(Constant.db_user_key,_this.user);
    _this.storage.set(Constant.db_done_exercice, []);


    let symphType = new ExerciceType(0, "Intervale", "musical-note", "Identifiez l'interval joué");
    let absType = new ExerciceType(1, "Absolue", "eye-off", "Identifiez la note joué");

    let types = [];

    types.push(symphType);
    types.push(absType);

    _this.storage.set(Constant.db_exercice_type, types).catch((error) => console.error(error));
  }

  populateStorageWithNotes() {
    this.storage.set(Constant.db_notes,[
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
