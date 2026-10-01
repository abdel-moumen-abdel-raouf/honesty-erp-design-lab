# Honesty ERP — System Confirm Dialog V1

## Status

This is the implemented system-wide confirmation contract built on the shared
blocking Overlay system. It is a specialized consumer of
`ErpOverlayManager`; it is not a second modal subsystem.

Technical verification remains pending until the canonical
`npm run verify:clean` gate passes on this checkpoint.

## Public API

Application code uses only:

- `ErpConfirmDialogService`
- `ErpConfirmDialogConfig`
- `ErpConfirmDialogIntent`

The internal content component is not public application API.

```ts
export type ErpConfirmDialogIntent =
  | 'default'
  | 'warning'
  | 'danger';

export interface ErpConfirmDialogConfig {
  readonly title: string;
  readonly message: string;
  readonly subtitle?: string;
  readonly details?: string | null;
  readonly confirmLabel?: string;
  readonly cancelLabel?: string;
  readonly intent?: ErpConfirmDialogIntent;
  readonly icon?: ErpIconName;
}
```

The service returns:

```ts
confirm(config: ErpConfirmDialogConfig): Promise<boolean>
```

`true` means the primary Confirm action completed. Cancel, close, Escape, or
any other dismissal resolves `false`.

## System-owned policy

Every system confirmation uses the same fixed Overlay policy:

- kind: `modal`;
- position: `center`;
- size: `sm`;
- blocking: inherited Overlay default `true`;
- trapFocus: inherited Overlay default `true`;
- restoreFocus: inherited Overlay default `true`;
- dismissOnEscape: `true`;
- dismissOnBackdrop: `false`;
- Header visible;
- Footer visible;
- safe initial focus targets the Cancel action;
- modal motion remains the Overlay default `flip-x`.

Callers do not configure modal geometry, motion, backdrop, Header/Footer
visibility, or focus policy through the Confirm API.

## Intent semantics

- `default`: help icon + primary Confirm button;
- `warning`: warning icon + warning Confirm button;
- `danger`: error icon + danger Confirm button; the default primary icon is
  delete.

Callers may override the semantic Header icon, but the system owns the Confirm
button tone derived from intent.

## Overlay stack behavior

The service always opens through the existing `ErpOverlayManager`. Therefore
a confirmation requested from inside an already-open Modal or Drawer becomes a
new top blocking Modal in the same ordered stack.

The parent blocking surface remains mounted beneath it and becomes inactive
under the normal Overlay stack contract. When confirmation closes, the parent
surface remains and focus restoration follows the shared Overlay policy.

No nested backdrop, local portal, second OverlayHost, or DOM-owned dialog is
created.

## Usage

```ts
private readonly confirmDialog = inject(ErpConfirmDialogService);

async deleteCustomer(customer: Customer): Promise<void> {
  const confirmed = await this.confirmDialog.confirm({
    title: 'حذف العميل',
    message: `هل تريد حذف العميل ${customer.name}؟`,
    details: 'لا يمكن التراجع عن الحذف بعد التأكيد.',
    intent: 'danger',
    confirmLabel: 'حذف',
  });

  if (!confirmed) {
    return;
  }

  await this.customers.delete(customer.id);
}
```

The same API is used from pages, forms, tables, Modals, Drawers, or any
application feature.

## Exclusivity

System confirmation must not be implemented through:

- `window.confirm` or global browser `confirm`;
- direct application imports of `ErpConfirmDialogContent`;
- native `<dialog>` authored as an alternative confirmation surface;
- feature-local blocking backdrops or confirmation modal implementations.

The dedicated governance checker enforces the mechanically detectable parts of
this contract and runs in the canonical lint chain.

## Internal composition

The internal Confirm content owns body copy only and uses ERP primitives.
Header, Footer, focus, stacking, dismissal, motion, and action presentation
remain owned by the shared Overlay system.

The Confirm primary action is registered through `ErpOverlayRef` using stable
action ID `confirm`. Cancel remains the shared secondary Overlay action and
all dismissal outcomes map to `false`.
