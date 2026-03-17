import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiTipsComponent } from './ai-tips.component';

describe('AiTipsComponent', () => {
  let component: AiTipsComponent;
  let fixture: ComponentFixture<AiTipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AiTipsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AiTipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
