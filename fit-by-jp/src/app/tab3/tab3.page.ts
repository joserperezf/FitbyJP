import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Network } from '@capacitor/network';
import { Geolocation } from '@capacitor/geolocation';
import * as L from 'leaflet';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: false
})
export class Tab3Page implements OnInit, OnDestroy {

  estaOffline: boolean = false;
  map!: L.Map;
  networkListener: any;
  userMarker!: L.CircleMarker;

  enCaminata: boolean = false;
  kmRecorridos: string = '0.0';
  tiempoFormat: string = '00:00';
  ritmo: string = '--';
  
  private timer: any;
  private segundos: number = 0;
  private distancia: number = 0;

  constructor(private cdr: ChangeDetectorRef) {}

  async ngOnInit() {
    this.iniciarDeteccionRed();
  }

  ionViewDidEnter() {
    this.initMap();
  }

  async iniciarDeteccionRed() {
    const status = await Network.getStatus();
    this.estaOffline = !status.connected;

    this.networkListener = await Network.addListener('networkStatusChange', status => {
      this.estaOffline = !status.connected;
    });
  }

  async initMap() {
    let lat = 18.4861;
    let lng = -69.9312;

    try {
      const position = await Geolocation.getCurrentPosition();
      lat = position.coords.latitude;
      lng = position.coords.longitude;
    } catch (e) {
      console.warn('No se pudo obtener GPS, usando ubicación por defecto.');
    }

    if (this.map) {
      this.map.remove();
    }

    this.map = L.map('map-container', {
      zoomControl: false,
      attributionControl: false
    }).setView([lat, lng], 15);

    L.tileLayer('https://basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}.png?key=cb1_48x8_1_3bf8daa91ab6262a13adb43c', {
      maxZoom: 19
    }).addTo(this.map);

    this.userMarker = L.circleMarker([lat, lng], {
      color: '#00ff73',
      fillColor: '#00ff73',
      fillOpacity: 1,
      radius: 8
    }).addTo(this.map);
  }

  async centrarMapa() {
    try {
      const position = await Geolocation.getCurrentPosition();
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      
      this.map.setView([lat, lng], 16);
      if (this.userMarker) {
        this.userMarker.setLatLng([lat, lng]);
      }
    } catch (e) {
      console.warn('No se pudo obtener GPS para centrar.');
    }
  }

  toggleCaminata() {
    this.enCaminata = !this.enCaminata;
    if (this.enCaminata) {
      this.iniciarSimulacion();
    } else {
      clearInterval(this.timer);
    }
  }

  iniciarSimulacion() {
    this.segundos = 0;
    this.distancia = 0;
    
    this.timer = setInterval(() => {
      this.segundos++;
      // Simulamos que camina ~1.5 metros por segundo (aprox 5.4 km/h)
      this.distancia += 1.5; 
      
      const km = this.distancia / 1000;
      this.kmRecorridos = km.toFixed(2);
      
      const min = Math.floor(this.segundos / 60);
      const seg = this.segundos % 60;
      this.tiempoFormat = `${min.toString().padStart(2, '0')}:${seg.toString().padStart(2, '0')}`;
      
      if (km > 0.01) {
        // min/km
        const ritmoTotalMin = (this.segundos / 60) / km;
        const ritmoMin = Math.floor(ritmoTotalMin);
        const ritmoSeg = Math.floor((ritmoTotalMin - ritmoMin) * 60);
        this.ritmo = `${ritmoMin}:${ritmoSeg.toString().padStart(2, '0')}`;
      }
      
      this.cdr.detectChanges();
    }, 1000);
  }

  ngOnDestroy() {
    if (this.networkListener) {
      this.networkListener.remove();
    }
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
}
