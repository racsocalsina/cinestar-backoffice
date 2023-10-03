import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsRankingComponent } from './clients-ranking.component';

describe('ClientsRankingComponent', () => {
  let component: ClientsRankingComponent;
  let fixture: ComponentFixture<ClientsRankingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientsRankingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientsRankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
