import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserComponent } from './user.component';
import { User } from './user.model';
import { By } from '@angular/platform-browser';

/**
 * Unit tests for UserComponent
 * Tests component creation and user selection functionality
 */
describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let mockUser: User;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;

    // Set required input properties
    mockUser = {
      id: 'u1',
      name: 'Test User',
      avatar: 'test-avatar.jpg',
    };

    component.user = mockUser;
    component.selected = false;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have required input properties', () => {
    expect(component.user).toEqual(mockUser);
    expect(component.selected).toBe(false);
  });

  it('should generate correct image path', () => {
    expect(component.imagePath).toBe('assets/users/test-avatar.jpg');
  });

  it('should display user name', () => {
    const spanElement = fixture.debugElement.query(By.css('span'));
    expect(spanElement).toBeTruthy();
    expect(spanElement.nativeElement.textContent.trim()).toBe('Test User');
  });

  it('should display user avatar', () => {
    const imgElement = fixture.debugElement.query(By.css('img'));
    expect(imgElement).toBeTruthy();
    expect(imgElement.nativeElement.src).toContain(
      'assets/users/test-avatar.jpg',
    );
    expect(imgElement.nativeElement.alt).toBe('Test User');
  });

  it('should not have active class when not selected', () => {
    const buttonElement = fixture.debugElement.query(By.css('button'));
    expect(buttonElement.nativeElement.classList.contains('active')).toBe(
      false,
    );
  });

  it('should have active class when selected', () => {
    component.selected = true;
    fixture.detectChanges();

    const buttonElement = fixture.debugElement.query(By.css('button'));
    expect(buttonElement.nativeElement.classList.contains('active')).toBe(true);
  });

  it('should emit select event when button is clicked', () => {
    spyOn(component.select, 'emit');

    const buttonElement = fixture.debugElement.query(By.css('button'));
    buttonElement.nativeElement.click();

    expect(component.select.emit).toHaveBeenCalledWith('u1');
  });

  it('should emit select event when onSelectUser is called', () => {
    spyOn(component.select, 'emit');

    component.onSelectUser();

    expect(component.select.emit).toHaveBeenCalledWith('u1');
  });

  it('should render within app-card component', () => {
    const cardElement = fixture.debugElement.query(By.css('app-card'));
    expect(cardElement).toBeTruthy();
  });

  it('should update image path when user avatar changes', () => {
    component.user = { ...mockUser, avatar: 'new-avatar.jpg' };
    expect(component.imagePath).toBe('assets/users/new-avatar.jpg');
  });
});
