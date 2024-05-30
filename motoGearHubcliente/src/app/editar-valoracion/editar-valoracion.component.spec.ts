import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarValoracionComponent } from './editar-valoracion.component';

describe('EditarValoracionComponent', () => {
  let component: EditarValoracionComponent;
  let fixture: ComponentFixture<EditarValoracionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditarValoracionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarValoracionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
