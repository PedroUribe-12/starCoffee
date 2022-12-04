import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortadaComponent } from './portada/portada.component';

import { CartaProductoComponent } from './carta-producto/carta-producto.component';
import {RatingModule} from 'primeng/rating';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarruselDeCartasComponent } from './carrusel-de-cartas/carrusel-de-cartas.component';
import {CarouselModule} from 'primeng/carousel';
import { Seccion2Component } from './seccion2/seccion2.component';
import { GaleriaComponent } from './galeria/galeria.component';
import { SeccionesComponent } from './secciones/secciones.component';
import { HistoriaComponent } from './historia/historia.component';
import { EventoComponent } from './evento/evento.component';

import {ButtonModule} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import { InputTextareaModule } from "primeng/inputtextarea";
import { InputTextModule } from "primeng/inputtext";


import { AngularFireModule} from '@angular/fire/compat';


import { environment } from 'src/environments/environment';
import { ProductosService } from '../servicios/productos.service';
import { EventoService } from '../servicios/evento.service';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { HistoriaService } from '../servicios/historia.service';
@NgModule({
  declarations: [
    PortadaComponent,
    CartaProductoComponent,
    CarruselDeCartasComponent,
    Seccion2Component,
    GaleriaComponent,
    SeccionesComponent,
    HistoriaComponent,
    EventoComponent,
    InicioSesionComponent
  ],
  imports: [
    CommonModule,
    RatingModule,
    FormsModule,
    ReactiveFormsModule,
    CarouselModule,
    ButtonModule,
    DialogModule,
    InputTextareaModule,
    InputTextModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  exports:[
  //Exportamos los componentes
    PortadaComponent,
    CartaProductoComponent,
    CarruselDeCartasComponent,
    PortadaComponent,
    Seccion2Component,
    GaleriaComponent,
    SeccionesComponent,
    HistoriaComponent,
    EventoComponent,
    InicioSesionComponent
  ],
  providers:[ProductosService, EventoService, HistoriaService]
})
export class ComponentesModule { }
