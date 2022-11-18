import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarruselDeCartasComponent } from './carrusel-de-cartas.component';

describe('CarruselDeCartasComponent', () => {
  let component: CarruselDeCartasComponent;
  let fixture: ComponentFixture<CarruselDeCartasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarruselDeCartasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarruselDeCartasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
