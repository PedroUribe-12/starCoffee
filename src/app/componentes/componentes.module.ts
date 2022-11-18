import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortadaComponent } from './portada/portada.component';
import { Seccion2Component } from './seccion2/seccion2.component';



@NgModule({
  declarations: [
    PortadaComponent,
    Seccion2Component
  ],
  imports: [
    CommonModule
  ],
  exports:[
    //Exportamos los componentes
    PortadaComponent,
    Seccion2Component
  ]
})
export class ComponentesModule { }
