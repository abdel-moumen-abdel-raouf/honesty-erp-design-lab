import {ERP_MOTION_PRESETS} from './motion-contracts';

describe('Foundation motion contracts', () => {
  it('owns the exact shared twenty-three-preset catalog', () => {
    expect(ERP_MOTION_PRESETS).toEqual([
      'fade',
      'scale',
      'fade-scale',
      'slide-up',
      'slide-down',
      'slide-start',
      'slide-end',
      'zoom',
      'pop',
      'flip-x',
      'flip-y',
      'bounce',
      'swing',
      'fade-up',
      'fade-down',
      'fade-start',
      'fade-end',
      'zoom-up',
      'zoom-down',
      'back',
      'light-speed',
      'rotate',
      'roll',
    ]);
  });
});
