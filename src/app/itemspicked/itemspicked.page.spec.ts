import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemspickedPage } from './itemspicked.page';

describe('ItemspickedPage', () => {
  let component: ItemspickedPage;
  let fixture: ComponentFixture<ItemspickedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemspickedPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemspickedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
