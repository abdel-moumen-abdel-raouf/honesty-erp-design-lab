import {TestBed} from '@angular/core/testing';
import {provideRouter} from '@angular/router';
import {routes} from '../../app.routes';
import {Themes} from './themes';

describe('Themes Specimen', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Themes],
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

  it('should render one Light theme and one Dark theme review context', () => {
    const fixture = TestBed.createComponent(Themes);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    const lightContext = compiled.querySelector('[data-theme="light"]');
    const darkContext = compiled.querySelector('[data-theme="dark"]');

    expect(lightContext).toBeTruthy();
    expect(darkContext).toBeTruthy();
  });

  it('should render all required semantic review groups in both themes', () => {
    const fixture = TestBed.createComponent(Themes);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    // Light context groups
    expect(compiled.querySelector('#surface-hierarchy-light')).toBeTruthy();
    expect(compiled.querySelector('#borders-group-light')).toBeTruthy();
    expect(compiled.querySelector('#actions-group-light')).toBeTruthy();
    expect(compiled.querySelector('#subtle-actions-group-light')).toBeTruthy();
    expect(compiled.querySelector('#focus-ring-group-light')).toBeTruthy();

    // Dark context groups
    expect(compiled.querySelector('#surface-hierarchy-dark')).toBeTruthy();
    expect(compiled.querySelector('#borders-group-dark')).toBeTruthy();
    expect(compiled.querySelector('#actions-group-dark')).toBeTruthy();
    expect(compiled.querySelector('#subtle-actions-group-dark')).toBeTruthy();
    expect(compiled.querySelector('#focus-ring-group-dark')).toBeTruthy();
  });

  it('should render the corrected inverse sample container in both theme contexts', () => {
    const fixture = TestBed.createComponent(Themes);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('#inverse-sample-light')).toBeTruthy();
    expect(compiled.querySelector('#inverse-sample-dark')).toBeTruthy();
  });

  it('should document the exact Light and Dark focus-ring source steps', () => {
    const fixture = TestBed.createComponent(Themes);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('#focus-ring-meta-light')?.textContent).toContain('Primary 400');
    expect(compiled.querySelector('#focus-ring-meta-dark')?.textContent).toContain('Primary 300');
  });
});
