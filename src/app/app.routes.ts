import { Routes } from '@angular/router';
import { Body } from './Componentes/body/body';
import { consumerDestroy } from '@angular/core/primitives/signals';
import { Fondo } from './Componentes/fondo/fondo';


export const routes: Routes = [
  { path: '', component: Fondo },        // placeholder inicial
  { path: ':maquina', component: Body } // Body recibe tipo de máquina
];


