import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MortifagoCard } from './mortifago-card';

describe('MortifagoCard', () => {
  let component: MortifagoCard;
  let fixture: ComponentFixture<MortifagoCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MortifagoCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MortifagoCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
