import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EncodeItemComponent } from './encode-item.component';

describe('EncodeItemComponent', () => {
  let component: EncodeItemComponent;
  let fixture: ComponentFixture<EncodeItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EncodeItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EncodeItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
