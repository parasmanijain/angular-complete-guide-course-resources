import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskComponent } from './task.component';
import { Task } from './task.model';
import { By } from '@angular/platform-browser';

/**
 * Unit tests for TaskComponent
 * Tests component creation and task completion functionality
 */
describe('TaskComponent', () => {
  let component: TaskComponent;
  let fixture: ComponentFixture<TaskComponent>;
  let mockTask: Task;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskComponent);
    component = fixture.componentInstance;

    // Set required input property
    mockTask = {
      id: 't1',
      userId: 'u1',
      title: 'Test Task',
      summary: 'This is a test task',
      dueDate: '2024-12-31',
    };

    component.task = mockTask;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have required input property task', () => {
    expect(component.task).toEqual(mockTask);
  });

  it('should display task title', () => {
    const titleElement = fixture.debugElement.query(By.css('h2'));
    expect(titleElement).toBeTruthy();
    expect(titleElement.nativeElement.textContent.trim()).toBe('Test Task');
  });

  it('should display task summary', () => {
    const summaryElement = fixture.debugElement.query(By.css('p'));
    expect(summaryElement).toBeTruthy();
    expect(summaryElement.nativeElement.textContent.trim()).toBe(
      'This is a test task',
    );
  });

  it('should display formatted due date', () => {
    const timeElement = fixture.debugElement.query(By.css('time'));
    expect(timeElement).toBeTruthy();
    // The date pipe formats the date, so we just check it exists
    expect(timeElement.nativeElement.textContent.trim()).toBeTruthy();
  });

  it('should have complete button', () => {
    const buttonElement = fixture.debugElement.query(By.css('button'));
    expect(buttonElement).toBeTruthy();
    expect(buttonElement.nativeElement.textContent.trim()).toBe('Complete');
  });

  it('should emit complete event when button is clicked', () => {
    spyOn(component.complete, 'emit');

    const buttonElement = fixture.debugElement.query(By.css('button'));
    buttonElement.nativeElement.click();

    expect(component.complete.emit).toHaveBeenCalledWith('t1');
  });

  it('should emit complete event when onCompleteTask is called', () => {
    spyOn(component.complete, 'emit');

    component.onCompleteTask();

    expect(component.complete.emit).toHaveBeenCalledWith('t1');
  });

  it('should render within app-card component', () => {
    const cardElement = fixture.debugElement.query(By.css('app-card'));
    expect(cardElement).toBeTruthy();
  });

  it('should have proper article structure', () => {
    const articleElement = fixture.debugElement.query(By.css('article'));
    expect(articleElement).toBeTruthy();

    const actionsElement = fixture.debugElement.query(By.css('.actions'));
    expect(actionsElement).toBeTruthy();
  });
});
