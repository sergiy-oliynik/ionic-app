import {Injectable} from "@angular/core";
import {SQLite, SQLiteObject} from "@ionic-native/sqlite";
import {Events} from "ionic-angular";

@Injectable()
export default class Database {
  private db: SQLiteObject;
  private options: any = {
    name: 'data.db',
    location: 'default',
    createFromLocation: 1
  };

  constructor(public events: Events, private sqlite: SQLite) {
    this.connect();
  }

  ready() {
    this.events.publish("database:ready");
  }

  connect() {
    this.sqlite
      .create(this.options)
      .then(this.createUsers.bind(this));
  }

  execute(sql, params) {
    return this.db.executeSql(sql, params)
      .catch(e => console.log("Error", JSON.stringify(e)));
  }

  createUsers(db: SQLiteObject) {
    console.log(`Database ${this.options.name} created`);

    this.db = db;

    const queryCreateUser = "CREATE TABLE IF NOT EXISTS `user` (id INTEGER PRIMARY KEY AUTOINCREMENT, username VARCHAR(255), password VARCHAR(255))";

    this.db
      .executeSql(queryCreateUser, [])
      .then(this.tryAddUser.bind(this))
      .catch(e => console.log("Error", JSON.stringify(e)));
  }

  tryAddUser() {
    const queryCount = "SELECT count(username) as users FROM user WHERE username = ?";

    console.log("Find user", queryCount);

    this.db
      .executeSql(queryCount, ["user"])
      .then(result => {
        console.log("Rows", result, result.rows);

        if (result.rows && result.rows.length > 0) {
          const item = result.rows.item(0);

          console.log("Count", item, item.users);

          if (item.users > 0) {
            console.log("Stop creating");
            this.ready();
            return;
          }
        }

        const queryInsertUser = "INSERT INTO user (username,password) VALUES ('user', 'password')";

        this.db
          .executeSql(queryInsertUser, [])
          .then(this.createNotes.bind(this))
          .catch(e => console.log("Error", JSON.stringify(e)));
      })
      .catch(e => console.log("Error", JSON.stringify(e)));
  }

  createNotes() {
    console.log("Table user created");

    const queryCreateNote = "CREATE TABLE IF NOT EXISTS `note` (id INTEGER PRIMARY KEY AUTOINCREMENT, title VARCHAR(255), body TEXT, created INTEGER, updated INTEGER)";

    this.db
      .executeSql(queryCreateNote, [])
      .then((e) => {
        const queryInsertNote = "INSERT INTO `note` (title,body, created, updated) VALUES " +
          "('Note 1', 'This is first note', 1538530067, 1538553067)," +
          "('Note 2', 'This is second note', 1538540067, 1538551067)," +
          "('Note 3', 'This is third note', 1538550067, 1538552067)";

        this.db
          .executeSql(queryInsertNote, [])
          .then(() => {
            console.log('Table note created');
            this.ready();
          })
          .catch(e => console.log("Error", JSON.stringify(e)));
      })
      .catch(e => console.log("Error", JSON.stringify(e)));
  }

  getUser(userName: string) {
    const sql = `SELECT * FROM user WHERE username = ?`;
    return this.db.executeSql(sql, [userName]);
  }

  getNotes() {
    console.log("Getting notes");
    const sql = "SELECT * FROM note";
    return this.execute(sql, []);
  }
}
