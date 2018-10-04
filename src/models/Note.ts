export default class Note {
  id: number;
  title: string;
  body: string;
  created: number;
  updated: number;

  constructor(obj: any) {
    this.id = obj["id"];
    this.title = obj["title"];
    this.body = obj["body"];
    this.created = obj["created"];
    this.updated = obj["updated"];
  }
}
