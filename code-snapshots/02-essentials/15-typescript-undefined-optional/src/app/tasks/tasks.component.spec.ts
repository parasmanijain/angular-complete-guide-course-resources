import { TestBed } from '@angular/core/testing';
import { TasksComponent } from './tasks.component';

describe('TasksComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TasksComponent],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(TasksComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should accept optional name input', () => {
    const fixture = TestBed.createComponent(TasksComponent);
    const component = fixture.componentInstance;
    component.name = 'Test Name';
    expect(component.name).toBe('Test Name');
  });

  it('should handle undefined name input', () => {
    const fixture = TestBed.createComponent(TasksComponent);
    const component = fixture.componentInstance;
    expect(component.name).toBeUndefined();
  });
});
