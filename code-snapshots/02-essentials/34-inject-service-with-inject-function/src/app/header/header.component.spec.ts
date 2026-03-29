import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { By } from '@angular/platform-browser';

/**
 * Unit tests for HeaderComponent
 * Tests component creation and template rendering
 */
describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render header with correct title', () => {
    const headerElement = fixture.debugElement.query(By.css('h1'));
    expect(headerElement).toBeTruthy();
    expect(headerElement.nativeElement.textContent.trim()).toBe('EasyTask');
  });

  it('should render header with correct subtitle', () => {
    const subtitleElement = fixture.debugElement.query(By.css('p'));
    expect(subtitleElement).toBeTruthy();
    expect(subtitleElement.nativeElement.textContent.trim()).toBe(
      'Enterprise-level task management without friction',
    );
  });

  it('should render logo image', () => {
    const imageElement = fixture.debugElement.query(By.css('img'));
    expect(imageElement).toBeTruthy();
    expect(imageElement.nativeElement.src).toContain(
      'task-management-logo.png',
    );
    expect(imageElement.nativeElement.alt).toBe('A todo list');
  });

  it('should have proper header structure', () => {
    const headerElement = fixture.debugElement.query(By.css('header'));
    expect(headerElement).toBeTruthy();

    const divElement = fixture.debugElement.query(By.css('header > div'));
    expect(divElement).toBeTruthy();
  });
});
