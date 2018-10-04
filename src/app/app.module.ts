import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { NotePage } from '../pages/note/note';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';
import { SQLite } from "@ionic-native/sqlite";
import Database from "../database/Database";
import {QRScanner} from "@ionic-native/qr-scanner";
import {ScannerPage} from "../pages/scanner/scanner";
import {Camera} from "@ionic-native/camera";
import {ImagePage} from "../pages/image/image";

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    // AboutPage,
    // ContactPage,
    HomePage,
    ImagePage,
    ScannerPage,
    NotePage
    // TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot({
      name: 'default',
      driverOrder: ['sqlite', 'websql']
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    // AboutPage,
    // ContactPage,
    HomePage,
    ScannerPage,
    ImagePage,
    NotePage
    // TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Storage,
    // SQLite,
    QRScanner,
    Camera,
    Database,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
