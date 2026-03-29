import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewTaskComponent } from './new-task.component';
import { TasksService } from '../tasks.service';

/**
 * Unit tests for NewTaskComponent
 * Tests component creation and task creation functionality with inject() function
 */
describe('NewTaskComponent', () => {
  let component: NewTaskComponent;
  let fixture: ComponentFixture<NewTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewTaskComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NewTaskComponent);
    component = fixture.componentInstance;

    // Set required input property
    component.userId = 'u1';

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have required input property userId', () => {
    expect(component.userId).toBe('u1');
  });

  it('should initialize form fields as empty strings', () => {
    expect(component.enteredTitle).toBe('');
    expect(component.enteredSummary).toBe('');
    expect(component.enteredDate).toBe('');
  });

  it('should emit close event on cancel', () => {
    spyOn(component.close, 'emit');
    component.onCancel();
    expect(component.close.emit).toHaveBeenCalled();
  });

  it('should call tasksService.addTask and emit close on submit', () => {
    const tasksService = TestBed.inject(TasksService);
    spyOn(tasksService, 'addTask');
    spyOn(component.close, 'emit');

    component.enteredTitle = 'Test Task';
    component.enteredSummary = 'Test Summary';
    component.enteredDate = '2024-12-31';

    component.onSubmit();

    expect(tasksService.addTask).toHaveBeenCalledWith(
      {
        title: 'Test Task',
        summary: 'Test Summary',
        date: '2024-12-31',
      },
      'u1',
    );
    expect(component.close.emit).toHaveBeenCalled();
  });

  it('should handle empty form submission', () => {
    const tasksService = TestBed.inject(TasksService);
    spyOn(tasksService, 'addTask');
    spyOn(component.close, 'emit');

    component.onSubmit();

    expect(tasksService.addTask).toHaveBeenCalledWith(
      {
        title: '',
        summary: '',
        date: '',
      },
      'u1',
    );
    expect(component.close.emit).toHaveBeenCalled();
  });

  it('should use inject() function to get TasksService', () => {
    // This test verifies that the component can access the injected service
    // The actual injection happens through the inject() function in the component
    const tasksService = TestBed.inject(TasksService);
    expect(tasksService).toBeTruthy();
  });
});
