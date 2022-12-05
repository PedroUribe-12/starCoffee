import { Component, Input, OnInit } from '@angular/core';
import { Seccion3 } from 'src/app/modelos/seccion3';
import { Seccion3Service } from 'src/app/servicios/seccion3.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StorageService } from 'src/app/servicios/storage.service';
import { async } from 'rxjs';
import { StorageSeccion3Service } from 'src/app/servicios/storage-seccion3.service';
@Component({
  selector: 'app-seccion3',
  templateUrl: './seccion3.component.html',
  styleUrls: ['./seccion3.component.scss']
})
export class Seccion3Component implements OnInit {
//Creamos la propiedad portada que guardara un arreglo de tipo Portada que si o si se le debera asignar un valor más tarde
secciones3!: Seccion3[];

//Creamos la propiedad modalVisible para activar el modal
modalVisible: boolean = false;

//Creamos la propiedad imagen que sera opcionalmente de tipo string
imagen?: string;

//Creamos la propiedad seccion3Seleccionada de tipo Portada que si o si se le debera asignar un valor más tarde
seccion3Seleccionada!:Seccion3;


@Input() admin:boolean=false;

//Creamos la propiedad nombreImagen de tipo string vacio
nombreImagen: string = '';

constructor( private servicioSeccion3: Seccion3Service, private storageSeccion3: StorageSeccion3Service){ /* Injectamos los servicios PortadaService y AlmacenamientoService*/
}

ngOnInit(){
  //Nos suscribimos a los cambios de la colleccion
  this.servicioSeccion3.obtenerSeccion3().subscribe(seccion => {
    //luego lo guardamos en portadas que fue declarada fuera del ngOnInit
    this.secciones3 = seccion;
  }) 
}

// Creamos la propiedad nuevaSeccion3 que comprobara si los datos se han llenado o no
nuevaSeccion3= new FormGroup({
  //los datos a llenar serian aquellos input con el FormControlName llamado titulo
  titulo: new FormControl('', Validators.required),
  //los datos a llenar serian aquellos input con el FormControlName llamado subtitulo
  subtitulo: new FormControl('', Validators.required)
});

//Creamos el metodo mostrarEditar que recibira por parametro seccion3Seleccionada de tipo Portada
mostrarEditar(seccion3Seleccionada:Seccion3){

  //Cambiamos el valor del modalVisible a true, para que el modal se abra
  this.modalVisible = true;

  //Asignamos la seccion3Seleccionada enviada por parametro a la seccion3Seleccionada declarada fuera del mostrarEditar
  this.seccion3Seleccionada = seccion3Seleccionada;

  //Asinamos los valores de la seccion3Seleccionada a la nuevaSeccion3, para que al abrir el modal se encuentren los valores que estan actualmente
  this.nuevaSeccion3.setValue({
    titulo:seccion3Seleccionada.titulo,
    subtitulo:seccion3Seleccionada.subtitulo,
  })
}

//Creamos el metodo actualizar portada
actualizarSeccion3(){

  //Creamos el objeto nuevaSeccion3 que almacenara los datos puestos en el formulario y los valores de la seccion3Seleccionada
  let nuevaSeccion3: Seccion3 = {
    titulo: this.nuevaSeccion3.value.titulo!,
    subtitulo: this.nuevaSeccion3.value.subtitulo!,
    idSeccion3: this.seccion3Seleccionada.idSeccion3,
    imagen: this.seccion3Seleccionada.imagen,
  }

  //si no faltan campos por rellenar entrara al if
  if(this.nuevaSeccion3.valid){
    //si el usuario a seleccionado una imagen en el formulario entonces entrara al if
    if(this.imagen){
      //Se invocara el metodo eliminarImagen con el parametro seccion3Seleccionada.imagen que representa el nombre de la misma, para borrar la imagen de la base de datos
      this.storageSeccion3.eliminarImagen(this.seccion3Seleccionada.imagen);
      //Se invocara el metodo de subirImagen con los parametros nombreImagen y la imagen, para subir la imagen a la base de datos
      this.storageSeccion3.subirImagen(this.nombreImagen, this.imagen)
      .then(async resp => {
        this.storageSeccion3.obtenerUrlImagen(resp).then(
          async url => {
            //Esperara a que los cambios sean ejecutados 
            await this.servicioSeccion3.editarSeccion3(nuevaSeccion3.idSeccion3,nuevaSeccion3, url).then(seccion3 => {
              //Y luego nos mostrara la suguiente alerta
              alert('Seccion3 actualizada');
            })
            //En caso de un error, lo encapsularemos
            .catch(error => {
              //Y luego lo mostraremos en la siguiente alerta
              alert('Ocurrio un error\nError: ' + error);
            })
          }
        )
      })
    }else{
      //En caso de que el usuario no haya seleccionado una imagen, simplemente se modificara el texto
      this.servicioSeccion3.editarSeccion3(nuevaSeccion3.idSeccion3,nuevaSeccion3).then(seccion3 => {
        alert('Seccion3 actualizada sin imagen')
      })
      //En caso de algun error, lo encapsularemos
      .catch(error => {
        //Y luego lo mostraremos en el siguiente alert
        alert('Ocurrio un error\nError: ' + error)
      })
    }
  //En caso de que no se hayan rellenado los inputs con los datos y esten vacios entrara al else  
  }else{
    //Y mostrara el siguiente alert
    alert('Faltan rellenar campos')
  }

  this.imagen = undefined;

  //Y luego modificara el valor del modalVisible a false, para que el modal se cierre
  this.modalVisible = false;
  //this.storageSeccion3.eliminarImagen(this.seccion3Seleccionada.imagen);
  

    /* this.servicioSeccion3.editarPortada(nuevaSeccion3.idSeccion3,nuevaSeccion3).then(platillo => {
      console.log(this.imagen);
      
      alert('Portada actualizada')
    })
    .catch(error => {
      alert('Ocurrio un error\nError: ' + error)
    }) */
  
  
  
  
 /*  this.servicioSeccion3.editarPortada(this.seccion3Seleccionada.idSeccion3, nuevaSeccion3).then((resp)=>{
    alert('Portada Actualizada con exito')
  })
  .catch((error)=>{
    alert('No se pudo actualizar la Portada \n Error: '+error)
  }) */
}

//Creamos el metodo cargarPortada
cargarSeccion3(){
  //Este metodo invocara el metodo actualizarSeccion3
  this.actualizarSeccion3();
}

cargarImagen(event: any){
  let archivo = event.target.files[0];//traemos los datos del objeto
  let reader = new FileReader();//creamos una variable reader para que nos permite leer los ficheros almacenados en el cliente de forma asíncrona
  if(archivo!=undefined){//Si el archivo es distinto a undefined
    reader.readAsDataURL(archivo);//lee el archivo y nos devuelve una URL
    reader.onload = () => {//En esta linea espera hasta que se cargue la imagen y encadena una funcion flecha
      let url = reader.result;//Nos otorga el resultado del reader.onload
      if(url!=null){//si la URL no es nula
        this.nombreImagen = archivo.name;
        this.imagen = url.toString();//Nos aseguramos que url sea de tipo String, utilizando el tipo String
      }
    }
  } 
}


}