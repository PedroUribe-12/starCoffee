import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioComponent } from './inicio/inicio.component';
import { ComponentesModule } from '../componentes/componentes.module';
import { Seccion1Service } from '../servicios/seccion1.service';
import { Seccion3Service } from '../servicios/seccion3.service';



@NgModule({
  declarations: [
    InicioComponent
  ],
  imports: [
    CommonModule,
    ComponentesModule,
   
  ],
  providers: [
    Seccion1Service,
    Seccion3Service
  ]
})
export class PaginasModule { }
