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

  afterEach(() => {
    // Reset service state after each test to ensure test isolation
    service['tasks'] = [
      {
        id: 't1',
        userId: 'u1',
        title: 'Master Angular',
        summary:
          'Learn all the basic and advanced features of Angular & how to apply them.',
        dueDate: '2025-12-31',
      },
      {
        id: 't2',
        userId: 'u3',
        title: 'Build first prototype',
        summary: 'Build a first prototype of the online shop website',
        dueDate: '2024-05-31',
      },
      {
        id: 't3',
        userId: 'u3',
        title: 'Prepare issue template',
        summary:
          'Prepare and describe an issue template which will help with project management',
        dueDate: '2024-06-15',
      },
    ];
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with default tasks', () => {
    expect(service['tasks']).toBeDefined();
    expect(service['tasks'].length).toBe(3);
    expect(service['tasks'][0].id).toBe('t1');
    expect(service['tasks'][0].userId).toBe('u1');
  });

  describe('getUserTasks', () => {
    it('should return tasks for existing user with tasks', () => {
      const userTasks = service.getUserTasks('u3');

      expect(userTasks).toBeDefined();
      expect(userTasks.length).toBe(2);
      expect(userTasks.every((task) => task.userId === 'u3')).toBe(true);
      expect(userTasks[0].title).toBe('Build first prototype');
      expect(userTasks[1].title).toBe('Prepare issue template');
    });

    it('should return single task for user with one task', () => {
      const userTasks = service.getUserTasks('u1');

      expect(userTasks).toBeDefined();
      expect(userTasks.length).toBe(1);
      expect(userTasks[0].userId).toBe('u1');
      expect(userTasks[0].title).toBe('Master Angular');
    });

    it('should return empty array for non-existent user', () => {
      const userTasks = service.getUserTasks('nonexistent');

      expect(userTasks).toBeDefined();
      expect(userTasks.length).toBe(0);
      expect(Array.isArray(userTasks)).toBe(true);
    });

    it('should return empty array for empty user ID', () => {
      const userTasks = service.getUserTasks('');

      expect(userTasks).toBeDefined();
      expect(userTasks.length).toBe(0);
    });

    it('should return empty array for null user ID', () => {
      const userTasks = service.getUserTasks(null as any);

      expect(userTasks).toBeDefined();
      expect(userTasks.length).toBe(0);
    });
  });

  describe('addTask', () => {
    it('should add a new task with valid data', () => {
      const newTaskData: NewTaskData = {
        title: 'New Task',
        summary: 'This is a new task',
        date: '2024-12-31',
      };
      const userId = 'u2';
      const initialLength = service['tasks'].length;

      service.addTask(newTaskData, userId);

      expect(service['tasks'].length).toBe(initialLength + 1);
      const addedTask = service['tasks'][0]; // Task is added at the beginning
      expect(addedTask.title).toBe(newTaskData.title);
      expect(addedTask.summary).toBe(newTaskData.summary);
      expect(addedTask.dueDate).toBe(newTaskData.date);
      expect(addedTask.userId).toBe(userId);
      expect(addedTask.id).toBeDefined();
      expect(typeof addedTask.id).toBe('string');
    });

    it('should add new task at the beginning of tasks array', () => {
      const newTaskData: NewTaskData = {
        title: 'Priority Task',
        summary: 'High priority task',
        date: '2024-01-01',
      };
      const firstTaskBefore = service['tasks'][0].id;

      service.addTask(newTaskData, 'u1');

      expect(service['tasks'][0].title).toBe('Priority Task');
      expect(service['tasks'][1].id).toBe(firstTaskBefore);
    });

    it('should handle adding task with empty title', () => {
      const newTaskData: NewTaskData = {
        title: '',
        summary: 'Task with empty title',
        date: '2024-12-31',
      };
      const initialLength = service['tasks'].length;

      service.addTask(newTaskData, 'u1');

      expect(service['tasks'].length).toBe(initialLength + 1);
      expect(service['tasks'][0].title).toBe('');
    });
  });

  describe('removeTask', () => {
    it('should remove existing task by ID', () => {
      const initialLength = service['tasks'].length;
      const taskToRemove = service['tasks'][0];

      service.removeTask(taskToRemove.id);

      expect(service['tasks'].length).toBe(initialLength - 1);
      expect(
        service['tasks'].find((task) => task.id === taskToRemove.id),
      ).toBeUndefined();
    });

    it('should handle removing non-existent task gracefully', () => {
      const initialLength = service['tasks'].length;
      const initialTasks = [...service['tasks']];

      service.removeTask('non-existent-id');

      expect(service['tasks'].length).toBe(initialLength);
      expect(service['tasks']).toEqual(initialTasks);
    });

    it('should handle removing task with empty ID', () => {
      const initialLength = service['tasks'].length;
      const initialTasks = [...service['tasks']];

      service.removeTask('');

      expect(service['tasks'].length).toBe(initialLength);
      expect(service['tasks']).toEqual(initialTasks);
    });
  });

  describe('Integration Tests', () => {
    it('should handle complete task lifecycle', () => {
      const userId = 'u4';
      const newTask: NewTaskData = {
        title: 'Integration Test Task',
        summary: 'Testing complete workflow',
        date: '2024-12-31',
      };

      // Initially no tasks for this user
      expect(service.getUserTasks(userId).length).toBe(0);

      // Add task
      service.addTask(newTask, userId);
      let userTasks = service.getUserTasks(userId);
      expect(userTasks.length).toBe(1);
      expect(userTasks[0].title).toBe(newTask.title);

      // Remove task
      service.removeTask(userTasks[0].id);
      userTasks = service.getUserTasks(userId);
      expect(userTasks.length).toBe(0);
    });

    it('should maintain user isolation when adding tasks for different users', () => {
      const user1Id = 'u4';
      const user2Id = 'u5';
      const task1: NewTaskData = {
        title: 'User 1 Task',
        summary: 'Task for user 1',
        date: '2024-12-31',
      };
      const task2: NewTaskData = {
        title: 'User 2 Task',
        summary: 'Task for user 2',
        date: '2024-12-31',
      };

      service.addTask(task1, user1Id);
      service.addTask(task2, user2Id);

      const user1Tasks = service.getUserTasks(user1Id);
      const user2Tasks = service.getUserTasks(user2Id);

      expect(user1Tasks.length).toBe(1);
      expect(user2Tasks.length).toBe(1);
      expect(user1Tasks[0].title).toBe('User 1 Task');
      expect(user2Tasks[0].title).toBe('User 2 Task');
      expect(user1Tasks[0].userId).toBe(user1Id);
      expect(user2Tasks[0].userId).toBe(user2Id);
    });
  });
});
