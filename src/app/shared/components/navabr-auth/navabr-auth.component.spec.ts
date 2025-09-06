import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavabrAuthComponent } from './navabr-auth.component';

describe('NavabrAuthComponent', () => {
  let component: NavabrAuthComponent;
  let fixture: ComponentFixture<NavabrAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavabrAuthComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavabrAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
