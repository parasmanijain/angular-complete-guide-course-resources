import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should have users array', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.users).toBeDefined();
    expect(app.users.length).toBeGreaterThan(0);
  });

  it('should handle user selection', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const testUserId = app.users[0].id;
    
    app.onSelectUser(testUserId);
    expect(app.selectedUserId).toBe(testUserId);
    expect(app.selectedUser).toBe(app.users[0]);
  });
});
