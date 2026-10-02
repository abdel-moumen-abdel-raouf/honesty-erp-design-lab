# Honesty ERP — System Confirm Dialog V1

## Status

System-wide confirmation is implemented as a specialized consumer of the shared
blocking Overlay system. Application confirmation flows must use
`ErpConfirmDialogService`; this is not a second modal subsystem.

Canonical end-to-end verification remains pending for the current checkpoint.

## Public API

Application code uses:

- `ErpConfirmDialogService`
- `ErpConfirmDialogConfig`
- `ErpConfirmDialogAuxiliaryAction`
- `ErpConfirmDialogResult`
- `ErpConfirmDialogIntent`

The internal content component is not application API.

### Configuration

```ts
export interface ErpConfirmDialogConfig {
  readonly title: string;
  readonly message: string;
  readonly subtitle?: string;
  readonly details?: string | null;
  readonly confirmLabel?: string;
  readonly cancelLabel?: string;
  readonly intent?: 'default' | 'warning' | 'danger';
  readonly icon?: ErpIconName;
  readonly headerTone?: ErpOverlayHeaderTone;
  readonly userDismissible?: boolean;
  readonly dismissOnEscape?: boolean;
  readonly dismissOnBackdrop?: boolean;
  readonly auxiliaryActions?: readonly ErpConfirmDialogAuxiliaryAction[];
}
```

`headerTone` accepts the Overlay semantic Header tones:
`default | primary | secondary | accent | success | warning | danger | info | neutral`.

When `headerTone` is omitted, System Confirm automatically uses the same
semantic tone as its primary Confirm action:

- default intent -> `primary` Header;
- warning intent -> `warning` Header;
- danger intent -> `danger` Header.

A caller may still explicitly set any supported Header tone, including
`headerTone: 'default'` to request the ordinary Overlay Header appearance.

Colored Header tones use theme-sensitive **solid** Semantic/Foundation surfaces
with their matching on-solid foreground tokens; they do not use raw colors.

### Auxiliary actions

A Confirm may define zero, one, or two auxiliary actions.

```ts
export interface ErpConfirmDialogAuxiliaryAction {
  readonly id: string;
  readonly label: string;
  readonly icon?: ErpIconName | null;
  readonly presentation?: 'button' | 'icon-button';
  readonly tone?: ErpButtonTone;
  readonly placement?: 'start' | 'end';
}
```

Rules:

- maximum two auxiliary actions;
- IDs are nonblank and unique;
- `confirm` and `cancel` are reserved IDs;
- ordinary Button presentation may omit an icon;
- IconButton presentation requires an icon;
- default presentation = `button`;
- default tone = `neutral`;
- default placement = logical `start`;
- auxiliary actions resolve with their own action ID.

This supports a footer such as:
`auxiliary 1 + auxiliary 2 + cancel + confirm` without exposing raw Overlay
frame composition to the caller.

## Result contract

The service returns a typed result rather than a Boolean:

```ts
export type ErpConfirmDialogResult =
  | {readonly type: 'action'; readonly actionId: string}
  | {
      readonly type: 'dismissed';
      readonly reason: 'close' | 'escape' | 'backdrop';
    };
```

Button results:

- Confirm button -> `{type: 'action', actionId: 'confirm'}`;
- Cancel button -> `{type: 'action', actionId: 'cancel'}`;
- auxiliary action -> its configured ID.

Header Close, Escape, and backdrop dismissal are not button actions; they
return `dismissed` with their corresponding reason.

## User dismissibility

`userDismissible` defaults to `true`.

When true:

- Header Close is visible;
- Cancel action is rendered;
- initial focus targets Cancel;
- `dismissOnEscape` defaults to `false` and may be explicitly enabled;
- `dismissOnBackdrop` defaults to `false` and may be explicitly enabled.

When false:

- Header remains visible but Header Close is removed through the Overlay frame API;
- Cancel is not rendered;
- Escape dismissal is forced off even if requested;
- backdrop dismissal is forced off even if requested;
- initial focus is left to the shared Overlay focus algorithm, which falls back
  to the primary Confirm action when the body has no focusable control.

