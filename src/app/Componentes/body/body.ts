import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ChangeDetectorRef } from '@angular/core';


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
  botonDespachoSeleccionado: number | null = null;

  tallasList: { cantidad: number, columnas: string }[] = [];
  despachosList: any[] = [];
  dataList: any[] = [];

  filteredPrendas: any[] = [];
  selectedPrenda: any = null;
  mostrarBotonesExtra: boolean = false;
  mostrarBotones16: boolean = false;
  selectedMachine: string = '';
  botonSeleccionado: number | null = null;
  activeExtraButton: number = -1;
  activeBelowButton: number = -1;
  activeRightButton: number = -1;


  constructor(private http: HttpClient, private cd: ChangeDetectorRef) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['maquina'] && this.maquina) {
      this.ObtenerMaquina(this.maquina);
    }
  }

  // ===== APIS ==============================================================================================
  ObtenerMaquina(maq: string) {
    this.http.get<any[]>(`https://192.168.2.119:8080/api/trproduction/gantt?maq=${maq}`)
      .subscribe({
        next: (result) => {
          this.dataList = result;
          this.filtrarPorMaquina(maq);
        },
        error: (err) => console.error("Error al obtener los datos:", err)
      });
  }

  ObtenerDespachos(idmod: string, op: string) {
    const url = `https://192.168.2.119:8080/api/trproduction/despachos?idmod=${idmod}&op=${op}`;
    this.http.get<any[]>(url).subscribe({
      next: (result) => {
        console.log('Despachos recibidos:', result);
        this.despachosList = result;
      },
      error: (err) => console.error('Error al obtener despachos:', err),
    });
  }

  ObtenerPiezas(iddh: string, idmod: string, tval: string) {
    const url = `https://192.168.2.119:8080/api/trproduction/piezas?iddh=${iddh}&idmod=${idmod}&tval=${tval}`;
    this.http.get<any[]>(url).subscribe({
      next: (result) => {
        console.log('Piezas recibidas:', result);
        this.tallasList = result;
        this.mostrarBotonesExtra = true; //activar los botones
        this.activeExtraButton = -1;     //resetear selección
      },
      error: (err) => console.error('Error al obtener piezas:', err),
    });
  }

  // ===== FUNCIONES =======================================================================================================
  seleccionarDespacho(despacho: any, index: number) {
    console.log('Despacho clickeado:', despacho);

    if (this.botonSeleccionado === index) {
      this.botonSeleccionado = null;
      this.mostrarBotonesExtra = false;
      this.tallasList = [];
      this.activeExtraButton = -1;
      return;
    }

    const tempTallas: { cantidad: number, columnas: string }[] = [];

    for (let i = 1; i <= 11; i++) {
      const col = `t${i}`;
      const cantidad = despacho[col];
      if (cantidad && cantidad !== 0) {
        tempTallas.push({ cantidad, columnas: col });
      }
    }

    console.log('Tallas extraídas:', tempTallas);

    this.tallasList = tempTallas;
    this.botonSeleccionado = index;
    this.mostrarBotonesExtra = tempTallas.length > 0;
    this.activeExtraButton = -1;
    console.log('estado de buttons: ', this.mostrarBotonesExtra)
    console.log('tallasList para renderizar:', this.tallasList);
    this.cd.detectChanges();
  }


  filtrarPorMaquina(tipo: string) {
    this.filteredPrendas = this.dataList.filter(item =>
      item.maq?.toString().toLowerCase().includes(tipo.toLowerCase())
    );
    this.cerrarDetalles();
  }

  seleccionarTalla(talla: any, index: number) {
    this.activeExtraButton = index;
    console.log('Talla seleccionada:', talla);
  }

  extraerTallas(despacho: any) {
    const tempTallas: Array<{ cantidad: number, talla: string }> = [];
    for (let i = 1; i <= 11; i++) {
      const col = `t${i}`;
      if (despacho[col] && despacho[col] !== 0) {
        tempTallas.push({ cantidad: despacho[col], talla: despacho.tll });
      }
    }
    return tempTallas;
  }

  // ===== Body Detalles =================================================================================================

  verDetalles(prenda: any) {
    this.selectedPrenda = prenda;
    this.mostrarBotonesExtra = false;
    this.mostrarBotones16 = false;
    if (prenda.idmod && prenda.op) {
      if (prenda.idmod && prenda.op) {
        this.ObtenerDespachos(prenda.idmod, prenda.op);
      }
    } else {
      console.warn("La prenda seleccionada no contiene idmod u op:", prenda);
    }
  }

  cerrarDetalles() {
    this.selectedPrenda = null;
    this.mostrarBotonesExtra = false;
    this.mostrarBotones16 = false;
    this.botonSeleccionado = null;
    this.tallasList = [];
    this.despachosList = [];
  }

  // ===== Botones Grid 11 ===============================================================================================
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

  // ===== Botones Abajo 16 ==============================================================================================
  mostrarBotonesPiezas(index?: number) {
    if (this.mostrarBotones16) {
      this.mostrarBotones16 = false;
    } else {
      this.mostrarBotones16 = true;
    }
  }

}






/* 

seleccionarDespacho(despacho: any, index: number) {
    const tempTallas: Array<{ cantidad: number, talla: string }> = [];
    for (let i = 1; i <= 11; i++) {
      const col = `t${i}`;
      if (despacho[col] && despacho[col] !== 0) {
        tempTallas.push({ cantidad: despacho[col], talla: despacho.tll });
      }
    }

    this.tallasList = tempTallas;
    this.botonSeleccionado = index;
    this.mostrarBotonesExtra = true;
    this.activeExtraButton = -1;

    console.log('Tallas a mostrar:', this.tallasList);

    this.cd.detectChanges(); 
  }

*/















