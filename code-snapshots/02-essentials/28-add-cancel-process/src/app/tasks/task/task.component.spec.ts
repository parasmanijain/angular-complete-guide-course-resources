import { TestBed } from '@angular/core/testing';
import { TaskComponent } from './task.component';
import { type Task } from './task.model';

describe('TaskComponent', () => {
  let component: TaskComponent;
  let fixture: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskComponent);
    component = fixture.componentInstance;
    
    // Set required input
    const mockTask: Task = {
      id: 't1',
      userId: 'u1',
      title: 'Test Task',
      summary: 'Test task summary',
      dueDate: '2024-12-31'
    };
    component.task = mockTask;
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});