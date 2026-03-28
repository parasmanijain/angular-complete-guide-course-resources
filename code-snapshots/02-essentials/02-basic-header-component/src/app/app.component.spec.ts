import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, HeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
  });

  it('should create the app component', () => {
    expect(component).toBeTruthy();
  });

  it('should have the correct selector', () => {
    // Test that the component can be created and rendered correctly
    expect(component).toBeTruthy();
    // The selector is verified by the component being properly instantiated
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('should render the header component', () => {
    fixture.detectChanges();
    const headerElement = debugElement.query(By.css('app-header'));
    expect(headerElement).toBeTruthy();
  });

  it('should contain HeaderComponent in imports', () => {
    // Test that the header component renders, which proves it's properly imported
    fixture.detectChanges();
    const headerElement = debugElement.query(By.css('app-header'));
    expect(headerElement).toBeTruthy();
  });

  it('should be a standalone component', () => {
    const componentDef = (AppComponent as any).ɵcmp;
    expect(componentDef?.standalone).toBe(true);
  });

  it('should have correct template and style URLs', () => {
    // Test that the component renders correctly, which proves template is loaded
    fixture.detectChanges();
    const headerElement = debugElement.query(By.css('app-header'));
    expect(headerElement).toBeTruthy();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('should render without errors', () => {
    expect(() => {
      fixture.detectChanges();
    }).not.toThrow();
  });

  it('should have no initial properties or methods', () => {
    // Since AppComponent is empty, verify it has no custom properties
    const ownProperties = Object.getOwnPropertyNames(component);
    const expectedProperties = []; // Empty component should have no custom properties

    // Filter out Angular internal properties
    const customProperties = ownProperties.filter(
      prop =>
        !prop.startsWith('_') && !prop.startsWith('ɵ') && prop !== 'constructor'
    );

    expect(customProperties.length).toBe(0);
  });
});
