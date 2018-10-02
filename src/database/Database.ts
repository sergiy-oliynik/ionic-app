import {Injectable} from "@angular/core";
import {SQLite, SQLiteObject} from "@ionic-native/sqlite";

@Injectable()
export default class Database {
  private db: SQLiteObject;
  private options: any = {
    name: 'data.db',
    location: 'default',
    createFromLocation: 1
  };

  constructor(private sqlite: SQLite) {
    this.connect();
  }

  connect() {
    this.sqlite
      .create(this.options)
      .then(this.createUsers.bind(this));
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

    const queryCreateNote = "CREATE TABLE IF NOT EXISTS `note` (id INTEGER PRIMARY KEY AUTOINCREMENT, title VARCHAR(255), body TEXT)";

    this.db
      .executeSql(queryCreateNote, [])
      .then((e) => {
        const queryInsertNote = "INSERT INTO `note` (title,body) VALUES " +
          "('Note 1', 'This is first note'), " +
          "('Note 2', 'This is second note')," +
          "('Note 3', 'This is third note')";

        this.db
          .executeSql(queryInsertNote, [])
          .then(() => console.log('Table note created'))
          .catch(e => console.log("Error", JSON.stringify(e)));
      })
      .catch(e => console.log("Error", JSON.stringify(e)));
  }

  getUser(userName: string) {
    // const sql = `SELECT * FROM user WHERE ${userName} = username`;
    const sql = `SELECT username FROM user`;
    console.log(sql);

    return this.db.executeSql(sql, []).then(result => {
      console.log(JSON.stringify(result), result.rows.item(0));
    });
  }
}
