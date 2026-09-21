import {ChangeDetectionStrategy, Component, signal} from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-motion-specimen',
  templateUrl: './motion.html',
  styleUrl: './motion.scss',
})
export class Motion {
  // State for Duration tracks
  readonly durationActive = signal(false);
  readonly durationInstantReset = signal(false);

  // State for Easing tracks
  readonly easingActive = signal(false);
  readonly easingInstantReset = signal(false);

  // State for Functional Sample
  readonly functionalToggled = signal(false);

  // State for Enter/Exit Sample (default visible in stable resting state)
  readonly enterExitVisible = signal(true);

  readonly durationTracks = [
    {
      id: 'instant',
      label: 'فوري (Instant)',
      token: '--honesty-motion-duration-instant',
      refToken: '$honesty-ref-motion-duration-0',
      value: '0ms',
      note: 'استجابة فورية دون انتقال زمني محسوس.',
    },
    {
      id: 'fast',
      label: 'سريع (Fast)',
      token: '--honesty-motion-duration-fast',
      refToken: '$honesty-ref-motion-duration-100',
      value: '100ms',
      note: 'تغذية راجعة سريعة جداً لتغيرات الحالات وتفاعلات المؤشر الطفيفة.',
    },
    {
      id: 'default',
      label: 'افتراضي (Default)',
      token: '--honesty-motion-duration-default',
      refToken: '$honesty-ref-motion-duration-150',
      value: '150ms',
      note: 'التوقيت المعياري للتفاعلات الدقيقة المعتادة وتغيرات الحالات الطبيعية.',
    },
    {
      id: 'slow',
      label: 'هادئ (Slow)',
      token: '--honesty-motion-duration-slow',
      refToken: '$honesty-ref-motion-duration-200',
      value: '200ms',
      note: 'تغيرات بنيوية أوضح أو أوسع نطاقاً تحتاج وضوحاً إدراكياً أعلى.',
    },
    {
      id: 'deliberate',
      label: 'متأنٍ (Deliberate)',
      token: '--honesty-motion-duration-deliberate',
      refToken: '$honesty-ref-motion-duration-300',
      value: '300ms',
      note: 'انتقالات مكانية واسعة تتطلب استمرارية بصرية واضحة ومقاسة بعناية.',
    },
  ] as const;

  readonly easingTracks = [
    {
      id: 'linear',
      label: 'خطي (Linear)',
      token: '--honesty-motion-easing-linear',
      refToken: '$honesty-ref-motion-easing-linear',
      curve: 'linear',
      note: 'معدل سرعة ثابت من البداية إلى النهاية دون أي تسارع أو تباطؤ.',
    },
    {
      id: 'standard',
      label: 'معياري (Standard)',
      token: '--honesty-motion-easing-standard',
      refToken: '$honesty-ref-motion-easing-standard',
      curve: 'cubic-bezier(0.2, 0, 0, 1)',
      note: 'منحنى الحركة المعتمد لمعظم تغيرات الحالات وتفاعلات واجهة المستخدم.',
    },
    {
      id: 'enter',
      label: 'دخول (Enter)',
      token: '--honesty-motion-easing-enter',
      refToken: '$honesty-ref-motion-easing-enter',
      curve: 'cubic-bezier(0, 0, 0, 1)',
      note: 'منحنى الدخول السريع والاستقرار التدريجي للعناصر الوافدة للواجهة.',
    },
    {
      id: 'exit',
      label: 'خروج (Exit)',
      token: '--honesty-motion-easing-exit',
      refToken: '$honesty-ref-motion-easing-exit',
      curve: 'cubic-bezier(0.3, 0, 1, 1)',
      note: 'منحنى الخروج الحاسم والسريع دون ارتداد للعناصر المغادرة للواجهة.',
    },
  ] as const;

  playDurations(): void {
    this.durationInstantReset.set(true);
    this.durationActive.set(false);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        this.durationInstantReset.set(false);
        this.durationActive.set(true);
      });
    });
  }

  resetDurations(): void {
    this.durationInstantReset.set(true);
    this.durationActive.set(false);
    requestAnimationFrame(() => {
      this.durationInstantReset.set(false);
    });
  }

  playEasings(): void {
    this.easingInstantReset.set(true);
    this.easingActive.set(false);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        this.easingInstantReset.set(false);
        this.easingActive.set(true);
      });
    });
  }

  resetEasings(): void {
    this.easingInstantReset.set(true);
    this.easingActive.set(false);
    requestAnimationFrame(() => {
      this.easingInstantReset.set(false);
    });
  }

  toggleFunctional(): void {
    this.functionalToggled.update((v) => !v);
  }

  toggleEnterExit(): void {
    this.enterExitVisible.update((v) => !v);
  }
}
