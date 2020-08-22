import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuechuaPersonComponent } from './quechua-person.component';

describe('QuechuaPersonComponent', () => {
  let component: QuechuaPersonComponent;
  let fixture: ComponentFixture<QuechuaPersonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuechuaPersonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuechuaPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
