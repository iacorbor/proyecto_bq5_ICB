import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mortifago } from '../models/mortifago.model';

@Injectable({
  providedIn: 'root',
})
export class MortifagoService {
  private apiUrl = 'http://localhost:3000/api/mortifagos';

  private http = inject(HttpClient);

  constructor() {}

 //Obtener todos
  getMortifagos(): Observable<Mortifago[]>{
    return this.http.get<Mortifago[]>(this.apiUrl);
  }
 //Filtrado por estado
    getPorEstado(estado: string): Observable<Mortifago[]>{
    return this.http.get<Mortifago[]>(`${this.apiUrl}/estado/${estado}`);
  }
 //Obtencion por nombre
    buscarPorNombre(termino: string): Observable<Mortifago[]>{
    return this.http.get<Mortifago[]>(`${this.apiUrl}/buscar/${termino}`);
  }
 //Tipos de sangre creo que este no lo usaré
   getTiposSangre(): Observable<string[]>{
    return this.http.get<string[]>(`${this.apiUrl}/sangre 
      `);
  }
}

