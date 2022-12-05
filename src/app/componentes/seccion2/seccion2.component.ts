import { Component, OnInit } from '@angular/core';
import { Seccion2 } from 'src/app/modelos/seccion2';
import { AlmacenamientoSeccion2Service } from 'src/app/servicios/almacenamiento-seccion2.service';
import { Seccion2Service } from 'src/app/servicios/seccion2.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-seccion2',
  templateUrl: './seccion2.component.html',
  styleUrls: ['./seccion2.component.scss']
})
export class Seccion2Component implements OnInit {
//Creamos la propiedad Secciones2 que guardara un arreglo de tipo Seccion2 que si o si se le debera asignar un valor más tarde
secciones2!: Seccion2[];

//Creamos la propiedad modalVisible para activar el modal
modalVisible: boolean = false;

//Creamos la propiedad imagen que sera opcionalmente de tipo string
imagen?: string;

//Creamos la propiedad seccion2Seleccionada de tipo Seccion2 que si o si se le debera asignar un valor más tarde
seccion2Seleccionada!:Seccion2;

//Creamos la propiedad nombreImagen de tipo string vacio
nombreImagen: string = '';

constructor( /* Injectamos los servicios Seccion2Service y AlmacenamientoSeccion2Service*/private servicioSeccion2: Seccion2Service, private servicioAlmacenamietoSeccion2: AlmacenamientoSeccion2Service){

}

ngOnInit(){
  //Nos suscribimos a los cambios de la colleccion
  this.servicioSeccion2.obtenerSeccion2().subscribe(seccion => {
    //luego lo guardamos en secciones2 que fue declarada fuera del ngOnInit
    this.secciones2 = seccion;
  }) 
}

// Creamos la propiedad nuevaSeccion2 que comprobara si los datos se han llenado o no
nuevaSeccion2= new FormGroup({
  //los datos a llenar serian aquellos input con el FormControlName llamado titulo
  titulo: new FormControl('', Validators.required),
  //los datos a llenar serian aquellos input con el FormControlName llamado subtitulo
  subtitulo: new FormControl('', Validators.required),
   //los datos a llenar serian aquellos input con el FormControlName llamado informacion
  informacion: new FormControl('', Validators.required),
});

//Creamos el metodo mostrarEditar que recibira por parametro seccion2Seleccionada de tipo Seccion2
mostrarEditar(seccion2Seleccionada:Seccion2){

  //Cambiamos el valor del modalVisible a true, para que el modal se abra
  this.modalVisible = true;

  //Asignamos la seccion2Seleccionada enviada por parametro a la seccion2Seleccionada declarada fuera del mostrarEditar
  this.seccion2Seleccionada = seccion2Seleccionada;

  //Asinamos los valores de la seccion2Seleccionada a la nuevaSeccion2, para que al abrir el modal se encuentren los valores que estan actualmente
  this.nuevaSeccion2.setValue({
    titulo:seccion2Seleccionada.titulo,
    subtitulo:seccion2Seleccionada.subtitulo,
    informacion:seccion2Seleccionada.informacion
  })
}

//Creamos el metodo actualizarSeccion2
actualizarSeccion2(){

  //Creamos el objeto nuevaSeccion2 que almacenara los datos puestos en el formulario y los valores de la seccion2Seleccionada
  let nuevaSeccion2: Seccion2 = {
    titulo: this.nuevaSeccion2.value.titulo!,
    subtitulo: this.nuevaSeccion2.value.subtitulo!,
    idSeccion2: this.seccion2Seleccionada.idSeccion2,
    informacion: this.nuevaSeccion2.value.informacion!,
    imagen: this.seccion2Seleccionada.imagen,
  }

  //si no faltan campos por rellenar entrara al if
  if(this.nuevaSeccion2.valid){
    //si el usuario a seleccionado una imagen en el formulario entonces entrara al if
    if(this.imagen){
      //Se invocara el metodo eliminarImagen con el parametro seccion2Seleccionada.imagen que representa el nombre de la misma, para borrar la imagen de la base de datos
      this.servicioAlmacenamietoSeccion2.eliminarImagen(this.seccion2Seleccionada.imagen);
      //Se invocara el metodo de subirImagen con los parametros nombreImagen y la imagen, para subir la imagen a la base de datos
      this.servicioAlmacenamietoSeccion2.subirImagen(this.nombreImagen, this.imagen)
      .then(async resp => {
        this.servicioAlmacenamietoSeccion2.obtenerUrlImagen(resp).then(
          async url => {
            //Esperara a que los cambios sean ejecutados 
            await this.servicioSeccion2.editarSeccion2(nuevaSeccion2.idSeccion2,nuevaSeccion2, url).then(platillo => {
              //Y luego nos mostrara la suguiente alerta
              alert('Seccion2 actualizada');
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
      this.servicioSeccion2.editarSeccion2(nuevaSeccion2.idSeccion2,nuevaSeccion2).then(platillo => {
        alert('Seccion2 actualizada sin imagen')
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
  
}

//Creamos el metodo cargarSeccion2
cargarSeccion2(){
  //Este metodo invocara el metodo actualizarSeccion2
  this.actualizarSeccion2();
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
