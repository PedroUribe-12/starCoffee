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

import {AngularFireModule} from '@angular/fire/compat'
import { environment } from 'src/environments/environment';

import { Seccion1Service } from '../servicios/seccion1.service';
import { StorageService } from '../servicios/storage.service';
import { Seccion1Component } from './seccion1/seccion1.component';
import { Seccion3Component } from './seccion3/seccion3.component';


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
    Seccion1Component,
    Seccion3Component
  ],
  imports: [
    CommonModule,
    RatingModule,
    FormsModule,
    CarouselModule,
    ButtonModule,
    DialogModule,
    InputTextareaModule,
    InputTextModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    ReactiveFormsModule
    
  ],
  exports:[
  //Exportamos los componentes
    PortadaComponent,
    CartaProductoComponent,
    CarruselDeCartasComponent,
    PortadaComponent,
    Seccion2Component,
    GaleriaComponent,
    
    HistoriaComponent,
    EventoComponent,
    Seccion1Component,
    Seccion3Component
  ],
  providers:[
    Seccion1Service,
    StorageService
  ]
})
export class ComponentesModule { }
