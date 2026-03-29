import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { DUMMY_USERS } from './dummy-users';

/**
 * Unit tests for AppComponent
 * Tests component creation, user selection functionality, and task management integration
 */
describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should have users array initialized with DUMMY_USERS', () => {
    expect(component.users).toBeDefined();
    expect(component.users).toEqual(DUMMY_USERS);
    expect(component.users.length).toBe(6);
  });

  it('should handle user selection', () => {
    expect(component.selectedUserId).toBeUndefined();
    component.onSelectUser('u1');
    expect(component.selectedUserId).toBe('u1');
  });

  it('should return correct selected user', () => {
    component.onSelectUser('u2');
    const selectedUser = component.selectedUser;
    expect(selectedUser).toBeDefined();
    expect(selectedUser?.id).toBe('u2');
    expect(selectedUser?.name).toBe('Emily Thompson');
  });

  it('should return undefined when no user is selected', () => {
    component.selectedUserId = undefined;
    const selectedUser = component.selectedUser;
    expect(selectedUser).toBeUndefined();
  });

  it('should return undefined for non-existent user ID', () => {
    component.selectedUserId = 'non-existent';
    const selectedUser = component.selectedUser;
    expect(selectedUser).toBeUndefined();
  });

  it('should update selectedUserId when different users are selected', () => {
    component.onSelectUser('u1');
    expect(component.selectedUserId).toBe('u1');

    component.onSelectUser('u3');
    expect(component.selectedUserId).toBe('u3');

    component.onSelectUser('u5');
    expect(component.selectedUserId).toBe('u5');
  });

  it('should have all expected users from DUMMY_USERS', () => {
    const expectedUserIds = ['u1', 'u2', 'u3', 'u4', 'u5', 'u6'];
    const actualUserIds = component.users.map((user) => user.id);
    expect(actualUserIds).toEqual(expectedUserIds);
  });
});
