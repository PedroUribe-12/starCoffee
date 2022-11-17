import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortadaComponent } from './portada/portada.component';



@NgModule({
  declarations: [
    PortadaComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    //Exportamos el componente
    PortadaComponent
  ]
})
export class ComponentesModule { }
