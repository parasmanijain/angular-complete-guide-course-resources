import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { DUMMY_USERS } from './dummy-users';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should have users array', () => {
    expect(component.users).toBeDefined();
    expect(component.users.length).toBeGreaterThan(0);
  });

  it('should handle user selection', () => {
    component.onSelectUser('u1');
    expect(component.selectedUserId).toEqual('u1');
  });
});
