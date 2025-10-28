import { Component, Input, Output, signal, EventEmitter } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

interface MenuItem {
  label: string;
  path: string;
}

@Component({
  selector: 'app-barra-lateral',
  imports: [MatIconModule, RouterModule, CommonModule],
  templateUrl: './barra-lateral.html',
  standalone: true,
  styleUrl: './barra-lateral.css',
})

export class BarraLateral {
  @Output() machineSelected = new EventEmitter<string>();
  selectedMachine: string = '';

  items() {
    return ['530', '933HP', '502HP', '933', '502', '822'];
  }

  onClickMachine(machine: string) {
    this.selectedMachine = machine;
    this.machineSelected.emit(machine);
    
  }
}
