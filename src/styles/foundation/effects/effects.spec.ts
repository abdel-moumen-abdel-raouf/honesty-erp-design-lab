import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {TestBed} from '@angular/core/testing';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'app-foundation-effects-test-host',
  styleUrl: '../semantic/effects/_roles.scss',
  template: '',
})
class FoundationEffectsTestHost {}

describe('Foundation effects contract', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FoundationEffectsTestHost],
    }).compileComponents();
  });

  it('emits the exact low, medium, high, blocking, and glass backdrop blur runtime roles', () => {
    const fixture = TestBed.createComponent(FoundationEffectsTestHost);
    fixture.detectChanges();
    const rootStyles = getComputedStyle(document.documentElement);

    expect(
      rootStyles
        .getPropertyValue('--honesty-effect-backdrop-blur-low')
        .trim(),
    ).toBe('0.25rem');
    expect(
      rootStyles
        .getPropertyValue('--honesty-effect-backdrop-blur-medium')
        .trim(),
    ).toBe('0.5rem');
    expect(
      rootStyles
        .getPropertyValue('--honesty-effect-backdrop-blur-high')
        .trim(),
    ).toBe('1rem');
    expect(
      rootStyles
        .getPropertyValue('--honesty-effect-backdrop-blur-blocking')
        .trim(),
    ).toBe('var(--honesty-effect-backdrop-blur-medium)');
    expect(
      rootStyles
        .getPropertyValue('--honesty-effect-backdrop-blur-glass')
        .trim(),
    ).toBe('var(--honesty-effect-backdrop-blur-high)');
  });
});
