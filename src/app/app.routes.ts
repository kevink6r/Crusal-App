import { Routes } from '@angular/router';
import { Body } from './Componentes/body/body';
import { consumerDestroy } from '@angular/core/primitives/signals';
import { Inicio } from './Componentes/inicio/inicio';



export const routes: Routes = [
  { path: '', component: Inicio },      
  { path: ':maquina', component: Body } 
];


