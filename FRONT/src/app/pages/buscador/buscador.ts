import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core'; // <--- Importamos ChangeDetectorRef
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MortifagoService } from '../../services/mortifago';
import { Mortifago } from '../../models/mortifago.model';

@Component({
  selector: 'app-buscador',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './buscador.html',
  styleUrl: './buscador.css'
})
export class Buscador implements OnInit {

  mortifagos: Mortifago[] = [];
  mortifagoSeleccionado: Mortifago | null = null;
  cargando: boolean = true;
  busquedaTexto: string = '';
  filtroEstado: string = ''; 

  private servicio = inject(MortifagoService);
  private cd = inject(ChangeDetectorRef); 

  ngOnInit(): void {
    this.cargarTodo();
  }

  cargarTodo() {
    this.cargando = true;
    this.servicio.getMortifagos().subscribe({
      next: (data) => {
        this.mortifagos = data;
        this.cargando = false;
        this.cd.detectChanges(); 
      },
      error: (e) => {
        console.error(e);
        this.cargando = false;
        this.cd.detectChanges(); 
      }
    });
  }

  buscarNombre() {
    if (!this.busquedaTexto.trim()) {
      this.cargarTodo();
      return;
    }
    this.cargando = true;
    this.servicio.buscarPorNombre(this.busquedaTexto).subscribe({
      next: (data) => {
        this.mortifagos = data;
        this.cargando = false;
        this.cd.detectChanges();
      },
      error: () => {
        this.cargando = false;
        this.cd.detectChanges();
      }
    });
  }

  filtrarEstado() {
    if (!this.filtroEstado) return;
    this.cargando = true;
    this.servicio.getPorEstado(this.filtroEstado).subscribe({
      next: (data) => {
        this.mortifagos = data;
        this.cargando = false;
        this.cd.detectChanges(); 
      },
      error: () => {
        this.cargando = false;
        this.cd.detectChanges();
      }
    });
  }

  resetear() {
    this.busquedaTexto = '';
    this.filtroEstado = '';
    this.cargarTodo();
  }

  abrirModal(m: Mortifago) {
    console.log('DATOS QUE LLEGAN DE ORACLE:', m); // <--- AÑADE ESTO
    this.mortifagoSeleccionado = m;
  }
  //Por si hubiese problemas con la imagen que no creo porque esta en local
  imgError(event: any) {
    event.target.src = 'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg';
  }
}