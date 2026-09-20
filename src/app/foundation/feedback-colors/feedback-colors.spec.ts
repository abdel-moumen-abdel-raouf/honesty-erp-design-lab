import {TestBed} from '@angular/core/testing';
import {FeedbackColors} from './feedback-colors';
import {routes} from '../../app.routes';

describe('FeedbackColors Specimen Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeedbackColors],
    }).compileComponents();
  });

  it('should have the /foundation/feedback-colors route registered in app routes', () => {
    const route = routes.find((r) => r.path === 'foundation/feedback-colors');
    expect(route).toBeDefined();
  });

  it('should create the feedback colors specimen component', () => {
    const fixture = TestBed.createComponent(FeedbackColors);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should render both Light and Dark theme review contexts', () => {
    const fixture = TestBed.createComponent(FeedbackColors);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    const lightContext = compiled.querySelector('#feedback-context-light[data-theme="light"]');
    const darkContext = compiled.querySelector('#feedback-context-dark[data-theme="dark"]');

    expect(lightContext).toBeTruthy();
    expect(darkContext).toBeTruthy();
  });

  it('should render all four intents (success, warning, danger, info) in Light theme', () => {
    const fixture = TestBed.createComponent(FeedbackColors);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    const lightContext = compiled.querySelector('#feedback-context-light');
    expect(lightContext).toBeTruthy();

    const successIntent = lightContext?.querySelector('#light-intent-success');
    const warningIntent = lightContext?.querySelector('#light-intent-warning');
    const dangerIntent = lightContext?.querySelector('#light-intent-danger');
    const infoIntent = lightContext?.querySelector('#light-intent-info');

    expect(successIntent).toBeTruthy();
    expect(warningIntent).toBeTruthy();
    expect(dangerIntent).toBeTruthy();
    expect(infoIntent).toBeTruthy();
  });

  it('should render all four intents (success, warning, danger, info) in Dark theme', () => {
    const fixture = TestBed.createComponent(FeedbackColors);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    const darkContext = compiled.querySelector('#feedback-context-dark');
    expect(darkContext).toBeTruthy();

    const successIntent = darkContext?.querySelector('#dark-intent-success');
    const warningIntent = darkContext?.querySelector('#dark-intent-warning');
    const dangerIntent = darkContext?.querySelector('#dark-intent-danger');
    const infoIntent = darkContext?.querySelector('#dark-intent-info');

    expect(successIntent).toBeTruthy();
    expect(warningIntent).toBeTruthy();
    expect(dangerIntent).toBeTruthy();
    expect(infoIntent).toBeTruthy();
  });

  it('should render both a subtle sample and a strong sample for each intent in both themes', () => {
    const fixture = TestBed.createComponent(FeedbackColors);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    const intents = ['success', 'warning', 'danger', 'info'];
    const themes = ['light', 'dark'];

    for (const theme of themes) {
      for (const intent of intents) {
        const subtleSample = compiled.querySelector(`#${theme}-sample-${intent}-subtle`);
        const strongSample = compiled.querySelector(`#${theme}-sample-${intent}-strong`);

        expect(subtleSample, `${theme} ${intent} subtle sample`).toBeTruthy();
        expect(strongSample, `${theme} ${intent} strong sample`).toBeTruthy();
      }
    }
  });
});
