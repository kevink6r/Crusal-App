import { Component, signal, computed } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Header } from './Componentes/header/header';
import { BarraLateral } from './Componentes/barra-lateral/barra-lateral';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatSidenavModule, Header, BarraLateral, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})

export class App {
  collapsed = signal(false);

  width = computed(() => (this.collapsed() ? 64 : 400));
}



