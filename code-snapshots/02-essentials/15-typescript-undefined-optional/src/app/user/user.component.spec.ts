import { TestBed } from '@angular/core/testing';
import { UserComponent } from './user.component';

describe('UserComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserComponent],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(UserComponent);
    const component = fixture.componentInstance;
    // Set required inputs
    component.id = 'test-id';
    component.avatar = 'test-avatar.jpg';
    component.name = 'Test User';
    expect(component).toBeTruthy();
  });

  it('should emit select event when onSelectUser is called', () => {
    const fixture = TestBed.createComponent(UserComponent);
    const component = fixture.componentInstance;
    component.id = 'test-id';
    component.avatar = 'test-avatar.jpg';
    component.name = 'Test User';
    
    spyOn(component.select, 'emit');
    component.onSelectUser();
    expect(component.select.emit).toHaveBeenCalledWith('test-id');
  });

  it('should generate correct image path', () => {
    const fixture = TestBed.createComponent(UserComponent);
    const component = fixture.componentInstance;
    component.avatar = 'test-avatar.jpg';
    expect(component.imagePath).toBe('assets/users/test-avatar.jpg');
  });
});
