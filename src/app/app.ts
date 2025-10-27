import { Component, signal, computed } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Header } from './Componentes/header/header';
import { BarraLateral } from './Componentes/barra-lateral/barra-lateral';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Body } from './Componentes/body/body';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatSidenavModule, Header, BarraLateral, CommonModule, Body],
  templateUrl: './app.html',
  styleUrl: './app.css',
})

export class App {
  constructor(private router: Router) {}

  selectedMachine: string = '';
  collapsed = signal(false);
  width = computed(() => (this.collapsed() ? 64 : 400));

  onMachineSelected(machine: string) {
    this.selectedMachine = machine;
  }

}



