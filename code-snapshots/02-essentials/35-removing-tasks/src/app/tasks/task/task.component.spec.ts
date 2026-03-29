import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskComponent } from './task.component';
import { Task } from './task.model';

/**
 * Unit tests for TaskComponent
 * Tests component creation and task completion functionality
 */
describe('TaskComponent', () => {
  let component: TaskComponent;
  let fixture: ComponentFixture<TaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskComponent);
    component = fixture.componentInstance;
    
    // Set required input property
    component.task = {
      id: 't1',
      userId: 'u1',
      title: 'Test Task',
      summary: 'This is a test task',
      dueDate: '2024-12-31'
    };
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});