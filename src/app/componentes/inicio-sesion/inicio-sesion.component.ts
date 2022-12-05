import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InicioSesionService } from 'src/app/servicios/inicio-sesion.service';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.scss']
})
export class InicioSesionComponent implements OnInit {
  iniciar:boolean=true
  registrar:boolean=false
  textoBoton='Iniciar Sesion'
  usuario:any
  @Output() admin = new EventEmitter<boolean>(false);
  datosUsuario = new FormGroup({
    email:new FormControl('',Validators.required),
    contrasena:new FormControl('',Validators.required)
  })
  constructor( private authConEmail:InicioSesionService, private firebaseAuth:AngularFireAuth) { }
  
  ngOnInit(): void {
    // this.authConEmail
    // this.firebaseAuth.currentUser.then(user => {
    //   if(user && user.emailVerified) {
    //     this.usuario = user.email;
    //     this.verificarAdmin(this.usuario)
    //   }
    // })
    // console.log(this.usuario)
  }
  iniciarVisible(){
    this.iniciar=true
    this.textoBoton='Iniciar Sesion'
  }
  registrarVisible(){
    this.iniciar=false
    this.textoBoton='Registrarse'
  }
  limpiarFormulario(){
    this.datosUsuario.reset()
  }
   enviarDatos(){
    if(this.textoBoton==='Registrarse'){
      this.authConEmail.registro(this.datosUsuario.value.email, this.datosUsuario.value.contrasena)
      this.limpiarFormulario()
    }else if(this.textoBoton === 'Iniciar Sesion'){
      this.authConEmail.iniciarSesion(this.datosUsuario.value.email, this.datosUsuario.value.contrasena)
      this.usuario = this.datosUsuario.value.email
      this.verificarAdmin()
      this.limpiarFormulario()
    }
  }
  verificarAdmin(){
    if( this.usuario ==="josecarlosilafaya@gmail.com"){
      this.admin.emit(true)
    }else if(this.usuario==undefined){
      this.admin.emit(false)
    }
  }
}
