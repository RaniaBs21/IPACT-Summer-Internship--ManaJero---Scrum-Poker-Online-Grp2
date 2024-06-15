import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrumPokerGroup2DemoComponent } from './scrum-poker-group2-demo.component';

describe('ScrumPokerGroup2DemoComponent', () => {
  let component: ScrumPokerGroup2DemoComponent;
  let fixture: ComponentFixture<ScrumPokerGroup2DemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScrumPokerGroup2DemoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScrumPokerGroup2DemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
