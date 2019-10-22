import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailTabPage } from './detail-tab.page';

describe('DetailTabPage', () => {
  let component: DetailTabPage;
  let fixture: ComponentFixture<DetailTabPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailTabPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailTabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
