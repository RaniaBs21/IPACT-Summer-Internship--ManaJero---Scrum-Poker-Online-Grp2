import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPseudoComponent } from './user-pseudo.component';

describe('UserPseudoComponent', () => {
  let component: UserPseudoComponent;
  let fixture: ComponentFixture<UserPseudoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserPseudoComponent ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserPseudoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
