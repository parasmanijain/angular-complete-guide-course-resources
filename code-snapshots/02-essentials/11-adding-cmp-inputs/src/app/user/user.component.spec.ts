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

    // Set required inputs
    component.avatar = 'user-1.jpg';
    component.name = 'Test User';

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render user button', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('button')).toBeTruthy();
  });

  it('should display user name in span', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const span = compiled.querySelector('span');
    expect(span?.textContent).toContain(component.name);
  });

  it('should render user avatar image with correct src and alt attributes', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const img = compiled.querySelector('img') as HTMLImageElement;
    expect(img).toBeTruthy();
    expect(img.src).toContain(`assets/users/${component.avatar}`);
    expect(img.alt).toBe(component.name);
  });

  it('should have proper component structure', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('div > button > img')).toBeTruthy();
    expect(compiled.querySelector('div > button > span')).toBeTruthy();
  });

  it('should generate correct image path', () => {
    component.avatar = 'test-avatar.jpg';
    expect(component.imagePath).toBe('assets/users/test-avatar.jpg');
  });
});
