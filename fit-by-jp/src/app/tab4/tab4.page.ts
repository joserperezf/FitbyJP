import { Component, ViewChild, OnInit } from '@angular/core';
import { IonModal, AlertController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss'],
  standalone: false
})
export class Tab4Page implements OnInit {
  @ViewChild('modalRegistro') modalRegistro!: IonModal;

  pesoInicial: number = 87.5;
  pesoActual: number = 87.5;
  pesoMeta: number = 75;
  nuevoPesoEntrada: number = 87.5;
  
  racha: number = 24;
  sesiones: number = 87;

  fotos: {mes: string, url: string}[] = [];

  constructor(private storage: Storage, private alertController: AlertController) {}

  async ngOnInit() {
    await this.storage.create();
    
    const pesoGuardado = await this.storage.get('pesoActual');
    if (pesoGuardado) {
      this.pesoActual = parseFloat(pesoGuardado);
    }
    
    const metaGuardada = await this.storage.get('pesoMeta');
    if (metaGuardada) {
      this.pesoMeta = parseFloat(metaGuardada);
    }

    const fotosGuardadas = await this.storage.get('fotosProgreso');
    if (fotosGuardadas) {
      this.fotos = JSON.parse(fotosGuardadas);
    }
  }

  get perdido() {
    return (this.pesoActual - this.pesoInicial).toFixed(1);
  }

  get progresoPorcentaje() {
    const totalAPerder = this.pesoInicial - this.pesoMeta;
    const perdidoHastaAhora = this.pesoInicial - this.pesoActual;
    if (totalAPerder <= 0) return 0;
    const progreso = (perdidoHastaAhora / totalAPerder) * 100;
    return Math.max(0, Math.min(100, progreso));
  }

  abrirModal() {
    this.nuevoPesoEntrada = this.pesoActual;
    this.modalRegistro.present();
  }

  cerrarModal() {
    this.modalRegistro.dismiss();
  }

  async guardarPeso() {
    this.pesoActual = this.nuevoPesoEntrada;
    await this.storage.set('pesoActual', this.pesoActual.toString());
    this.sesiones++; // Aumenta sesiones dinámicamente al registrar
    this.cerrarModal();
  }

  async cambiarMeta() {
    const alert = await this.alertController.create({
      header: 'Meta de peso',
      inputs: [
        {
          name: 'meta',
          type: 'number',
          value: this.pesoMeta,
          placeholder: 'Ej: 70'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Guardar',
          handler: async (data) => {
            if (data.meta) {
              this.pesoMeta = parseFloat(data.meta);
              await this.storage.set('pesoMeta', this.pesoMeta.toString());
            }
          }
        }
      ]
    });
    await alert.present();
  }

  async tomarFoto(event: Event) {
    event.preventDefault();
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera
      });

      if (image.webPath) {
        this.fotos.unshift({
          mes: new Date().toLocaleDateString('es-ES', { month: 'short' }),
          url: image.webPath
        });
        
        await this.storage.set('fotosProgreso', JSON.stringify(this.fotos));
      }
    } catch (e) {
      console.error('Cámara cancelada', e);
    }
  }

  // Generación dinámica de la gráfica SVG basada en el peso
  get graphPoints(): { polyline: string, polygon: string, circles: {cx: number, cy: number}[] } {
    // Simulamos un historial basado en el peso inicial y el peso actual
    // Para simplificar, creamos 7 puntos (meses) interpolando desde el inicial al actual
    const steps = 6;
    const diff = this.pesoInicial - this.pesoActual;
    const stepDiff = diff / steps;
    
    // El eje Y en SVG va de 0 a 120, donde 120 es abajo (peso alto) y 0 es arriba (peso bajo).
    // Peso inicial = 87.5kg -> supongamos que es Y=20.
    // Meta = 75kg -> supongamos que es Y=100.
    // Escala: (100 - 20) / (87.5 - 75) = 80 / 12.5 = 6.4 px por kg.
    const getPointY = (peso: number) => {
      return 100 - (this.pesoInicial - peso) * 6.4;
    };

    const points = [];
    for(let i = 0; i <= steps; i++) {
      const pesoEnEstePunto = this.pesoInicial - (stepDiff * i);
      const x = 10 + (i * 46.6); // 280 / 6
      const y = getPointY(pesoEnEstePunto);
      points.push({ cx: Math.round(x), cy: Math.round(y) });
    }

    const pointsStr = points.map(p => `${p.cx},${p.cy}`).join(' ');
    
    return {
      polyline: pointsStr,
      polygon: `${pointsStr} 290,120 10,120`,
      circles: points
    };
  }
}
