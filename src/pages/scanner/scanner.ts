import {Component} from "@angular/core";
import {NavController, NavParams, Platform} from "ionic-angular";
import {QRScanner, QRScannerStatus} from "@ionic-native/qr-scanner";
import Note from "../../models/Note";
import {NotePage} from "../note/note";

@Component({
  selector: 'scanner-home',
  templateUrl: 'scanner.html'
})
export class ScannerPage {
  note: Note;

  constructor(private platform: Platform, public navCtrl: NavController, private navParams: NavParams, private qrScanner: QRScanner) {
    this.note = this.navParams.get("note");

    platform.ready().then(() => {
      this.qrScanner.prepare()
        .then((status: QRScannerStatus) => {
          console.log(status, status.authorized);
          if (status.authorized) {
            let scanSub = this.qrScanner.scan().subscribe((text: string) => {
              console.log('Scanned something', text);

              this.qrScanner.hide(); // hide camera preview
              this.qrScanner.destroy();
              scanSub.unsubscribe(); // stop scanning

              this.note.url = text;
              this.navCtrl.setRoot(NotePage, {
                note: this.note,
                scanned: true,
              });
            });

            this.qrScanner.resumePreview();
            this.qrScanner.show();

          } else if (status.denied) {
            console.log("Permission denied");
            // camera permission was permanently denied
            // you must use QRScanner.openSettings() method to guide the user to the settings page
            // then they can grant the permission from there
          } else {
            console.log("Permission denied, but not permanently");
            // permission was denied, but not permanently. You can ask for permission again at a later time.
          }
        })
        .catch((e: any) => console.log('Error is', e));


    });
  }
}
