import { Component, Input, OnInit } from '@angular/core';
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

  portadas!: Portada[];

  modalVisible: boolean = false;

  displayPosition: boolean = false;

  position: string = '';

  imagen?: string;

  PortadaSeleccionada!:Portada;

  nombreImagen: string = '';

  @Input() admin:boolean=false;
  constructor( private servicioPortada: PortadaService, private servicioAlmacenamiento: AlmacenamientoService){

  }

  ngOnInit(){
    this.servicioPortada.obtenerPortada().subscribe(portada => {
      this.portadas = portada;
    }) 
  }

  nuevaPortada= new FormGroup({
    titulo: new FormControl('', Validators.required),
    subtitulo: new FormControl('', Validators.required)
  });

  mostrarEditar(PortadaSeleccionada:Portada){

    this.modalVisible = true;

    this.PortadaSeleccionada = PortadaSeleccionada;

    this.nuevaPortada.setValue({
      titulo:PortadaSeleccionada.titulo,
      subtitulo:PortadaSeleccionada.subtitulo,
    })
  }

  actualizarPortada(){
    let nuevaPortada: Portada = {
      titulo: this.nuevaPortada.value.titulo!,
      subtitulo: this.nuevaPortada.value.subtitulo!,
      idPortada: this.PortadaSeleccionada.idPortada,
      imagen: this.PortadaSeleccionada.imagen,
    }

    if(this.imagen){
      this.servicioAlmacenamiento.eliminarImagen(this.PortadaSeleccionada.imagen);
      this.servicioAlmacenamiento.subirImagen(this.nombreImagen, this.imagen)
      .then(async resp => {
        this.servicioAlmacenamiento.obtenerUrlImagen(resp).then(
          async url => {
            await this.servicioPortada.editarPortada(nuevaPortada.idPortada,nuevaPortada, url).then(platillo => {
              alert('Portada actualizada');
            })
            .catch(error => {
              alert('Ocurrio un error\nError: ' + error);
            })
          }
        )
      })
    }else{
      this.servicioPortada.editarPortada(nuevaPortada.idPortada,nuevaPortada).then(platillo => {
        alert('Portada actualizada sin imagen')
      })
      .catch(error => {
        alert('Ocurrio un error\nError: ' + error)
      })
    }
    this.imagen = undefined;
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

  cargarPortada(){
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
