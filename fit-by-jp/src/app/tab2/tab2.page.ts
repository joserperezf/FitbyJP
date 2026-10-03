import { Component, OnInit, OnDestroy } from '@angular/core';
import { RutinasService } from '../services/rutinas.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false
})
export class Tab2Page {
  
  ejercicios = [
    { nombre: 'Press de Banca', series: 4, repeticiones: 10, peso: '80kg', icono: 'barbell-outline', completado: false },
    { nombre: 'Pull-ups', series: 3, repeticiones: 12, peso: 'Peso corporal', icono: 'body-outline', completado: true },
    { nombre: 'Sentadillas', series: 4, repeticiones: 12, peso: '100kg', icono: 'fitness-outline', completado: true },
    { nombre: 'Carrera', series: 1, repeticiones: 1, peso: '5km', icono: 'walk-outline', completado: false },
    { nombre: 'Plancha', series: 3, repeticiones: 1, peso: '60 seg', icono: 'flash-outline', completado: false }
  ];

  ejerciciosExtrasPechoEspalda = [
    { nombre: 'Press Inclinado', series: 3, repeticiones: 12, peso: '60kg', icono: 'barbell-outline', completado: false },
    { nombre: 'Remo con Barra', series: 4, repeticiones: 10, peso: '70kg', icono: 'barbell-outline', completado: false },
    { nombre: 'Aperturas con Mancuernas', series: 3, repeticiones: 15, peso: '15kg', icono: 'body-outline', completado: false },
    { nombre: 'Jalón al Pecho', series: 4, repeticiones: 12, peso: '65kg', icono: 'body-outline', completado: false },
    { nombre: 'Pullover', series: 3, repeticiones: 12, peso: '25kg', icono: 'barbell-outline', completado: false }
  ];

  fechaActual: string;
  private resetSub!: Subscription;

  // Reproductor de Música
  audioPlayer = new Audio();
  playlist: File[] = [];
  currentSongIndex: number = 0;
  currentSongName: string = '';
  isPlaying: boolean = false;

  constructor(private rutinasService: RutinasService) {
    const opciones: Intl.DateTimeFormatOptions = { weekday: 'long' };
    this.fechaActual = new Date().toLocaleDateString('es-ES', opciones).toUpperCase() + ' · PLAN A';
  }

  ngOnInit() {
    this.resetSub = this.rutinasService.reset$.subscribe((shouldReset) => {
      if (shouldReset) {
        this.ejercicios.forEach(ej => ej.completado = false);
        this.rutinasService.clearReset(); // Importante para evitar resets infinitos
      }
    });
  }

  ngOnDestroy() {
    if (this.resetSub) {
      this.resetSub.unsubscribe();
    }
    this.audioPlayer.pause();
    this.audioPlayer.src = '';
  }

  // --- MÚSICA ---
  onFilesSelected(event: any) {
    const files = event.target.files;
    if (files && files.length > 0) {
      this.playlist = Array.from(files);
      this.currentSongIndex = 0;
      this.loadSong();
    }
  }

  loadSong() {
    if (this.playlist.length > 0) {
      const file = this.playlist[this.currentSongIndex];
      this.currentSongName = file.name;
      const objectUrl = URL.createObjectURL(file);
      this.audioPlayer.src = objectUrl;
      this.audioPlayer.load();
      this.audioPlayer.onended = () => this.nextSong();
      
      this.audioPlayer.play().then(() => {
        this.isPlaying = true;
      }).catch(e => console.error("Error reproduciendo", e));
    }
  }

  togglePlay() {
    if (this.audioPlayer.src) {
      if (this.audioPlayer.paused) {
        this.audioPlayer.play();
        this.isPlaying = true;
      } else {
        this.audioPlayer.pause();
        this.isPlaying = false;
      }
    }
  }

  nextSong() {
    if (this.playlist.length > 0) {
      this.currentSongIndex++;
      if (this.currentSongIndex >= this.playlist.length) {
        this.currentSongIndex = 0; // Loop al inicio
      }
      this.loadSong();
    }
  }
  // --------------

  get completados() {
    return this.ejercicios.filter(e => e.completado).length;
  }

  get total() {
    return this.ejercicios.length;
  }

  get progreso() {
    return this.total === 0 ? 0 : this.completados / this.total;
  }

  marcarCompletado(ejercicio: any, slidingItem: any) {
    ejercicio.completado = !ejercicio.completado;
    slidingItem.close();
  }

  agregarEjercicio() {
    // Filtramos los extras que ya hayan sido agregados a la rutina principal
    const disponibles = this.ejerciciosExtrasPechoEspalda.filter(
      extra => !this.ejercicios.some(ej => ej.nombre === extra.nombre)
    );

    if (disponibles.length > 0) {
      // Elegir uno aleatorio de los disponibles
      const randomIndex = Math.floor(Math.random() * disponibles.length);
      this.ejercicios.push({ ...disponibles[randomIndex] }); // Copiamos el objeto
    } else {
      alert("¡Ya agregaste todos los ejercicios extra de Pecho + Espalda disponibles!");
    }
  }
}
