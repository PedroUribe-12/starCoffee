import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/modelos/producto';

@Component({
  selector: 'app-carrusel-de-cartas',
  templateUrl: './carrusel-de-cartas.component.html',
  styleUrls: ['./carrusel-de-cartas.component.scss']
})
export class CarruselDeCartasComponent implements OnInit {
  productos:Producto[]=[]
  responsiveOptions:any=[]
  constructor() {
    this.responsiveOptions = [
      {
        breakpoint: '1080px',
        numVisible: 3,
        numScroll: 3
    },
      {
          breakpoint: '1024px',
          numVisible: 3,
          numScroll: 3
      },
      {
          breakpoint: '820px',
          numVisible: 2,
          numScroll: 2
      },
      {
          breakpoint: '590px',
          numVisible: 1,
          numScroll: 1
      }
  ];

    this.productos=[
      {
        nombre:'Cappuccino',
        descripcion:'zarpado en sabor',
        imagen:'../../../assets/imagenes/Cappuccino.png',
        puntuacion:4
      },
      {
        nombre:'Cappuccino',
        descripcion:'zarpado en sabor',
        imagen:'../../../assets/imagenes/producto2.png',
        puntuacion:4
      },
      {
        nombre:'Cappuccino',
        descripcion:'zarpado en sabor',
        imagen:'../../../assets/imagenes/producto3.png',
        puntuacion:4
      },
      {
        nombre:'Cappuccino',
        descripcion:'zarpado en sabor',
        imagen:'../../../assets/imagenes/Cappuccino.png',
        puntuacion:4
      },
      {
        nombre:'Cappuccino',
        descripcion:'zarpado en sabor',
        imagen:'../../../assets/imagenes/Cappuccino.png',
        puntuacion:4
      },
      {
        nombre:'Cappuccino',
        descripcion:'zarpado en sabor',
        imagen:'../../../assets/imagenes/Cappuccino.png',
        puntuacion:4
      },
      {
        nombre:'Cappuccino',
        descripcion:'zarpado en sabor',
        imagen:'../../../assets/imagenes/Cappuccino.png',
        puntuacion:4
      }
    ]
   }

  ngOnInit(): void {
  }

}
