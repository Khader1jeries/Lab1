import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CombinedCatalogComponent } from './combined-catalog.component';

describe('CombinedCatalogComponent', () => {
  let component: CombinedCatalogComponent;
  let fixture: ComponentFixture<CombinedCatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CombinedCatalogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CombinedCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
