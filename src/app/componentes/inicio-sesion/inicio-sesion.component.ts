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
  //Declaracion de variables
  iniciar:boolean=true
  registrar:boolean=false
  textoBoton='Iniciar Sesion'
  usuario:any
  //Variables que se envian al componente padre
  @Output() admin = new EventEmitter<boolean>(false);

  //Valores del formulario
  datosUsuario = new FormGroup({
    email:new FormControl('',Validators.required),
    contrasena:new FormControl('',Validators.required)
  })

  //inyeccion de los servicios
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
  //Metodo para cambiar el formulario a iniciar sesion
  iniciarVisible(){
    this.iniciar=true
    this.textoBoton='Iniciar Sesion'
  }
  //Metodo para cambiar el formulario a registrarse
  registrarVisible(){
    this.iniciar=false
    this.textoBoton='Registrarse'
  }
  //Metodo para limpiar el formulario
  limpiarFormulario(){
    this.datosUsuario.reset()
  }
  //Metodo que registra o inicia sesion a un usuario en base a una variable
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
  //Metodo para verificar que el usuario sea el admin predefinido
  verificarAdmin(){
    if( this.usuario ==="josecarlosilafaya@gmail.com"){
      this.admin.emit(true)
    }else if(this.usuario==undefined){
      this.admin.emit(false)
    }
  }
}
