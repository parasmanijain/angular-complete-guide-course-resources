import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TasksComponent } from './tasks.component';
import { TasksService } from './tasks.service';

/**
 * Unit tests for TasksComponent
 * Tests component creation and task management functionality
 */
describe('TasksComponent', () => {
  let component: TasksComponent;
  let fixture: ComponentFixture<TasksComponent>;
  let tasksService: jasmine.SpyObj<TasksService>;

  beforeEach(async () => {
    const tasksServiceSpy = jasmine.createSpyObj('TasksService', [
      'getUserTasks',
      'addTask',
    ]);

    await TestBed.configureTestingModule({
      imports: [TasksComponent],
      providers: [{ provide: TasksService, useValue: tasksServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(TasksComponent);
    component = fixture.componentInstance;
    tasksService = TestBed.inject(TasksService) as jasmine.SpyObj<TasksService>;

    // Set required input properties
    component.userId = 'u1';
    component.name = 'Test User';

    // Setup default spy return values
    tasksService.getUserTasks.and.returnValue([
      {
        id: 't1',
        userId: 'u1',
        title: 'Test Task',
        summary: 'Test Summary',
        dueDate: '2024-12-31',
      },
    ]);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get user tasks from service', () => {
    const userTasks = component.selectedUserTasks;
    expect(tasksService.getUserTasks).toHaveBeenCalledWith('u1');
    expect(userTasks.length).toBe(1);
    expect(userTasks[0].title).toBe('Test Task');
  });

  it('should start adding task', () => {
    expect(component.isAddingTask).toBeFalse();
    component.onStartAddTask();
    expect(component.isAddingTask).toBeTrue();
  });

  it('should close add task dialog', () => {
    component.isAddingTask = true;
    component.onCloseAddTask();
    expect(component.isAddingTask).toBeFalse();
  });

  it('should handle empty user tasks', () => {
    tasksService.getUserTasks.and.returnValue([]);
    const userTasks = component.selectedUserTasks;
    expect(userTasks.length).toBe(0);
  });

  it('should call getUserTasks with correct userId', () => {
    component.userId = 'u2';
    component.selectedUserTasks;
    expect(tasksService.getUserTasks).toHaveBeenCalledWith('u2');
  });

  it('should handle task addition through new task component', () => {
    component.onStartAddTask();
    expect(component.isAddingTask).toBeTrue();

    component.onCloseAddTask();
    expect(component.isAddingTask).toBeFalse();
  });
});
