import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetControllerComponent } from './pet-controller.component';

describe('PetControllerComponent', () => {
  let component: PetControllerComponent;
  let fixture: ComponentFixture<PetControllerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PetControllerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PetControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
