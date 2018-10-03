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

    this.db.getUser(username).then((result) => {
      const rows = result.rows;

      if (rows && rows.length > 0) {
        const item = rows.item(0);

        if (username == item.username) {
          if (password == item.password) {
            this.navCtrl.setRoot(HomePage);
          }
        }
      }
    });
  }

}
