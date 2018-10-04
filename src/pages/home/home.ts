import {Component, NgZone} from '@angular/core';
import {AlertController, NavController, Platform} from 'ionic-angular';
import Database from "../../database/Database";
import Note from "../../models/Note";
import {NotePage} from "../note/note";

@Component({
  selector: 'page-home',
  styleUrls: ["home.scss"],
  templateUrl: 'home.html'
})
export class HomePage {
  notes: Array<Note> = [];
  list: Array<Note> = [];

  sortOptions = {
    noteAscending: true,
    createdAscending: false,
    updatedAscending: false
  };

  myInput: string = "";
  shouldShowCancel: boolean = true;

  constructor(public navCtrl: NavController, private platform: Platform, private alertCtrl: AlertController, private db:Database, private ngZone: NgZone) {
    console.log("Home ctor");
    platform.ready().then(() => {
      console.log("Platform is ready");

      if (this.db.isReady) {
        console.log("db is already ready");

        this.ngZone.run(() => {
          this.getNotes();
        });

        return;
      }

      this.db.events.subscribe("database:ready", () => {
        console.log("db is ready");

        this.getNotes();
      });
    });
  }

  resetList() {
    this.list = this.notes.concat([]);
  }

  getNotes() {
    this.db.getNotes().then(result => {
      const rows = result.rows;

      if (rows && rows.length > 0) {
        for (let i = 0; i < rows.length; i++) {
          console.log(rows.item(i));
          this.notes.push(new Note(rows.item(i)));
        }
      }

      this.resetList();
      this.refreshList();
    });
  }

  refreshList() {
    console.log("refresh list");
  }

  selectNote(note:Note) {
    console.log("select: ", note.id);
    this.navCtrl.setRoot(NotePage, {
      note: note
    });
  }

  deleteNote(note: Note) {
    this.alertCtrl.create({
      title: 'Danger!',
      subTitle: `Do you want to delete ${note.title}?. You won't be able to cancel this action`,
      buttons: [
        {
          text: "Delete",
          handler: () => {
            const index = this.notes.indexOf(note);

            if (index != -1) {
              this.notes.splice(index, 1);
            }

            this.resetList();
            this.db.deleteNote(note.id)
          }
        }]
    }).present();
  }

  sortByNotes() {
    let { noteAscending } = this.sortOptions;
    const dir = noteAscending ? -1 : 1;

    this.list.sort((note1: Note, note2: Note) => {
      if (note1.title > note2.title) {
        return dir;
      } else if (note1.title < note2.title) {
        return -dir;
      }

      return 0;
    });

    this.sortOptions.noteAscending = !noteAscending;
    this.refreshList();
  }

  sortByCreation() {
    let { createdAscending } = this.sortOptions;

    this.list.sort((note1: Note, note2: Note) => {
      return createdAscending ? note1.created - note2.created : note2.created - note1.created;
    });

    this.sortOptions.createdAscending = !createdAscending;
    this.refreshList();
  }

  sortByUpdation() {
    let { updatedAscending } = this.sortOptions;

    this.list.sort((note1: Note, note2: Note) => {
      return updatedAscending ? note1.updated - note2.updated : note2.updated - note1.updated;
    });

    this.sortOptions.updatedAscending = !updatedAscending;
    this.refreshList();
  }

  filterList(event) {
    console.log(event);
    const query = event.data;
    console.log(query);

    if (query) {
      this.list = this.notes.filter(note => note.title.toLowerCase().includes(query.toLowerCase()));
    } else {
      this.resetList();
    }

    console.log(this.list);
    this.refreshList();
  }

  onCancel(event) {
    // console.log("onCancel:", event);
  }

}
