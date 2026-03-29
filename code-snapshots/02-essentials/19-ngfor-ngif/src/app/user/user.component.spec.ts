import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserComponent } from './user.component';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    
    // Set required input properties
    component.user = {
      id: 'test-id',
      name: 'Test User',
      avatar: 'test-avatar.jpg'
    };
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit select event when onSelectUser is called', () => {
    spyOn(component.select, 'emit');
    component.onSelectUser();
    expect(component.select.emit).toHaveBeenCalledWith('test-id');
  });

  it('should return correct image path', () => {
    expect(component.imagePath).toBe('assets/users/test-avatar.jpg');
  });
});
