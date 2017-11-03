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

@Component({
  templateUrl: 'app.html',
  providers: [UserRepository]
})
export class MyApp {
  rootPage:any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public storage: Storage, public userRepository: UserRepository) {

    this.populateStorage();

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

    let symphType = new ExerciceType(0, "Symphonique", "musical-note", "");
    let relType = new ExerciceType(2, "Relative", "eye", "");
    let absType = new ExerciceType(1, "Absolue", "eye-off", "");

    let types = [];

    types.push(symphType);
    types.push(relType);
    types.push(absType);

    _this.storage.set(Constant.db_exercice_type, types);

    var questions = [];
    for (var i=0; i<10;i++) {
      questions.push(new Question(3, 3, [], [], true))
    }

    console.log(questions);

    let exercices = [
      new Exercice(questions, new Date().getTime(), relType, 100),
      new Exercice([], new Date().getTime(), relType, 120),
      new Exercice([], new Date().getTime(), relType, 150)
    ];

    _this.storage.set(Constant.db_done_exercice, exercices);
  }
}
