import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserdiscountComponent } from './userdiscount.component';

describe('UserdiscountComponent', () => {
  let component: UserdiscountComponent;
  let fixture: ComponentFixture<UserdiscountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserdiscountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserdiscountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
