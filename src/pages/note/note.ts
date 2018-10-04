import {Component, NgZone} from '@angular/core';
import {AlertController, NavController, NavParams, Platform} from "ionic-angular";
import {HomePage} from "../home/home";
import Note from "../../models/Note";
import Database from "../../database/Database";
import { ScannerPage } from "../scanner/scanner";
import {Camera, CameraOptions} from "@ionic-native/camera";
import {ImagePage} from "../image/image";

@Component({
  selector: 'page-note',
  styleUrls: ["note.scss"],
  templateUrl: 'note.html'
})
export class NotePage {
  note: Note;
  title: string;
  url: string;
  body: string;

  longPress:boolean;
  timer:number;

  constructor(private navCtrl: NavController, private plaform: Platform, private navParams: NavParams,
              private alertCtrl: AlertController, private db: Database, private camera: Camera) {
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
      targetWidth: this.plaform.width(),
      targetHeight: this.plaform.height(),
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

  showImage(image) {
    this.navCtrl.setRoot(ImagePage, {
      note: this.note,
      image: image
    });
  }

  deleteImage(image) {
    this.alertCtrl.create({
      title: 'Danger!',
      subTitle: `Do you want to delete an image? You won't be able to cancel this action`,
      buttons: [
        {
          text: "Delete",
          handler: () => {
            const index = this.note.images.indexOf(image);

            if (index != -1) {
              this.note.images.splice(index, 1);
            }

            this.db.updateNote(this.note);
          }
        }]
    }).present();
  }

  onInputTitle(event: any) {
    this.note.title = event.value;
    this.db.updateNote(this.note);
  }

  onInputURI(event: any) {
    this.note.url = event.value;
    this.db.updateNote(this.note);
  }

  onInputBody(event: any) {
    this.note.body = event.value;
    this.db.updateNote(this.note);
  }

  onImageTouchStart(image) {
    this.timer = setTimeout(() => {
      this.longPress = true;
      this.deleteImage(image);
    }, 2000);
  }

  onImageTouchEnd(image) {
    clearTimeout(this.timer);

    if (!this.longPress) {
      this.showImage(image);
    }

    this.longPress = false;
  }
}
