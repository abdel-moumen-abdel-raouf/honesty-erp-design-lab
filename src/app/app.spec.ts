import {TestBed} from '@angular/core/testing';
import {provideRouter, RouterLink} from '@angular/router';
import {By} from '@angular/platform-browser';
import {App} from './app';
import {routes} from './app.routes';

describe('App Root Shell & Design Lab Review Utilities', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter(routes)],
    }).compileComponents();
  });

  it('should create the app root shell', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the temporary Design Lab utility navigation with all 3 review links', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    const nav = compiled.querySelector('#lab-nav');
    expect(nav).toBeTruthy();

    const colorsLink = compiled.querySelector('#nav-link-colors');
    const themesLink = compiled.querySelector('#nav-link-themes');
    const statusHuesLink = compiled.querySelector('#nav-link-status-hues');

    expect(colorsLink).toBeTruthy();
    expect(themesLink).toBeTruthy();
    expect(statusHuesLink).toBeTruthy();

    expect(colorsLink?.textContent?.trim()).toBe('الألوان المرجعية');
    expect(themesLink?.textContent?.trim()).toBe('السمات الفاتحة والداكنة');
    expect(statusHuesLink?.textContent?.trim()).toBe('صبغات الحالات');
  });

  it('should bind the correct RouterLink routes to the navigation links', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();

    const linkDebugElements = fixture.debugElement.queryAll(By.directive(RouterLink));
    const linkPaths = linkDebugElements.map((de) => {
      const routerLink = de.injector.get(RouterLink);
      return routerLink.href;
    });

    expect(linkPaths).toContain('/foundation/colors');
    expect(linkPaths).toContain('/foundation/themes');
    expect(linkPaths).toContain('/foundation/colors/status-hues');
  });

  it('should render the full-page screenshot button', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    const screenshotBtn = compiled.querySelector('#btn-full-page-screenshot') as HTMLButtonElement | null;
    expect(screenshotBtn).toBeTruthy();
    expect(screenshotBtn?.textContent?.trim()).toContain('لقطة كاملة');
    expect(screenshotBtn?.disabled).toBe(false);
  });

  it('should render the dedicated routed-content capture wrapper outside the utility bar', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    const utilityBar = compiled.querySelector('#lab-utility-bar');
    const captureWrapper = compiled.querySelector('#routed-review-content');
    const routerOutlet = compiled.querySelector('#app-router-outlet');

    expect(utilityBar).toBeTruthy();
    expect(captureWrapper).toBeTruthy();
    expect(routerOutlet).toBeTruthy();

    // Ensure routed content wrapper contains the router outlet
    expect(captureWrapper?.contains(routerOutlet)).toBe(true);

    // Ensure the utility bar is NOT inside the capture wrapper
    expect(captureWrapper?.contains(utilityBar)).toBe(false);
  });
});
