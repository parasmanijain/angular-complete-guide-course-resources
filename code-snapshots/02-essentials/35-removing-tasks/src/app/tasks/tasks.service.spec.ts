import { TestBed } from '@angular/core/testing';
import { TasksService } from './tasks.service';
import { NewTaskData } from './task/task.model';

/**
 * Unit tests for TasksService
 * Tests service creation and core functionality
 */
describe('TasksService', () => {
  let service: TasksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TasksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return tasks for existing user', () => {
    const userTasks = service.getUserTasks('u1');
    expect(userTasks).toBeDefined();
    expect(userTasks.length).toBeGreaterThan(0);
  });

  it('should return empty array for non-existent user', () => {
    const userTasks = service.getUserTasks('nonexistent');
    expect(userTasks).toBeDefined();
    expect(userTasks.length).toBe(0);
  });

  it('should add a new task', () => {
    const newTaskData: NewTaskData = {
      title: 'Test Task',
      summary: 'This is a test task',
      date: '2024-12-31',
    };
    const userId = 'u1';
    const initialTasks = service.getUserTasks(userId);
    const initialLength = initialTasks.length;

    service.addTask(newTaskData, userId);
    
    const updatedTasks = service.getUserTasks(userId);
    expect(updatedTasks.length).toBe(initialLength + 1);
  });

  it('should remove a task by ID', () => {
    // First add a task to ensure we have something to remove
    const newTaskData: NewTaskData = {
      title: 'Task to Remove',
      summary: 'This task will be removed',
      date: '2024-12-31',
    };
    service.addTask(newTaskData, 'u1');
    
    const userTasks = service.getUserTasks('u1');
    const taskToRemove = userTasks[0];
    const initialLength = userTasks.length;

    service.removeTask(taskToRemove.id);
    
    const updatedTasks = service.getUserTasks('u1');
    expect(updatedTasks.length).toBe(initialLength - 1);
  });

  it('should handle removing non-existent task gracefully', () => {
    const userTasks = service.getUserTasks('u1');
    const initialLength = userTasks.length;

    service.removeTask('non-existent-id');
    
    const updatedTasks = service.getUserTasks('u1');
    expect(updatedTasks.length).toBe(initialLength);
  });

  it('should maintain user isolation', () => {
    const user1Tasks = service.getUserTasks('u1');
    const user3Tasks = service.getUserTasks('u3');
    
    expect(user1Tasks.every(task => task.userId === 'u1')).toBe(true);
    expect(user3Tasks.every(task => task.userId === 'u3')).toBe(true);
  });
});
