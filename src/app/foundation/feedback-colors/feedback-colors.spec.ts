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

  it('should render one inherited-theme context without local theme authority', () => {
    const fixture = TestBed.createComponent(FeedbackColors);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const context = compiled.querySelector('#feedback-context-current');

    expect(context).toBeTruthy();
    expect(context?.hasAttribute('data-theme')).toBe(false);
    expect(compiled.querySelector('#feedback-context-dark')).toBeNull();
  });

  it('should render all four intents in the inherited theme', () => {
    const fixture = TestBed.createComponent(FeedbackColors);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const context = compiled.querySelector('#feedback-context-current');

    for (const intent of ['success', 'warning', 'danger', 'info']) {
      expect(context?.querySelector('#current-intent-' + intent)).toBeTruthy();
    }
  });

  it('should render subtle and strong samples for every intent in the inherited theme', () => {
    const fixture = TestBed.createComponent(FeedbackColors);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    for (const intent of ['success', 'warning', 'danger', 'info']) {
      expect(compiled.querySelector('#current-sample-' + intent + '-subtle')).toBeTruthy();
      expect(compiled.querySelector('#current-sample-' + intent + '-strong')).toBeTruthy();
    }
  });
});
