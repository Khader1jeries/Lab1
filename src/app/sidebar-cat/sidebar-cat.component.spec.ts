import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideCatComponent } from './sidebar-cat.component';

describe('SidebarCatComponent', () => {
  let component: SideCatComponent;
  let fixture: ComponentFixture<SideCatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideCatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideCatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
