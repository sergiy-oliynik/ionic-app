import {Component} from "@angular/core";
import {NavController, NavParams} from "ionic-angular";
import Note from "../../models/Note";
import {NotePage} from "../note/note";

@Component({
  selector: 'page-image',
  styleUrls: ["image.scss"],
  templateUrl: 'image.html'
})
export class ImagePage {
  image: string;
  note: Note;

  constructor(private navCtrl: NavController, private navParams: NavParams) {
    this.note = navParams.get("note");
    this.image = navParams.get("image");
  }

  onImageTouchEnd() {
    console.log("on press end");

    this.navCtrl.setRoot(NotePage, {
      note: this.note
    })
  }
}
