import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-body',
  imports: [RouterModule, MatIconModule, CommonModule, MatCardModule, MatButtonModule],
  standalone: true,
  templateUrl: './body.html',
  styleUrl: './body.css',
})

export class Body {
  @Input() maquina: string = '';
  prendaSeleccionada: any = null;

  dataList: any[] = [];
  filteredPrendas: any[] = [];
  selectedPrenda: any = null;
  mostrarBotonesExtra: boolean = false;
  mostrarBotones16: boolean = false;
  selectedMachine: string = '';
  botonSeleccionado: number | null = null;

  /*
  constructor(private http: HttpClient) {
    this.obtenerDatos();
  }
  */


  constructor() {
    this.generarDatosMock();
  }

  generarDatosMock() {
    this.dataList = [
      { mod: 'Modelo AAPW22-01', trb: 'Juan Pérez', maq: '530', cnt: 120 },
      { mod: 'Modelo AAPW22-02', trb: 'María Gómez', maq: '530', cnt: 95 },
      { mod: 'Modelo AAPW22-03', trb: 'Carlos Ruiz', maq: '530', cnt: 140 },
      { mod: 'Modelo AAPW22-04', trb: 'Ana López', maq: '540', cnt: 75 },
      { mod: 'Modelo AAPW22-05', trb: 'Pedro Sánchez', maq: '530', cnt: 60 },
      { mod: 'Modelo AAPW22-06', trb: 'Lucía Torres', maq: '550', cnt: 100 },
    ];
    this.filtrarPorMaquina(this.maquina);
  }

  ngOnChanges() {
    this.filtrarPorMaquina(this.maquina);
  }

  /*
  obtenerDatos() {
    this.http.get<any[]>("https://192.168.2.119:8080/api/trproduction/All")
      .subscribe({
        next: (result) => {
          this.dataList = result;
          this.filtrarPorMaquina(this.maquina);
        },
        error: (err) => console.error("Error al obtener los datos:", err)
      });
  }*/

  filtrarPorMaquina(tipo: string) {
    if (!tipo) {
      this.filteredPrendas = [];
      return;
    }
    this.filteredPrendas = this.dataList.filter(item =>
      item.maq?.toString().toLowerCase().includes(tipo.toLowerCase())
    );
    this.cerrarDetalles();
  }

  verDetalles(prenda: any) {
    this.selectedPrenda = prenda;
    this.mostrarBotonesExtra = false;
    this.mostrarBotones16 = false;
  }

  cerrarDetalles() {
    this.selectedPrenda = null;
    this.mostrarBotonesExtra = false;
  }

  // ===== Botones Grid 11 ====================================================
  toggleBotonesExtra(index: number) {
    if (this.botonSeleccionado === index && this.mostrarBotonesExtra) {
      this.mostrarBotonesExtra = false;
      this.mostrarBotones16 = false;
      this.botonSeleccionado = null;
    } else {
      this.botonSeleccionado = index;
      this.mostrarBotonesExtra = true;
      this.mostrarBotones16 = false;
    }
  }

  // ===== Botones Abajo 16 ====================================================
  mostrarBotonesPiezas(index?: number) {
    if (this.mostrarBotones16) {
      this.mostrarBotones16 = false;
    } else {
      this.mostrarBotones16 = true;
    }
  }

}
