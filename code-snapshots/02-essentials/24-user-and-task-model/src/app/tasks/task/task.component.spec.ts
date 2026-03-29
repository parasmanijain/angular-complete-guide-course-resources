import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskComponent } from './task.component';

describe('TaskComponent', () => {
  let component: TaskComponent;
  let fixture: ComponentFixture<TaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskComponent);
    component = fixture.componentInstance;
    
    // Set required input properties
    component.task = {
      id: 't1',
      userId: 'u1',
      title: 'Test Task',
      summary: 'Test Summary',
      dueDate: '2024-01-01'
    };
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});