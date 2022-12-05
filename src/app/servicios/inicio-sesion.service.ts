import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class InicioSesionService {
  //Declaracion de variables
  admin=false
  //inyeccion del angularfireauth
  constructor(private auth:AngularFireAuth) { }
  //Metodo para registrar al usuario
  registro(email:any, contrasena:any){
    this.auth.createUserWithEmailAndPassword(email, contrasena)//uso del metodo de firebase
    .then(res=> {
      //En caso de proceder bien, se llama a la funcion para enviar el correo de verificacion
      this.verificarCorreo()  
    })
    .catch(error=> alert(error))
  }
  //Metodo para iniciar sesion 
  iniciarSesion(email:any, contrasena:any){
    this.auth.signInWithEmailAndPassword(email, contrasena)//uso del metodo de firebase
    .then((res)=>{
      this.admin=true
      alert("Se inicio sesion correctamente")
    })
    .catch((error)=>{
      alert(error)
    })
  }
  //Metodo para cerrar sesion
  cerrarSesion(){
    this.auth.signOut()
  }
  //Metodo para enviar el correo de verificacion
  verificarCorreo(){
    this.auth.currentUser
    .then((user)=> user?.sendEmailVerification())
    .then(()=>{
      alert('Se envio un correo de verificacion')
    })
  }
  //Metodo para obtener el usuario actualmente logueado
  traerUsuario(){
    this.auth.authState.subscribe(
      usu => {
      let nombre =  usu?.email
      return nombre
    }
    )
  }
}

