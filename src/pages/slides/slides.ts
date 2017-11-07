import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
import { HomePage } from '../home/home';
import {UserRepository} from "../../repository/user_repository";
import {User} from "../../models/user";


/**
 * Generated class for the SlidesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-slides',
  templateUrl: 'slides.html',
  providers: [UserRepository]
})
export class SlidesPage {

  @ViewChild(Slides) slides: Slides;

  userName: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public userRepository: UserRepository) {
  }

  exit() {
    this.userRepository.setUser(new User(this.userName)).then(() => {
      this.navCtrl.push(HomePage);
    });
  }

}
