import {ChangeDetectionStrategy, Component, input, output} from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector -- ERP internal controls intentionally use the erp prefix.
  selector: 'erp-table-resize-handle',
  templateUrl: './table-resize-handle.html',
  styleUrl: './table-resize-handle.scss',
})
export class ErpTableResizeHandle {
  readonly label = input.required<string>();
  readonly disabled = input(false);
  readonly resizeStarted = output<PointerEvent>();
  readonly resizeStepped = output<number>();
}
