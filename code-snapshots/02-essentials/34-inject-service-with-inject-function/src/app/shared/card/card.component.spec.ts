import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardComponent } from './card.component';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

/**
 * Unit tests for CardComponent
 * Tests component creation and content projection functionality
 */
@Component({
  template: `
    <app-card>
      <p>Test content</p>
    </app-card>
  `,
  imports: [CardComponent],
})
class TestHostComponent {}

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

  it('should have a div wrapper', () => {
    const divElement = fixture.debugElement.query(By.css('div'));
    expect(divElement).toBeTruthy();
  });

  it('should project content correctly', async () => {
    const hostFixture = TestBed.createComponent(TestHostComponent);
    hostFixture.detectChanges();

    const projectedContent = hostFixture.debugElement.query(By.css('p'));
    expect(projectedContent).toBeTruthy();
    expect(projectedContent.nativeElement.textContent.trim()).toBe(
      'Test content',
    );
  });
});
