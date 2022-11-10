import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PieDePaginaComponent } from './pie-de-pagina/pie-de-pagina.component';
import { RouterModule } from '@angular/router';

import { MenuComponent } from './menu/menu.component';

@NgModule({
  declarations: [
    PieDePaginaComponent,
    MenuComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[
    PieDePaginaComponent,
    MenuComponent
  ]
})
export class CompartidosModule { }
