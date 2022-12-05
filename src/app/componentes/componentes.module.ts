import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortadaComponent } from './portada/portada.component';
import { BrowserModule } from '@angular/platform-browser';
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
import { InputTextareaModule } from "primeng/inputtextarea";
import { InputTextModule } from "primeng/inputtext";
import { Seccion1Service } from '../servicios/seccion1.service';
import { StorageService } from '../servicios/storage.service';
import { Seccion1Component } from './seccion1/seccion1.component';
import { Seccion3Component } from './seccion3/seccion3.component';
import { AngularFireModule} from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { ProductosService } from '../servicios/productos.service';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import {ButtonModule} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlmacenamientoSeccion2Service } from '../servicios/almacenamiento-seccion2.service';
import { Seccion2Service } from '../servicios/seccion2.service';
import { AlmacenamientoService } from '../servicios/almacenamiento.service';
import { InicioSesionService } from '../servicios/inicio-sesion.service';



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
    Seccion3Component,
    InicioSesionComponent
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
    ButtonModule,
    DialogModule,
    BrowserAnimationsModule,
    BrowserModule,
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
    Seccion3Component,
    InicioSesionComponent
  ],
  providers:[
    Seccion1Service,
    StorageService,
    ProductosService,
    InicioSesionService,
    AlmacenamientoSeccion2Service,
    Seccion2Service,
    AlmacenamientoService
  ]
})
export class ComponentesModule { }
