import {Component} from '@angular/core';
import {NavController, NavParams} from "ionic-angular";
import {HomePage} from "../home/home";
import Note from "../../models/Note";
import Database from "../../database/Database";

@Component({
  selector: 'note-home',
  styleUrls: ["note.scss"],
  templateUrl: 'note.html'
})
export class NotePage {
  note: Note;
  title: string;
  url: string;
  body: string;

  constructor(public navCtrl: NavController, private navParams: NavParams, private db: Database) {
    this.note = navParams.get("note");
    this.title = this.note.title;
    this.url = this.note.url;
    this.body = this.note.body;
  }

  back() {
    console.log('back');
    this.navCtrl.setRoot(HomePage);
  }

  onInputTitle(event: any) {
    console.log(event.value);
    this.note.title = event.value;
    this.db.updateNote(this.note);
  }

  onInputBody(event: any) {
    console.log(event.value);
    this.note.body = event.value;
    this.db.updateNote(this.note);
  }
}
