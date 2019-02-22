import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterEditorComponent } from './recruiter-editor.component';

describe('RecruiterEditorComponent', () => {
  let component: RecruiterEditorComponent;
  let fixture: ComponentFixture<RecruiterEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecruiterEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecruiterEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
