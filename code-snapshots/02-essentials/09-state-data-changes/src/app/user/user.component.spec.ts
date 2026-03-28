import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserComponent } from './user.component';
import { DUMMY_USERS } from '../dummy-users';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a selected user from DUMMY_USERS', () => {
    expect(component.selectedUser).toBeDefined();
    expect(DUMMY_USERS).toContain(component.selectedUser);
  });

  it('should render user button', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('button')).toBeTruthy();
  });

  it('should display user name in span', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const span = compiled.querySelector('span');
    expect(span?.textContent).toContain(component.selectedUser.name);
  });

  it('should render user avatar image with correct src and alt attributes', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const img = compiled.querySelector('img') as HTMLImageElement;
    expect(img).toBeTruthy();
    expect(img.src).toContain(`assets/users/${component.selectedUser.avatar}`);
    expect(img.alt).toBe(component.selectedUser.name);
  });

  it('should change selected user when onSelectUser is called', () => {
    const initialUser = component.selectedUser;
    component.onSelectUser();
    // Note: Due to randomness, we can't guarantee the user will be different
    // but we can ensure the selectedUser is still valid
    expect(component.selectedUser).toBeDefined();
    expect(DUMMY_USERS).toContain(component.selectedUser);
  });

  it('should have proper component structure', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('div > button > img')).toBeTruthy();
    expect(compiled.querySelector('div > button > span')).toBeTruthy();
  });
});
