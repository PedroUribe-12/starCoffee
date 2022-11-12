import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortadaComponent } from './portada/portada.component';
import { CartaProductoComponent } from './carta-producto/carta-producto.component';
import {RatingModule} from 'primeng/rating';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    PortadaComponent,
    CartaProductoComponent
  ],
  imports: [
    CommonModule,
    RatingModule,
    FormsModule
  ],
  exports:[
    PortadaComponent,
    CartaProductoComponent
  ]
})
export class ComponentesModule { }
