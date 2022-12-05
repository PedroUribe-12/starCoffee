import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Portada } from 'src/app/modelos/portada';
import { AlmacenamientoService } from 'src/app/servicios/almacenamiento.service';
import { PortadaService } from 'src/app/servicios/portada.service';

@Component({
  selector: 'app-portada',
  templateUrl: './portada.component.html',
  styleUrls: ['./portada.component.scss']
})
export class PortadaComponent implements OnInit {

  //Creamos la propiedad portada que guardara un arreglo de tipo Portada que si o si se le debera asignar un valor más tarde
  portadas!: Portada[];

  //Creamos la propiedad modalVisible para activar el modal
  modalVisible: boolean = false;

  //Creamos la propiedad imagen que sera opcionalmente de tipo string
  imagen?: string;

  //Creamos la propiedad portadaSeleccionada de tipo Portada que si o si se le debera asignar un valor más tarde
  portadaSeleccionada!:Portada;

  //Creamos la propiedad nombreImagen de tipo string vacio
  nombreImagen: string = '';

  constructor( /* Injectamos los servicios PortadaService y AlmacenamientoService*/private servicioPortada: PortadaService, private servicioAlmacenamiento: AlmacenamientoService){

  }

  ngOnInit(){
    //Nos suscribimos a los cambios de la colleccion
    this.servicioPortada.obtenerPortada().subscribe(portada => {
      //luego lo guardamos en portadas que fue declarada fuera del ngOnInit
      this.portadas = portada;
    }) 
  }

  // Creamos la propiedad nuevaPortada que comprobara si los datos se han llenado o no
  nuevaPortada= new FormGroup({
    //los datos a llenar serian aquellos input con el FormControlName llamado titulo
    titulo: new FormControl('', Validators.required),
    //los datos a llenar serian aquellos input con el FormControlName llamado subtitulo
    subtitulo: new FormControl('', Validators.required)
  });

  //Creamos el metodo mostrarEditar que recibira por parametro portadaSeleccionada de tipo Portada
  mostrarEditar(portadaSeleccionada:Portada){

    //Cambiamos el valor del modalVisible a true, para que el modal se abra
    this.modalVisible = true;

    //Asignamos la portadaSeleccionada enviada por parametro a la portadaSeleccionada declarada fuera del mostrarEditar
    this.portadaSeleccionada = portadaSeleccionada;

    //Asinamos los valores de la portadaSeleccionada a la nuevaPortada, para que al abrir el modal se encuentren los valores que estan actualmente
    this.nuevaPortada.setValue({
      titulo:portadaSeleccionada.titulo,
      subtitulo:portadaSeleccionada.subtitulo,
    })
  }

  //Creamos el metodo actualizar portada
  actualizarPortada(){

    //Creamos el objeto nuevaPortada que almacenara los datos puestos en el formulario y los valores de la portadaSeleccionada
    let nuevaPortada: Portada = {
      titulo: this.nuevaPortada.value.titulo!,
      subtitulo: this.nuevaPortada.value.subtitulo!,
      idPortada: this.portadaSeleccionada.idPortada,
      imagen: this.portadaSeleccionada.imagen,
    }

    //si no faltan campos por rellenar entrara al if
    if(this.nuevaPortada.valid){
      //si el usuario a seleccionado una imagen en el formulario entonces entrara al if
      if(this.imagen){
        //Se invocara el metodo eliminarImagen con el parametro portadaSeleccionada.imagen que representa el nombre de la misma, para borrar la imagen de la base de datos
        this.servicioAlmacenamiento.eliminarImagen(this.portadaSeleccionada.imagen);
        //Se invocara el metodo de subirImagen con los parametros nombreImagen y la imagen, para subir la imagen a la base de datos
        this.servicioAlmacenamiento.subirImagen(this.nombreImagen, this.imagen)
        .then(async resp => {
          this.servicioAlmacenamiento.obtenerUrlImagen(resp).then(
            async url => {
              //Esperara a que los cambios sean ejecutados 
              await this.servicioPortada.editarPortada(nuevaPortada.idPortada,nuevaPortada, url).then(platillo => {
                //Y luego nos mostrara la suguiente alerta
                alert('Portada actualizada');
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
        this.servicioPortada.editarPortada(nuevaPortada.idPortada,nuevaPortada).then(platillo => {
          alert('Portada actualizada sin imagen')
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
    //this.servicioAlmacenamiento.eliminarImagen(this.PortadaSeleccionada.imagen);
    
  
      /* this.servicioPortada.editarPortada(nuevaPortada.idPortada,nuevaPortada).then(platillo => {
        console.log(this.imagen);
        
        alert('Portada actualizada')
      })
      .catch(error => {
        alert('Ocurrio un error\nError: ' + error)
      }) */
    
    
    
    
   /*  this.servicioPortada.editarPortada(this.PortadaSeleccionada.idPortada, nuevaPortada).then((resp)=>{
      alert('Portada Actualizada con exito')
    })
    .catch((error)=>{
      alert('No se pudo actualizar la Portada \n Error: '+error)
    }) */
  }

  //Creamos el metodo cargarPortada
  cargarPortada(){
    //Este metodo invocara el metodo actualizarPortada
    this.actualizarPortada();
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
