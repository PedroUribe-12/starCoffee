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
import { PortadaService } from './servicios/portada.service';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { AlmacenamientoService } from './servicios/almacenamiento.service';

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
    AngularFireModule.initializeApp(environment.firebaseConfig),
  ],
  providers: [PortadaService, AlmacenamientoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
