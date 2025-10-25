import { Component, input, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule, NgStyle } from '@angular/common';

interface MenuItem {
  label: string;
  path: string;
}

@Component({
  selector: 'app-barra-lateral',
  imports: [MatIconModule, RouterLinkActive, CommonModule],
  templateUrl: './barra-lateral.html',
  styleUrl: './barra-lateral.css',
})

export class BarraLateral {
  collapsed = input.required<boolean>();
  expandedItems = new Set<string>();

  items = signal<MenuItem[]>([
    { label: '530', path: '/dashboard' },
    { label: '933HP', path: '/usuarios' },
    { label: '502HP', path: '/productos' },
    { label: '933', path: '/reportes' },
    { label: '502', path: '/inventario' },
    { label: '822', path: '/configuracion' },
  ]);

  toggleExpand(item: any): void {
    if (this.isExpanded(item)) {
      this.expandedItems.delete(item.path);
    } else {
      this.expandedItems.add(item.path);
    }
  }

  isExpanded(item: any): boolean {
    return this.expandedItems.has(item.path);
  }
}
