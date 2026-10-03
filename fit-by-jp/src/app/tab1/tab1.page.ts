import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { RutinasService } from '../services/rutinas.service';
import { BleClient } from '@capacitor-community/bluetooth-le';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false
})
export class Tab1Page implements OnInit {
  
  fraseDia: string = "Cargando inspiración...";
  autorFrase: string = "API";
  
  fechaActual: string;
  smartwatchConectado: boolean = false;
  nombreSmartwatch: string = '';

  constructor(private router: Router, private rutinasService: RutinasService) {
    const opciones: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' };
    this.fechaActual = new Date().toLocaleDateString('es-ES', opciones).toUpperCase();
  }

  ngOnInit() {
    this.obtenerFraseDelDia();
  }

  async obtenerFraseDelDia() {
    try {
      const respuesta = await fetch('https://dummyjson.com/quotes/random');
      const data = await respuesta.json();
      
      const transRes = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(data.quote)}&langpair=en|es`);
      const transData = await transRes.json();

      this.fraseDia = `"${transData.responseData.translatedText}"`;
      this.autorFrase = data.author;
    } catch (error) {
      this.fraseDia = '"El límite eres tú."';
      this.autorFrase = 'JP Fitness';
      console.error('Error obteniendo la frase:', error);
    }
  }

  async doRefresh(event: any) {
    await this.obtenerFraseDelDia();
    event.target.complete();
  }

  async escanearBLE() {
    try {
      await BleClient.initialize();
      this.nombreSmartwatch = 'Buscando...';
      
      // Abre el popup nativo del sistema para seleccionar dispositivo BLE
      const device = await BleClient.requestDevice();

      this.smartwatchConectado = true;
      this.nombreSmartwatch = device.name || `Device-${device.deviceId.substring(0,4)}`;
    } catch (e) {
      console.log('Error escaneando BLE', e);
      this.nombreSmartwatch = '';
      this.smartwatchConectado = false;
    }
  }

  iniciarRutina() {
    this.rutinasService.triggerReset();
    this.router.navigate(['/tabs/rutinas']);
  }

  async escanearQR() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
        promptLabelHeader: 'Escanear QR de Máquina'
      });
      console.log('QR escaneado (simulado con cámara):', image.webPath);
    } catch (e) {
      console.log('Cancelado o error en cámara:', e);
    }
  }
}
