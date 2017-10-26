import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { ExercicesPage } from "../pages/exercices/exercices";
import { TabsPage } from '../pages/tabs/tabs';
import { ExeTemplate1Page } from "../pages/exe-template1/exe-template1";
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {NativeAudio} from "@ionic-native/native-audio";

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    AboutPage,
    ContactPage,
    HomePage,
    ExercicesPage,
    ExeTemplate1Page
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    AboutPage,
    ContactPage,
    HomePage,
    ExercicesPage,
    ExeTemplate1Page
  ],
  providers: [
    StatusBar,
    SplashScreen,
    NativeAudio,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
