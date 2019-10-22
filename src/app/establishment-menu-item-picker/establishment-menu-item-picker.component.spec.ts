import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstablishmentMenuItemPickerComponent } from './establishment-menu-item-picker.component';

describe('EstablishmentMenuItemPickerComponent', () => {
  let component: EstablishmentMenuItemPickerComponent;
  let fixture: ComponentFixture<EstablishmentMenuItemPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstablishmentMenuItemPickerComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstablishmentMenuItemPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
