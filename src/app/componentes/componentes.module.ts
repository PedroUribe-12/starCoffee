import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortadaComponent } from './portada/portada.component';
import { CartaProductoComponent } from './carta-producto/carta-producto.component';



@NgModule({
  declarations: [
    PortadaComponent,
    CartaProductoComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    PortadaComponent,
    CartaProductoComponent
  ]
})
export class ComponentesModule { }
