import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Historia } from 'src/app/modelos/historia';
import { HistoriaService } from 'src/app/servicios/historia.service';
import { StorageHistoriaService } from 'src/app/servicios/storage-historia.service';

@Component({
  selector: 'app-historia',
  templateUrl: './historia.component.html',
  styleUrls: ['./historia.component.scss']
})
export class HistoriaComponent implements OnInit {

   //Creamos la propiedad portada que guardara un arreglo de tipo Portada que si o si se le debera asignar un valor más tarde
   historias!: Historia[];

   //Creamos la propiedad modalVisible para activar el modal
   modalVisible: boolean = false;
 
   //Creamos la propiedad imagen que sera opcionalmente de tipo string
   imagen?: string;
 
   //Creamos la propiedad historiaSeleccionada de tipo Portada que si o si se le debera asignar un valor más tarde
   historiaSeleccionada!:Historia;
 
   //Creamos la propiedad nombreImagen de tipo string vacio
   nombreImagen: string = '';
 
   constructor( private servicioHistoria: HistoriaService, private storageHistoria: StorageHistoriaService){ /* Injectamos los servicios PortadaService y AlmacenamientoService*/
   }
   @Input() admin:boolean=false;
 
   ngOnInit(){
     //Nos suscribimos a los cambios de la colleccion
     this.servicioHistoria.obtenerHistoria().subscribe(historia => {
       //luego lo guardamos en portadas que fue declarada fuera del ngOnInit
       this.historias = historia;
     }) 
   }
 
   // Creamos la propiedad nuevaHistoria que comprobara si los datos se han llenado o no
   nuevaHistoria= new FormGroup({
     //los datos a llenar serian aquellos input con el FormControlName llamado titulo
     descripcion: new FormControl('', Validators.required),
   });
 
   //Creamos el metodo mostrarEditar que recibira por parametro historiaSeleccionada de tipo Portada
   mostrarEditar(historiaSeleccionada:Historia){
 
     //Cambiamos el valor del modalVisible a true, para que el modal se abra
     this.modalVisible = true;
 
     //Asignamos la historiaSeleccionada enviada por parametro a la historiaSeleccionada declarada fuera del mostrarEditar
     this.historiaSeleccionada = historiaSeleccionada;
 
     //Asinamos los valores de la historiaSeleccionada a la nuevaHistoria, para que al abrir el modal se encuentren los valores que estan actualmente
     this.nuevaHistoria.setValue({
        descripcion:historiaSeleccionada.descripcion,
     })
   }
 
   //Creamos el metodo actualizar portada
   actualizarHistoria(){
 
     //Creamos el objeto nuevaHistoria que almacenara los datos puestos en el formulario y los valores de la historiaSeleccionada
     let nuevaHistoria: Historia = {
       descripcion: this.nuevaHistoria.value.descripcion!,
       idHistoria: this.historiaSeleccionada.idHistoria
     }
 
     //si no faltan campos por rellenar entrara al if
     if(this.nuevaHistoria.valid){
       //si el usuario a seleccionado una imagen en el formulario entonces entrara al if
       if(this.imagen){
         //Se invocara el metodo eliminarImagen con el parametro historiaSeleccionada.imagen que representa el nombre de la misma, para borrar la imagen de la base de datos
         this.storageHistoria.eliminarImagen(this.historiaSeleccionada.imagenHistoria);
         //Se invocara el metodo de subirImagen con los parametros nombreImagen y la imagen, para subir la imagen a la base de datos
         this.storageHistoria.subirImagen(this.nombreImagen, this.imagen)
         .then(async resp => {
           this.storageHistoria.obtenerUrlImagen(resp).then(
             async url => {
               //Esperara a que los cambios sean ejecutados 
               await this.servicioHistoria.editarHistoria(nuevaHistoria.idHistoria,nuevaHistoria, url).then(historia => {
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
         this.servicioHistoria.editarHistoria(nuevaHistoria.idHistoria,nuevaHistoria).then(platillo => {
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
     //this.storageHistoria.eliminarImagen(this.historiaSeleccionada.imagen);
     
   
       /* this.servicioHistoria.editarPortada(nuevaHistoria.idPortada,nuevaHistoria).then(platillo => {
         console.log(this.imagen);
         
         alert('Portada actualizada')
       })
       .catch(error => {
         alert('Ocurrio un error\nError: ' + error)
       }) */
     
     
     
     
    /*  this.servicioHistoria.editarPortada(this.historiaSeleccionada.idPortada, nuevaHistoria).then((resp)=>{
       alert('Portada Actualizada con exito')
     })
     .catch((error)=>{
       alert('No se pudo actualizar la Portada \n Error: '+error)
     }) */
   }
 
   //Creamos el metodo cargarPortada
   cargarHistoria(){
     //Este metodo invocara el metodo actualizarPortada
     this.actualizarHistoria();
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
