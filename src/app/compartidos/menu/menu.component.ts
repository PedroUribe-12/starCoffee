import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const btnmenu = document.querySelector(".nav_toggle")
    const menu = document.querySelector(".nav_menu")
    const menu2= document.querySelector(".nav_administracion")
    btnmenu?.addEventListener("click", function(){
      menu?.classList.toggle("nav_menu_visible")
      menu2?.classList.toggle("nav_menu_visible")
    })

    //medotodo scrol
    window.addEventListener("scroll", function(){
      var header = document.querySelector("header")
      header?.classList.toggle("abajo", window.scrollY>50)
    })
  }

}
