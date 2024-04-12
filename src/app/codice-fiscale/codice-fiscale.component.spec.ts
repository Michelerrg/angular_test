import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodiceFiscaleComponent } from './codice-fiscale.component';

describe('CodiceFiscaleComponent', () => {
  let component: CodiceFiscaleComponent;
  let fixture: ComponentFixture<CodiceFiscaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CodiceFiscaleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CodiceFiscaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
