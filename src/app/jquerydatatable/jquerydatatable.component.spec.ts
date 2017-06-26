import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JquerydatatableComponent } from './jquerydatatable.component';

describe('JquerydatatableComponent', () => {
  let component: JquerydatatableComponent;
  let fixture: ComponentFixture<JquerydatatableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JquerydatatableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JquerydatatableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
