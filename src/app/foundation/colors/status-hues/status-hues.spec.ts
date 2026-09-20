import {TestBed} from '@angular/core/testing';
import {provideRouter} from '@angular/router';
import {routes} from '../../../app.routes';
import {StatusHues} from './status-hues';

describe('StatusHues Specimen', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatusHues],
      providers: [provideRouter(routes)],
    }).compileComponents();
  });

  it('should create the status hues specimen component', () => {
    const fixture = TestBed.createComponent(StatusHues);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should have the /foundation/colors/status-hues route defined in routes', () => {
    const statusRoute = routes.find(
      (r) => r.path === 'foundation/colors/status-hues'
    );
    expect(statusRoute).toBeDefined();
  });

  it('should render exactly 11 swatches for each of the four hue ramps', () => {
    const fixture = TestBed.createComponent(StatusHues);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    const greenSwatches = compiled.querySelectorAll('#green-ramp-strip .swatch-card');
    const amberSwatches = compiled.querySelectorAll('#amber-ramp-strip .swatch-card');
    const redSwatches = compiled.querySelectorAll('#red-ramp-strip .swatch-card');
    const cyanSwatches = compiled.querySelectorAll('#cyan-ramp-strip .swatch-card');

    expect(greenSwatches.length).toBe(11);
    expect(amberSwatches.length).toBe(11);
    expect(redSwatches.length).toBe(11);
    expect(cyanSwatches.length).toBe(11);
  });
});
