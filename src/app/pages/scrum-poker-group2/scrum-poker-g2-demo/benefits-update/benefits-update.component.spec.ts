import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BenefitsUpdateComponent } from './benefits-update.component';

describe('BenefitsUpdateComponent', () => {
  let component: BenefitsUpdateComponent;
  let fixture: ComponentFixture<BenefitsUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BenefitsUpdateComponent ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(BenefitsUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
