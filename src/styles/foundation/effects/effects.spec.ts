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

  it('emits the exact blocking and glass backdrop blur runtime roles', () => {
    const fixture = TestBed.createComponent(FoundationEffectsTestHost);
    fixture.detectChanges();
    const rootStyles = getComputedStyle(document.documentElement);

    expect(
      rootStyles
        .getPropertyValue('--honesty-effect-backdrop-blur-blocking')
        .trim(),
    ).toBe('0.5rem');
    expect(
      rootStyles
        .getPropertyValue('--honesty-effect-backdrop-blur-glass')
        .trim(),
    ).toBe('1rem');
  });
});
