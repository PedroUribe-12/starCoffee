import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class InicioSesionService {
  admin=false
  constructor(private auth:AngularFireAuth) { }

  registro(email:any, contrasena:any){
    this.auth.createUserWithEmailAndPassword(email, contrasena)
    .then(res=> {
      this.verificarCorreo()  
    })
    .catch(error=> alert(error))
  }
  iniciarSesion(email:any, contrasena:any){
    this.auth.signInWithEmailAndPassword(email, contrasena)
    .then((res)=>{
      this.admin=true
      alert("Se inicio sesion correctamente")
    })
    .catch((error)=>{
      alert(error)
    })
  }
  cerrarSesion(){
    this.auth.signOut()
  }
  verificarCorreo(){
    this.auth.currentUser
    .then((user)=> user?.sendEmailVerification())
    .then(()=>{
      alert('Se envio un correo de verificacion')
    })
  }
  traerUsuario(){
    this.auth.authState.subscribe(
     async usu => {
      let nombre = await usu?.email
      return nombre
    }
    )
  }
}

