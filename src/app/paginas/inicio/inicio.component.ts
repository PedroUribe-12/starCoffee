import { Component, OnInit } from '@angular/core';
import { Seccion1Service } from 'src/app/servicios/seccion1.service';
import { Seccion3Service } from 'src/app/servicios/seccion3.service';
import { Seccion1 } from 'src/app/modelos/seccion1';
import { Seccion3 } from 'src/app/modelos/seccion3';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  //datos que le van a dar a un componente que esta usando input
    titulo1:string=""
    eslogan1:string=""
    imagen1:string=''
  //datos que le van a dar a un componente que esta usando input
    titulo2:string=""
    eslogan2:string=""
    imagen2:string=''

//inyectamos los servicios
  constructor(private servicioSeccion1:Seccion1Service) { }
  //declaramos las interfaces
  secciones1!: Seccion1[];
  secciones3!: Seccion3[];

  ngOnInit(): void {

    //llamamos el metodo "getSeccion1" del servicio Seccion1Service
    this.servicioSeccion1.getSeccion1().subscribe(colSeciones1=>{
      this.secciones1= colSeciones1
      //recoreemos el arreglo para mostrar los respectivos datos
      for (let index = 0; index < colSeciones1.length; index++) {
        const element = colSeciones1[0];
        const element2= colSeciones1[1]
        console.log(colSeciones1)
         //Le asignamos un dato a titulo1 que viene de la base de datos
        this.titulo1= element2.titulo
         //Le asignamos un dato a eslogan1 que viene de la base de datos
        this.eslogan1= element2.descripcion
        this.imagen1= element2.imagen

        this.titulo2=element.titulo
        this.eslogan2=element.descripcion
        this.imagen2=element.imagen
        console.log(element.idSeccion)
      }
    })
    
    
   
  }

  

  
}
