import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondStepComponent } from './second-step.component';

describe('SecondStepComponent', () => {
  let component: SecondStepComponent;
  let fixture: ComponentFixture<SecondStepComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SecondStepComponent]
    });
    fixture = TestBed.createComponent(SecondStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
