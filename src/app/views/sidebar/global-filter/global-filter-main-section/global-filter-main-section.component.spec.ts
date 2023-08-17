import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalFilterMainSectionComponent } from './global-filter-main-section.component';

describe('GlobalFilterMainSectionComponent', () => {
  let component: GlobalFilterMainSectionComponent;
  let fixture: ComponentFixture<GlobalFilterMainSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GlobalFilterMainSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GlobalFilterMainSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
