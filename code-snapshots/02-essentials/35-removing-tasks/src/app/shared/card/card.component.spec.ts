import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardComponent } from './card.component';
import { By } from '@angular/platform-browser';

/**
 * Unit tests for CardComponent
 * Tests component creation and content projection functionality
 */
describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have div container for content projection', () => {
    const divElement = fixture.debugElement.query(By.css('div'));
    expect(divElement).toBeTruthy();
    expect(divElement.nativeElement.tagName.toLowerCase()).toBe('div');
  });
});