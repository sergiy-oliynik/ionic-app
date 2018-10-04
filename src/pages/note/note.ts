import {Component} from '@angular/core';
import {NavController, NavParams} from "ionic-angular";
import {HomePage} from "../home/home";
import Note from "../../models/Note";
import Database from "../../database/Database";
import { ScannerPage } from "../scanner/scanner";
import {Camera, CameraOptions} from "@ionic-native/camera";

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

  constructor(public navCtrl: NavController, private navParams: NavParams, private db: Database, private camera: Camera) {
    this.note = this.navParams.get("note");
    this.title = this.note.title;
    this.url = this.note.url;
    this.body = this.note.body;

    const scanned = this.navParams.get("scanned");

    if (scanned == true) {
      this.db.updateNote(this.note);
    }
  }

  back() {
    this.navCtrl.setRoot(HomePage);
  }

  showScanner() {
    this.navCtrl.setRoot(ScannerPage, {
      note: this.note
    });
  }

  showCamera() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera
      .getPicture(options)
      .then(imageData => {
        this.note.images.push('data:image/jpeg;base64,' + imageData);
        this.db.updateNote(this.note);
      });
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
