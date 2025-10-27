import { Component } from '@angular/core';

@Component({
  selector: 'app-fondo',
  imports: [],
  templateUrl: './fondo.html',
  standalone: true,
  styleUrl: './fondo.css',
})
export class Fondo {
  filteredPrendas: any[] = [];
  dataList: any[] = [];

  iltrarPorMaquina(tipo: string) {
    if (!tipo) {
      this.filteredPrendas = [];
      return;
    }
    this.filteredPrendas = this.dataList.filter(item =>
      item.machineType?.toString().toLowerCase().includes(tipo.toLowerCase())
    );
  }
}
