import { Component } from '@angular/core';
import { ViewController, NavController, NavParams } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { AndroidFullScreen } from '@ionic-native/android-full-screen';

@Component({
  selector: 'clock-page',
  templateUrl: 'clock.html'
})
export class ClockPage {

  public isVisible: boolean = true;
  public isInvisible: boolean = false;
  public touchOverlay: boolean = false;
  public overlayTimeout: any;
  public initialTimout: any;

  public uiTimeout: any;

  public currentUser: string;
  public colorChanging: boolean;

  public fontscale: number = 0.75;
  public retryScale: any;

  public singleNumber: string[] = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
  public tenPlus: string[] = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
  public ten: string[] = ['twenty', 'thirty', 'forty', 'fifty'];

  public hour: string = 'hour';
  public min: string = 'min';
  public ampm: string = 'pm';

  constructor(public navCtrl: NavController, private statusBar: StatusBar,
    public navParams: NavParams, public viewCtrl: ViewController,
    public androidFullScreen: AndroidFullScreen
  ) {
  }

  scaleFont(f) {
    let container = document.getElementById('fontScaler');
    if (container !== null) {
      let containerWidth = container.clientWidth,
        percentSize = containerWidth * f;
      container.style.fontSize = percentSize + '%';
    } else {
      console.log('missing...')
    }
  }

  /*
  Updated the clock
  */
updateClock(d) {
  if (d.getHours() === 12 && 2 >= d.getMinutes()) {
    this.hour = "noon";
    this.min = null;
    this.ampm = null;
  } else if (d.getHours() === 0 && 2 >= d.getMinutes()) {
    this.hour = "midnight";
    this.min = null;
    this.ampm = null;
  } else {
    let hours = ((d.getHours() + 11) % 12 + 1),
      minutes = d.getMinutes(),
      period = (d.getHours() < 12) ? "am" : "pm";

    console.log(hours);

    this.hour = this.num2word(hours);
    this.min = this.num2word(minutes);
    this.ampm = period;
  }

}

  num2word(str) {
    str = str.toString().replace(/[\, ]/g, '');

    if (str != parseFloat(str)) {
      return 'not a number';
    }

    let strLength = str.indexOf('.');
    if (strLength == -1) {
      strLength = str.length;
    }

    let n = str.split('');
    let result = '';
    let skip = 0;
    for (let i = 0; i < strLength; i++) {

      if ((strLength - i) % 3 == 2) {
        if (n[i] == '1') {
          result += this.tenPlus[Number(n[i + 1])] + ' ';
          i++;
          skip = 1;
        } else if (n[i] != 0) {
          result += this.ten[n[i] - 2] + ' ';
          skip = 1;
        }
      } else if (n[i] != 0) {
        result += this.singleNumber[n[i]] + ' ';
      }
    }

    return result.replace(/\s+/g, ' ');
  }


  ionViewWillLeave() {
    clearTimeout(this.uiTimeout);
    this.statusBar.show();
    this.androidFullScreen.showSystemUI();
  }

  removeOverlay() {
    this.isVisible = true;
    this.isInvisible = false;
    this.touchOverlay = false;
    this.overlayTimeout = setTimeout(() => {
      this.isVisible = false;
      this.isInvisible = true;
      this.touchOverlay = true;
    }, 8000);
  }

  ionViewDidLoad() {
    this.currentUser = this.navParams.get('user');
    this.colorChanging = this.navParams.get('colorChanging');

    this.initialTimout = setTimeout(() => {
      this.isVisible = false;
      this.isInvisible = true;
      this.touchOverlay = true;
    }, 4000);

    this.scaleFont(this.fontscale);

  }

  ionViewDidEnter() {
    this.uiTimeout = setTimeout(() => {
      this.statusBar.hide();
      this.androidFullScreen.isImmersiveModeSupported()
        .then(() => this.androidFullScreen.immersiveMode())
        .catch((error: any) => console.log(error));
    }, 10000)

    window.addEventListener('resize', () => {
      this.scaleFont(this.fontscale);
    });
  }

  ionViewWillEnter() {
    let d = new Date();
    this.updateClock(d);
    /*
    Run updateClock every second
    */
    setInterval(() => {
      let d = new Date();
      this.updateClock(d);
    }, 60000);
  }

}
