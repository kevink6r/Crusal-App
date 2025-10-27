import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Fondo } from './fondo';

describe('Fondo', () => {
  let component: Fondo;
  let fixture: ComponentFixture<Fondo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Fondo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Fondo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
