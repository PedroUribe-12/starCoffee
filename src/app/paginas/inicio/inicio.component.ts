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
    imagen1:string='../../../assets/imagenes/medialunas.jpg'
  //datos que le van a dar a un componente que esta usando input
    titulo2:string=""
    eslogan2:string=""
    imagen2:string='../../../assets/imagenes/maquinas-para-cafeteria.png'

//inyectamos los servicios
  constructor(private servicioSeccion1:Seccion1Service, private servicioSeccion3:Seccion3Service) { }
  //declaramos las interfaces
  secciones1!: Seccion1[];
  secciones3!: Seccion3[];

  ngOnInit(): void {

    //llamamos el metodo "getSeccion1" del servicio Seccion1Service
    this.servicioSeccion1.getSeccion1().subscribe(colSeciones1=>{
      this.secciones1= colSeciones1
      //recoreemos el arreglo para mostrar los respectivos datos
      for (let index = 0; index < colSeciones1.length; index++) {
        const element = colSeciones1[index];
        console.log(colSeciones1)
         //Le asignamos un dato a titulo1 que viene de la base de datos
        this.titulo1= element.titulo
         //Le asignamos un dato a eslogan1 que viene de la base de datos
        this.eslogan1= element.descripcion
      }
    })
    //llamamos el metodo "getSeccion3" del servicio Seccion3Service
    this.servicioSeccion3.getSeccion3().subscribe(colSeccion3=>{
      this.secciones3= colSeccion3
       //recoreemos el arreglo para mostrar los respectivos datos
      for (let inde1 = 0; inde1 < colSeccion3.length; inde1++) {
        const element = colSeccion3[inde1];
        //Le asignamos un dato a titulo2 que viene de la base de datos
        this.titulo2= element.titulo
        //Le asignamos un dato a eslogan2 que viene de la base de datos
        this.eslogan2= element.descripcion
      }
    })
  }

  


  
}
