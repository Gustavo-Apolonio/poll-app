/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GlassmorphComponent } from './glassmorph.component';

describe('GlassmorphComponent', () => {
  let component: GlassmorphComponent;
  let fixture: ComponentFixture<GlassmorphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlassmorphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlassmorphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
