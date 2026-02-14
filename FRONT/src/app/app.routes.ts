import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Buscador } from './pages/buscador/buscador';
import { Component } from '@angular/core';

export const routes: Routes = [
    {path: '',redirectTo: '/home',pathMatch: 'full'},
    {path: 'home', component: Home},
    {path: 'buscador', component: Buscador},
    {path: '**', redirectTo: '/home'}
];
