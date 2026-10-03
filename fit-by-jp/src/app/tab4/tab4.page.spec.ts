import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';

import { tab4PageModule } from './tab4.module';
import { tab4Page } from './tab4.page';

describe('tab4Page', () => {
  let component: tab4Page;
  let fixture: ComponentFixture<tab4Page>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [tab4PageModule, RouterModule.forRoot([])]
    }).compileComponents();

    fixture = TestBed.createComponent(tab4Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
