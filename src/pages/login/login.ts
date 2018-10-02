import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

import {HomePage} from "../home/home";
import Database from "../../database/Database";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  registerCredentials = {
    username: '',
    password: ''
  };

  constructor(public navCtrl: NavController, private db: Database) {

  }

  public login() {
    const {username, password} = this.registerCredentials;

    console.log(this.db.getUser(username));

    // this.storage.get('username').then(_username => {
    //   if (username == _username) {

        // this.storage.get('password').then(_password => {
        //   if (password == _password) {
        //     this.navCtrl.setRoot(HomePage);
        //   }
        // });
      // }
    // });
  }

}
