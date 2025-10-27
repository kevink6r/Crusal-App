import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, ActivatedRoute} from '@angular/router';
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

  dataList: any[] = [];
  filteredPrendas: any[] = [];

  constructor(private http: HttpClient) {
    this.obtenerDatos();
  }

  ngOnChanges() {
    this.filtrarPorMaquina(this.maquina);
  }

  obtenerDatos() {
    this.http.get<any[]>("https://192.168.2.119:8080/api/trproduction/All")
      .subscribe({
        next: (result) => {
          this.dataList = result;
          this.filtrarPorMaquina(this.maquina);
        },
        error: (err) => console.error("Error al obtener los datos:", err)
      });
  }

  filtrarPorMaquina(tipo: string) {
    if (!tipo) {
      this.filteredPrendas = [];
      return;
    }
    this.filteredPrendas = this.dataList.filter(item =>
      item.maq?.toString().toLowerCase().includes(tipo.toLowerCase())
    );
  }
}
