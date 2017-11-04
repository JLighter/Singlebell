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
import {SlidesPage} from "../pages/slides/slides";
import { QuestionsPage } from "../pages/questions/questions";

import {ProgressBarComponent} from "../components/progress-bar/progress-bar";
import { UserRepository } from "../repository/user_repository";
import { ExerciceRepository } from "../repository/exercice_repository";
import { NoteRepository } from "../repository/note_repository";
import { ExerciceGenerator } from '../utilities/exercice_generator';


@NgModule({
  declarations: [
    MyApp,
    SlidesPage,
    HomePage,
    EloPage,
    ProgressPage,
    ExercicesPage,
    ProgressBarComponent,
    ProgressPage,
    QuestionsPage
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
    SlidesPage,
    HomePage,
    EloPage,
    ProgressPage,
    ExercicesPage,
    QuestionsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    NativeAudio,
    ExerciceGenerator,
    ExerciceRepository,
    NoteRepository,
    UserRepository,
    {provide: ErrorHandler, useClass: IonicErrorHandler},

  ]
})
export class AppModule {}
