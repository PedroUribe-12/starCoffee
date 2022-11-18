import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortadaComponent } from './portada/portada.component';

import { CartaProductoComponent } from './carta-producto/carta-producto.component';
import {RatingModule} from 'primeng/rating';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarruselDeCartasComponent } from './carrusel-de-cartas/carrusel-de-cartas.component';
import {CarouselModule} from 'primeng/carousel';
import { Seccion2Component } from './seccion2/seccion2.component';
import { EventoComponent } from './evento/evento.component';




@NgModule({
  declarations: [
    PortadaComponent,
    CartaProductoComponent,
    CarruselDeCartasComponent,
    Seccion2Component,
    EventoComponent
  ],
  imports: [
    CommonModule,
    RatingModule,
    FormsModule,
    CarouselModule
  ],
  exports:[
  //Exportamos los componentes
    PortadaComponent,
    CartaProductoComponent,
    CarruselDeCartasComponent,
    PortadaComponent,
    Seccion2Component,
    EventoComponent
  ]
})
export class ComponentesModule { }
