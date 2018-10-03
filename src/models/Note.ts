export default class Note {
  id: number;
  title: string;
  url: string;
  body: string;
  created: number;
  updated: number;

  constructor(obj: any) {
    this.id = obj["id"];
    this.title = obj["title"];
    this.url = obj["url"];
    this.body = obj["body"];
    this.created = obj["created"];
    this.updated = obj["updated"];
  }
}