This means a non-dismissible Confirm cannot be abandoned through normal user
dismissal controls; an application action must complete it.

## Header color

The Confirm caller may set `headerTone` using system semantic tones such as
`info`, `danger`, `warning`, `primary`, etc.

The implementation extends the shared Overlay Header contract with:

- `tone?: ErpOverlayHeaderTone`;
- `showCloseButton?: boolean`.

These remain API-driven. Consumer CSS is not the configuration mechanism.

Header backgrounds deliberately match the solid Button color contract:

- primary/secondary/accent -> Brand solid + Brand on-solid;
- success/warning/danger/info -> Feedback surface-strong + matching on-strong;
- warning uses the same solid foreground role as the Warning Button;
- neutral -> inverse surface + inverse text;
- default -> existing transparent/default Overlay Header.

For colored Headers, title, subtitle, and semantic Header icon inherit the
Header on-solid foreground. The Header Close IconButton switches to a solid
button of the same semantic tone, so its icon keeps the same contrast contract
as a normal solid system button.

## System-owned Modal policy

Every Confirm remains:

- kind: `modal`;
- position: `center`;
- size: `sm`;
- blocking: shared Overlay default;
- Header and Footer visible;
- backdrop dismissal defaults to disabled;
- motion: current Modal default `flip-x`;
- focus trap and restoration: shared Overlay defaults.

The caller does not configure geometry, motion, backdrop, or frame visibility.

## Intent semantics

Intent continues to own the default Confirm action semantics:

- default -> help Header icon + primary Confirm tone;
- warning -> warning Header icon + warning Confirm tone;
- danger -> error Header icon + danger Confirm tone + delete Confirm icon.

By default, `headerTone` follows intent so the Header and primary Confirm
button use the same semantic color. The caller may deliberately override
`headerTone` without changing the meaning/tone of the Confirm action.

## Example

```ts
const result = await confirmDialog.confirm({
  title: 'حذف العميل',
  message: 'هل تريد تنفيذ العملية؟',
  details: 'لا يمكن التراجع عن الحذف.',
  intent: 'danger',
  headerTone: 'danger',
  auxiliaryActions: [
    {
      id: 'archive',
      label: 'أرشفة',
      icon: 'inventory',
      tone: 'secondary',
    },
    {
      id: 'details',
      label: 'التفاصيل',
      icon: 'info',
      presentation: 'icon-button',
      tone: 'info',
    },
  ],
});

if (result.type === 'action') {
  switch (result.actionId) {
    case 'confirm':
      // delete
      break;
    case 'archive':
      // archive instead
      break;
    case 'details':
      // show details
      break;
    case 'cancel':
      // explicit cancel button
      break;
  }
}
```

## Overlay stack behavior

A Confirm requested from a Page, Modal, or Drawer always opens through the
single `ErpOverlayManager`. If another blocking surface is already open, the
Confirm becomes the new top blocking Modal while the parent remains mounted and
inactive beneath it.

## Exclusivity

Application confirmation must not use:

- `window.confirm` / `globalThis.confirm`;
- native `<dialog>` as a parallel confirmation system;
- direct application imports of `ErpConfirmDialogContent`;
- feature-local blocking backdrops or Confirm modal implementations.

The dedicated governance checker runs in the canonical lint chain.


## 2026-10-02 — Plain Header evidence and explicit dismissal APIs

The Overlay review page now includes a dedicated System Confirm example with:

```ts
headerTone: 'default'
```

This proves that callers can opt out of the intent-colored Header while keeping
the same System Confirm service.

Confirm dismissal is now independently configurable through:
- `dismissOnEscape?: boolean` — default `false`;
- `dismissOnBackdrop?: boolean` — default `false`.

These options only take effect while `userDismissible !== false`.
`userDismissible: false` remains the stronger policy and forces both dismissal
paths off while hiding Header Close and Cancel.
