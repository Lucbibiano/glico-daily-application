import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlucoseModalComponent } from './glucose-modal.component';

describe('GlucoseModalComponent', () => {
  let component: GlucoseModalComponent;
  let fixture: ComponentFixture<GlucoseModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GlucoseModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GlucoseModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
