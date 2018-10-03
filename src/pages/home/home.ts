import { Component } from '@angular/core';
import {NavController, Platform} from 'ionic-angular';
import Database from "../../database/Database";
import Note from "../../models/Note";

@Component({
  selector: 'page-home',
  styleUrls: ["home.scss"],
  templateUrl: 'home.html'
})
export class HomePage {
  notes: Array<Note> = [];

  sortOptions = {
    noteAscending: true,
    createdAscending: false,
    updatedAscending: false
  };

  constructor(public navCtrl: NavController, private platform: Platform, private db:Database) {
    platform.ready().then(() => {
      console.log("Platform is ready");

      this.db.events.subscribe("database:ready", () => {
        console.log("db is ready");

        this.getNotes();
      });
    });
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
    });
  }

  refreshList() {}

  sortByNotes() {
    let { noteAscending } = this.sortOptions;
    const dir = noteAscending ? -1 : 1;

    this.notes.sort((note1: Note, note2: Note) => {
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

    this.notes.sort((note1: Note, note2: Note) => {
      return createdAscending ? note1.created - note2.created : note2.created - note1.created;
    });

    this.sortOptions.createdAscending = !createdAscending;
    this.refreshList();
  }

  sortByUpdation() {
    let { updatedAscending } = this.sortOptions;

    this.notes.sort((note1: Note, note2: Note) => {
      return updatedAscending ? note1.updated - note2.updated : note2.updated - note1.updated;
    });

    this.sortOptions.updatedAscending = !updatedAscending;
    this.refreshList();
  }

}
