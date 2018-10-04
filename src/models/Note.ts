export default class Note {
  id: number;
  title: string;
  url: string;
  body: string;
  images: Array<String>;
  created: number;
  updated: number;

  constructor(obj: any) {
    this.id = obj["id"];
    this.title = obj["title"];
    this.url = obj["url"];
    this.body = obj["body"];
    this.images = obj["images"].concat([]);
    this.created = obj["created"];
    this.updated = obj["updated"];
  }

  get imagesToString(): string {
    return JSON.stringify(this.images);
  }
}
