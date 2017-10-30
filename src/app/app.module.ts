import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { ExercicesPage } from "../pages/exercices/exercices";
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NativeAudio } from "@ionic-native/native-audio";
import { IonicStorageModule } from "@ionic/storage";
import { EloPage } from "../pages/elo/elo";
import {FormsModule} from "@angular/forms";
import {ProgressPage} from "../pages/progress/progress";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    EloPage,
    ProgressPage,
    ExercicesPage
  ],
  imports: [
    BrowserModule,
    FormsModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot({
      name: '__singledb',
      driverOrder: ['indexeddb', 'sqlite', 'websql']
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    EloPage,
    ProgressPage,
    ExercicesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    NativeAudio,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
