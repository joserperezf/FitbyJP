import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Geolocation } from '@capacitor/geolocation';
import { Camera } from '@capacitor/camera';
import { BleClient } from '@capacitor-community/bluetooth-le';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  constructor(private platform: Platform) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(async () => {
      if (this.platform.is('capacitor')) {
        try {
          await Geolocation.requestPermissions();
        } catch (e) {
          console.warn('Geolocation permission err', e);
        }
        
        try {
          await Camera.requestPermissions();
        } catch (e) {
          console.warn('Camera permission err', e);
        }

        try {
          await BleClient.initialize();
        } catch (e) {
          console.warn('Bluetooth permission err', e);
        }
      }
    });
  }
}
