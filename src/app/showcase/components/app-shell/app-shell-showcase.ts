import {ChangeDetectionStrategy, Component, OnDestroy, computed, inject} from '@angular/core';
import {ERP_COMPONENT_CATALOG} from '../../../catalog/erp-component-catalog.generated';
import {ErpAppShellWorkbenchValues, ErpReviewAppShellWorkbenchState} from '../../../review-internals/app-shell-workbench/app-shell-workbench-state';
import {ErpReviewShowcaseControlPanel, ErpShowcaseControlChange} from '../../../review-internals/showcase-control-panel/showcase-control-panel';
import {ErpStack} from '../../../primitives/stack/stack';
import {ErpSurface} from '../../../primitives/surface/surface';
import {ErpText} from '../../../primitives/text/text';

const ENTRY = ERP_COMPONENT_CATALOG.find((entry) => entry.id === 'app-shell')!;

const INITIAL_VALUES = {
  ...ENTRY.showcaseInitialValues,
  viewport: true,
} as unknown as ErpAppShellWorkbenchValues;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-app-shell-showcase',
  imports: [ErpReviewShowcaseControlPanel, ErpStack, ErpSurface, ErpText],
  templateUrl: './app-shell-showcase.html',
  styleUrl: './app-shell-showcase.scss',
})
export class ErpAppShellShowcase implements OnDestroy {
  private readonly workbench = inject(ErpReviewAppShellWorkbenchState);
  readonly entry = ENTRY;
  readonly controls = ENTRY.showcaseControls;
  readonly lastEvent = this.workbench.lastEvent;
  readonly controlValues = computed<Readonly<Record<string, unknown>>>(() => ({
    ...(this.workbench.values() ?? INITIAL_VALUES),
    '$value': null,
  }));

  constructor() {
    this.workbench.activate(INITIAL_VALUES);
  }

  ngOnDestroy(): void {
    this.workbench.deactivate();
  }

  applyControl(change: ErpShowcaseControlChange): void {
    const value = change.control.kind === 'function'
      ? this.functionPreset(change.control.name, change.value)
      : change.value;
    this.workbench.updateControl(
      change.control.name as keyof ErpAppShellWorkbenchValues,
      value as never,
    );
  }

  private functionPreset(name: string, value: unknown): unknown {
    if (value !== 'sample') return null;
    if (/comparator/i.test(name)) return () => 0;
    if (/formatter/i.test(name)) return (candidate: unknown) => String(candidate ?? '');
    if (/disabled/i.test(name)) return () => false;
    if (/filter|predicate/i.test(name)) return () => true;
    return (candidate: unknown) => candidate;
  }
}
