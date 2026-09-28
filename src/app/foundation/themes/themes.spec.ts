import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {provideRouter} from '@angular/router';
import {routes} from '../../app.routes';
import {Themes} from './themes';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [],
  selector: 'app-theme-role-test-host',
  styleUrls: [
    '../../../styles/foundation/themes/_light.scss',
    '../../../styles/foundation/themes/_dark.scss',
  ],
  template: `
    <div id="theme-role-light" data-theme="light"></div>
    <div id="theme-role-dark" data-theme="dark"></div>
  `,
})
class ThemeRoleTestHost {}

describe('Themes Specimen', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Themes, ThemeRoleTestHost],
      providers: [provideRouter(routes)],
    }).compileComponents();
  });

  it('should create the themes specimen component', () => {
    const fixture = TestBed.createComponent(Themes);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should have the /foundation/themes route defined in routes', () => {
    const themesRoute = routes.find((r) => r.path === 'foundation/themes');
    expect(themesRoute).toBeDefined();
  });

  it('should render one current review context without overriding the global theme', () => {
    const fixture = TestBed.createComponent(Themes);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const context = compiled.querySelector('#theme-context-current');

    expect(context).toBeTruthy();
    expect(context?.hasAttribute('data-theme')).toBe(false);
    expect(compiled.querySelector('#theme-context-dark')).toBeNull();
  });

  it('should render all required semantic review groups in the inherited theme', () => {
    const fixture = TestBed.createComponent(Themes);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    for (const id of [
      'surface-hierarchy-current',
      'borders-group-current',
      'actions-group-current',
      'subtle-actions-group-current',
      'focus-ring-group-current',
    ]) {
      expect(compiled.querySelector('#' + id)).toBeTruthy();
    }
  });

  it('should render the corrected inverse sample in the inherited theme', () => {
    const fixture = TestBed.createComponent(Themes);
    fixture.detectChanges();
    expect((fixture.nativeElement as HTMLElement).querySelector('#inverse-sample-current')).toBeTruthy();
  });

  it('should render one scrim sample in the inherited theme', () => {
    const fixture = TestBed.createComponent(Themes);
    fixture.detectChanges();
    expect((fixture.nativeElement as HTMLElement).querySelector('#scrim-sample-current')).toBeTruthy();
  });

  it('should document the semantic focus-ring role without a local theme mapping', () => {
    const fixture = TestBed.createComponent(Themes);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const meta = compiled.querySelector('#focus-ring-meta-current');

    expect(meta?.textContent).toContain('--honesty-color-action-focus-ring');
    expect(meta?.textContent).toContain('resolved by active App theme');
  });

  it('emits every overlay backdrop and glass role in both themes with distinct theme resolutions', () => {
    const fixture = TestBed.createComponent(ThemeRoleTestHost);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const light = compiled.querySelector<HTMLElement>('#theme-role-light');
    const dark = compiled.querySelector<HTMLElement>('#theme-role-dark');
    const roles = [
      '--honesty-color-overlay-backdrop-default',
      '--honesty-color-overlay-backdrop-neutral',
      '--honesty-color-overlay-backdrop-primary',
      '--honesty-color-overlay-backdrop-secondary',
      '--honesty-color-overlay-backdrop-accent',
      '--honesty-color-surface-glass',
      '--honesty-color-surface-glass-border',
      '--honesty-color-surface-glass-highlight',
    ];

    expect(light).toBeTruthy();
    expect(dark).toBeTruthy();

    for (const role of roles) {
      const lightValue = getComputedStyle(light!).getPropertyValue(role).trim();
      const darkValue = getComputedStyle(dark!).getPropertyValue(role).trim();

      expect(lightValue).not.toBe('');
      expect(darkValue).not.toBe('');
      expect(lightValue).not.toBe(darkValue);
    }
  });

  it('emits the exact Light and Dark Overlay backdrop palette compositions', () => {
    const fixture = TestBed.createComponent(ThemeRoleTestHost);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const light = compiled.querySelector<HTMLElement>('#theme-role-light')!;
    const dark = compiled.querySelector<HTMLElement>('#theme-role-dark')!;
    const normalized = (element: HTMLElement, role: string) =>
      getComputedStyle(element).getPropertyValue(role).replaceAll(' ', '').trim();

    expect(normalized(light, '--honesty-color-overlay-backdrop-default')).toBe(
      'rgba(16,17,21,0.44)',
    );
    expect(normalized(light, '--honesty-color-overlay-backdrop-neutral')).toBe(
      'rgba(24,26,32,0.38)',
    );
    expect(normalized(light, '--honesty-color-overlay-backdrop-primary')).toBe(
      'rgba(35,34,101,0.38)',
    );
    expect(normalized(light, '--honesty-color-overlay-backdrop-secondary')).toBe(
      'rgba(48,59,86,0.38)',
    );
    expect(normalized(light, '--honesty-color-overlay-backdrop-accent')).toBe(
      'rgba(81,43,74,0.38)',
    );
    expect(normalized(dark, '--honesty-color-overlay-backdrop-default')).toBe(
      'rgba(16,17,21,0.48)',
    );
    expect(normalized(dark, '--honesty-color-overlay-backdrop-neutral')).toBe(
      'rgba(16,17,21,0.42)',
    );
    expect(normalized(dark, '--honesty-color-overlay-backdrop-primary')).toBe(
      'rgba(23,22,69,0.42)',
    );
    expect(normalized(dark, '--honesty-color-overlay-backdrop-secondary')).toBe(
      'rgba(29,37,54,0.42)',
    );
    expect(normalized(dark, '--honesty-color-overlay-backdrop-accent')).toBe(
      'rgba(48,21,41,0.42)',
    );
  });
});
