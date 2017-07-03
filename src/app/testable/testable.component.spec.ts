import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestableComponent } from './testable.component';

describe('TestableComponent', () => {
  let component: TestableComponent;
  let fixture: ComponentFixture<TestableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
