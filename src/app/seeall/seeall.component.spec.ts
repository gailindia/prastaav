import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeallComponent } from './seeall.component';

describe('SeeallComponent', () => {
  let component: SeeallComponent;
  let fixture: ComponentFixture<SeeallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SeeallComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SeeallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
