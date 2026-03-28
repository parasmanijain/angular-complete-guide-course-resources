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

  it('should have proper component structure', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('div > button > img')).toBeTruthy();
    expect(compiled.querySelector('div > button > span')).toBeTruthy();
  });

  it('should call onSelectUser when button is clicked', () => {
    spyOn(component, 'onSelectUser');
    const button = fixture.nativeElement.querySelector('button');
    button.click();
    expect(component.onSelectUser).toHaveBeenCalled();
  });

  it('should log "Clicked!" when onSelectUser is called', () => {
    spyOn(console, 'log');
    component.onSelectUser();
    expect(console.log).toHaveBeenCalledWith('Clicked!');
  });
});