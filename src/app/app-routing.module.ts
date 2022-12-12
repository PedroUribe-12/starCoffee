import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes, ExtraOptions } from '@angular/router';
import { InicioComponent } from './paginas/inicio/inicio.component';

const routerOptions:ExtraOptions ={
  anchorScrolling:'enabled',
  scrollPositionRestoration:'enabled'
}

const routes: Routes = [
  {
    path:'',
    redirectTo:'inicio',
    pathMatch:'full'
  },
  {
    path:'inicio',
    component: InicioComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
