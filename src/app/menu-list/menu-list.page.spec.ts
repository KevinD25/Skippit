import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuListPage } from './menu-list.page';

describe('MenuListPage', () => {
  let component: MenuListPage;
  let fixture: ComponentFixture<MenuListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
