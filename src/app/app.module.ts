import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PaginasModule } from './paginas/paginas.module';
import { CompartidosModule } from './compartidos/compartidos.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { InicioSesionService } from './servicios/inicio-sesion.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PaginasModule,
    CompartidosModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AngularFireAuthModule
  ],
  providers: [InicioSesionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
