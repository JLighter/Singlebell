import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NativeAudio } from "@ionic-native/native-audio";

/**
 * Generated class for the ExeTemplate1Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-exe-template1',
  templateUrl: 'exe-template1.html',
})
export class ExeTemplate1Page {

  private do_unique_id = 'do_sound';

  constructor(public navCtrl: NavController, public navParams: NavParams, private audio: NativeAudio) {
  }

  ionViewDidLoad() {
    console.log(this.audio);
    this.audio.preloadSimple(this.do_unique_id, '../assets/audio/do_sound.mp3');
  }

  playSound() {
    this.audio.play(this.do_unique_id, () => {
      console.log('info', 'audio is done playing');
    }).then((success)=> {
      console.log('success', success);
      console.log('info', 'audio is playing');
    }, (error) => {
      console.log('rejected', error);
    })
  }

}
