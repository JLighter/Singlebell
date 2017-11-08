import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { ExercicesPage } from "../pages/exercices/exercices";
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from "@ionic/storage";
import { EloPage } from "../pages/elo/elo";
import {FormsModule} from "@angular/forms";
import {ProgressPage} from "../pages/progress/progress";
import {SlidesPage} from "../pages/slides/slides";
import { QuestionsPage } from "../pages/questions/questions";

import {ProgressBarComponent} from "../components/progress-bar/progress-bar";
import {ExtraPage} from "../pages/extra/extra";
import {GeneratorPage} from "../pages/generator/generator";
import {ResultatPage} from "../pages/resultat/resultat";

import {ExerciceGenerator} from "../utilities/exercice_generator";

import {ExerciceRepository} from "../repository/exercice_repository";
import {NoteRepository} from "../repository/note_repository";
import {UserRepository} from "../repository/user_repository";

@NgModule({
  declarations: [
    MyApp,
    SlidesPage,
    HomePage,
    EloPage,
    ProgressPage,
    ExercicesPage,
    ExtraPage,
    ProgressBarComponent,
    ProgressPage,
    QuestionsPage,
    GeneratorPage,
    ResultatPage,
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
    QuestionsPage,
    ExtraPage,
    GeneratorPage,
    ResultatPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ExerciceGenerator,
    ExerciceRepository,
    NoteRepository,
    UserRepository,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
