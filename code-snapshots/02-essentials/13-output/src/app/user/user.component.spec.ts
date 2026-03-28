import { TestBed } from '@angular/core/testing';
import { UserComponent } from './user.component';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    
    // Set required inputs
    component.id = 'test-id';
    component.avatar = 'test-avatar.jpg';
    component.name = 'Test User';
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have required inputs', () => {
    expect(component.id).toBe('test-id');
    expect(component.avatar).toBe('test-avatar.jpg');
    expect(component.name).toBe('Test User');
  });

  it('should generate correct image path', () => {
    expect(component.imagePath).toBe('assets/users/test-avatar.jpg');
  });

  it('should emit select event when user is selected', () => {
    spyOn(component.select, 'emit');
    component.onSelectUser();
    expect(component.select.emit).toHaveBeenCalledWith('test-id');
  });
});