import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PieDePaginaComponent } from './pie-de-pagina/pie-de-pagina.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    PieDePaginaComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[
    PieDePaginaComponent
  ]
})
export class CompartidosModule { }
