import {Component} from '@angular/core';
import {AlertController, NavController} from 'ionic-angular';

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

  constructor(public navCtrl: NavController, private alertCtrl: AlertController, private db: Database) {

  }

  public login() {
    const {username, password} = this.registerCredentials;

    this.db.getUser(username.toLowerCase()).then((data) => {
      // console.log(result);
      // const data = JSON.parse(result);
      console.log(data);

      const users = data.filter((user => {
        return user.username == username && user.password == password;
      }));

      console.log(users);

      if (users.length > 0) {
        this.navCtrl.setRoot(HomePage);
        return;
      }
      /*const rows = result.rows;

      if (rows && rows.length > 0) {
        const item = rows.item(0);

        if (username.toLowerCase() == item.username) {
          if (password == item.password) {
            this.navCtrl.setRoot(HomePage);
            return;
          }
        }
      }*/

      this.showError();
    });
  }

  showError() {
    this.alertCtrl.create({
      title: 'Oops:-(',
      subTitle: "The username or password that you have entered is invalid.",
      buttons: ["Ok"]
    }).present();
  }

}
