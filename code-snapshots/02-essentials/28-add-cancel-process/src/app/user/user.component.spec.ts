import { TestBed } from '@angular/core/testing';
import { UserComponent } from './user.component';
import { type User } from './user.model';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    
    // Set required inputs
    const mockUser: User = {
      id: 'u1',
      name: 'Test User',
      avatar: 'user-1.jpg'
    };
    component.user = mockUser;
    component.selected = false;
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});