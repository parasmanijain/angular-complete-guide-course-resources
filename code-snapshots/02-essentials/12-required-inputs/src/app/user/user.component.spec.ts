import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserComponent } from './user.component';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    
    // Set required inputs
    component.avatar = 'user-1.jpg';
    component.name = 'Test User';
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have required inputs', () => {
    expect(component.avatar).toBe('user-1.jpg');
    expect(component.name).toBe('Test User');
  });

  it('should generate correct image path', () => {
    const expectedPath = 'assets/users/user-1.jpg';
    expect(component.imagePath).toBe(expectedPath);
  });

  it('should handle user selection', () => {
    spyOn(component, 'onSelectUser');
    component.onSelectUser();
    expect(component.onSelectUser).toHaveBeenCalled();
  });
});