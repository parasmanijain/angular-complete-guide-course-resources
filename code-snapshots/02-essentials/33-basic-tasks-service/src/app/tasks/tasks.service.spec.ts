import { TestBed } from '@angular/core/testing';
import { TasksService } from './tasks.service';
import { NewTaskData } from './task/task.model';

/**
 * Comprehensive unit tests for TasksService
 * Tests all service methods including CRUD operations, data filtering,
 * edge cases, and error scenarios following Angular testing best practices
 */
describe('TasksService', () => {
  let service: TasksService;
  let initialTasksCount: number;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TasksService);
    // Store initial tasks count for test isolation
    initialTasksCount = service['tasks'].length;
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

  /**
   * Test service creation and dependency injection
   * Verifies that the service can be properly instantiated
   */
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  /**
   * Test service initialization with default data
   * Verifies that the service starts with predefined tasks
   */
  it('should initialize with default tasks', () => {
    expect(service['tasks']).toBeDefined();
    expect(service['tasks'].length).toBe(3);
    expect(service['tasks'][0].id).toBe('t1');
    expect(service['tasks'][0].userId).toBe('u1');
  });

  describe('getUserTasks', () => {
    /**
     * Test retrieving tasks for a specific user with existing tasks
     * Verifies that only tasks belonging to the specified user are returned
     */
    it('should return tasks for existing user with tasks', () => {
      const userTasks = service.getUserTasks('u3');

      expect(userTasks).toBeDefined();
      expect(userTasks.length).toBe(2);
      expect(userTasks.every((task) => task.userId === 'u3')).toBe(true);
      expect(userTasks[0].title).toBe('Build first prototype');
      expect(userTasks[1].title).toBe('Prepare issue template');
    });

    /**
     * Test retrieving tasks for a user with one task
     * Verifies correct filtering for users with single task
     */
    it('should return single task for user with one task', () => {
      const userTasks = service.getUserTasks('u1');

      expect(userTasks).toBeDefined();
      expect(userTasks.length).toBe(1);
      expect(userTasks[0].userId).toBe('u1');
      expect(userTasks[0].title).toBe('Master Angular');
    });

    /**
     * Test retrieving tasks for a non-existent user
     * Verifies that empty array is returned for users with no tasks
     */
    it('should return empty array for non-existent user', () => {
      const userTasks = service.getUserTasks('nonexistent');

      expect(userTasks).toBeDefined();
      expect(userTasks.length).toBe(0);
      expect(Array.isArray(userTasks)).toBe(true);
    });

    /**
     * Test filtering with empty string user ID
     * Verifies edge case handling for empty user ID
     */
    it('should return empty array for empty user ID', () => {
      const userTasks = service.getUserTasks('');

      expect(userTasks).toBeDefined();
      expect(userTasks.length).toBe(0);
    });

    /**
     * Test filtering with null user ID
     * Verifies edge case handling for null user ID
     */
    it('should return empty array for null user ID', () => {
      const userTasks = service.getUserTasks(null as any);

      expect(userTasks).toBeDefined();
      expect(userTasks.length).toBe(0);
    });
  });

  describe('addTask', () => {
    /**
     * Test adding a valid new task
     * Verifies that task is properly added with correct data structure
     */
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

    /**
     * Test that new task is added at the beginning of the array
     * Verifies the unshift behavior for task ordering
     */
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

    /**
     * Test that each added task gets a unique ID
     * Verifies ID generation uniqueness
     */
    it('should generate unique IDs for multiple tasks', (done) => {
      const taskData1: NewTaskData = {
        title: 'Task 1',
        summary: 'First task',
        date: '2024-01-01',
      };
      const taskData2: NewTaskData = {
        title: 'Task 2',
        summary: 'Second task',
        date: '2024-01-02',
      };

      service.addTask(taskData1, 'u1');
      const firstId = service['tasks'][0].id;

      // Add small delay to ensure different timestamp
      setTimeout(() => {
        service.addTask(taskData2, 'u1');
        const secondId = service['tasks'][0].id;

        expect(firstId).not.toBe(secondId);
        expect(firstId).toBeDefined();
        expect(secondId).toBeDefined();
        expect(typeof firstId).toBe('string');
        expect(typeof secondId).toBe('string');
        done();
      }, 10);
    });
  });

  describe('removeTask', () => {
    /**
     * Test removing an existing task by ID
     * Verifies that task is properly removed from the array
     */
    it('should remove existing task by ID', () => {
      const initialLength = service['tasks'].length;
      const taskToRemove = service['tasks'][0];

      service.removeTask(taskToRemove.id);

      expect(service['tasks'].length).toBe(initialLength - 1);
      expect(
        service['tasks'].find((task) => task.id === taskToRemove.id),
      ).toBeUndefined();
    });

    /**
     * Test removing task that doesn't exist
     * Verifies that removing non-existent task doesn't affect the array
     */
    it('should handle removing non-existent task gracefully', () => {
      const initialLength = service['tasks'].length;
      const initialTasks = [...service['tasks']];

      service.removeTask('non-existent-id');

      expect(service['tasks'].length).toBe(initialLength);
      expect(service['tasks']).toEqual(initialTasks);
    });
  });

  describe('Integration Tests', () => {
    /**
     * Test complete workflow: add task, get user tasks, remove task
     * Verifies that all service methods work together correctly
     */
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
  });
});
