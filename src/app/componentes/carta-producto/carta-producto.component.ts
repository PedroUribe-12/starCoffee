import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-carta-producto',
  templateUrl: './carta-producto.component.html',
  styleUrls: ['./carta-producto.component.scss']
})
export class CartaProductoComponent implements OnInit {
  lectura=true
  puntuacion= 3;
  @Input() nombreProducto!:string;
  @Input() imagenProducto!:string;
  @Input() puntuacionProducto!:string;
  @Input() descripcionProducto!:string;
  constructor() { }

  ngOnInit(): void {
  }

}
