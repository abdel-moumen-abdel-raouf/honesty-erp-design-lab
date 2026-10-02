import {Component} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {ErpOverlayManager} from '../overlay/overlay-manager';
import {ErpConfirmDialogService} from './confirm-dialog.service';

@Component({template: ''})
class ParentOverlayContent {}

function parentFrame(title: string) {
  return {
    header: {
      title,
      subtitle: 'Parent overlay',
      icon: 'layers' as const,
    },
    footer: {
      actions: [],
    },
  };
}

describe('ErpConfirmDialogService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('opens the exact system defaults and returns the pressed Confirm action ID', async () => {
    const service = TestBed.inject(ErpConfirmDialogService);
    const manager = TestBed.inject(ErpOverlayManager);

    const result = service.confirm({
      title: '  متابعة العملية  ',
      message: '  هل تريد المتابعة؟  ',
    });

    const entry = manager.entries().at(-1);
    expect(entry?.ref.config).toMatchObject({
      kind: 'modal',
      position: 'center',
      size: 'sm',
      dismissOnEscape: false,
      dismissOnBackdrop: false,
      initialFocus: '[data-overlay-frame-action-id="cancel"] button',
      frame: {
        showHeader: true,
        showFooter: true,
        header: {
          title: 'متابعة العملية',
          subtitle: 'يرجى تأكيد هذا الإجراء.',
          icon: 'help',
          tone: 'primary',
          showCloseButton: true,
          closeLabel: 'إلغاء',
        },
        footer: {
          actions: [
            expect.objectContaining({
              id: 'cancel',
              label: 'إلغاء',
              tone: 'neutral',
              role: 'secondary',
            }),
            expect.objectContaining({
              id: 'confirm',
              label: 'تأكيد',
              icon: 'check',
              tone: 'primary',
              role: 'primary',
            }),
          ],
        },
      },
      data: {
        message: 'هل تريد المتابعة؟',
        details: null,
        intent: 'default',
      },
    });

    const ref = entry?.ref;
    expect(ref).toBeDefined();
    manager.completeTransition(ref!.id, 'entering');
    expect(ref!.requestFrameAction('confirm')).toBe(true);
    manager.completeTransition(ref!.id, 'leaving');

    await expect(result).resolves.toEqual({
      type: 'action',
      actionId: 'confirm',
    });
  });

  it('returns Cancel as a button action when user dismissal is enabled', async () => {
    const service = TestBed.inject(ErpConfirmDialogService);
    const manager = TestBed.inject(ErpOverlayManager);

    const result = service.confirm({
      title: 'إلغاء العملية',
      message: 'هل تريد تنفيذ الإجراء؟',
    });
    const ref = manager.entries().at(-1)!.ref;
    manager.completeTransition(ref.id, 'entering');

    expect(ref.requestFrameAction('cancel')).toBe(true);
    manager.completeTransition(ref.id, 'leaving');

    await expect(result).resolves.toEqual({
      type: 'action',
      actionId: 'cancel',
    });
  });

  it('defaults Escape/Backdrop dismissal off and supports explicit API opt-in', async () => {
    const service = TestBed.inject(ErpConfirmDialogService);
    const manager = TestBed.inject(ErpOverlayManager);

    const defaultResult = service.confirm({
      title: 'Default dismissal proof',
      message: 'Escape and backdrop are off by default.',
    });
    const defaultRef = manager.entries().at(-1)!.ref;
    manager.completeTransition(defaultRef.id, 'entering');
    manager.dismissTopFromEscape();
    manager.dismissFromBackdrop(defaultRef.id);
    expect(manager.entries().at(-1)?.phase).toBe('open');
    defaultRef.dismiss('close-action');
    manager.completeTransition(defaultRef.id, 'leaving');
    await expect(defaultResult).resolves.toEqual({
      type: 'dismissed',
      reason: 'close',
    });

    const escapeResult = service.confirm({
      title: 'Escape proof',
      message: 'Escape explicitly enabled.',
      dismissOnEscape: true,
    });
    const escapeRef = manager.entries().at(-1)!.ref;
    manager.completeTransition(escapeRef.id, 'entering');
    manager.dismissTopFromEscape();
    manager.completeTransition(escapeRef.id, 'leaving');
    await expect(escapeResult).resolves.toEqual({
      type: 'dismissed',
      reason: 'escape',
    });

    const backdropResult = service.confirm({
      title: 'Backdrop proof',
      message: 'Backdrop explicitly enabled.',
      dismissOnBackdrop: true,
    });
    const backdropRef = manager.entries().at(-1)!.ref;
    manager.completeTransition(backdropRef.id, 'entering');
    manager.dismissFromBackdrop(backdropRef.id);
    manager.completeTransition(backdropRef.id, 'leaving');
    await expect(backdropResult).resolves.toEqual({
      type: 'dismissed',
      reason: 'backdrop',
    });
  });

  it('defaults Header tone to the same semantic tone as the Confirm action', () => {
    const service = TestBed.inject(ErpConfirmDialogService);
    const manager = TestBed.inject(ErpOverlayManager);

    void service.confirm({
      title: 'Default',
      message: 'Default confirm.',
    });
    void service.confirm({
      title: 'Warning',
      message: 'Warning confirm.',
      intent: 'warning',
    });
    void service.confirm({
      title: 'Danger',
      message: 'Danger confirm.',
      intent: 'danger',
    });

    expect(
      manager.entries().slice(-3).map((entry) => ({
        headerTone: entry.ref.config.frame?.header.tone,
        confirmTone: entry.ref.config.frame?.footer.actions.find(
          (action) => action.id === 'confirm',
        )?.tone,
      })),
    ).toEqual([
      {headerTone: 'primary', confirmTone: 'primary'},
      {headerTone: 'warning', confirmTone: 'warning'},
      {headerTone: 'danger', confirmTone: 'danger'},
    ]);
  });

  it('maps warning/danger intent and an explicit Header tone independently', () => {
    const service = TestBed.inject(ErpConfirmDialogService);
    const manager = TestBed.inject(ErpOverlayManager);

    void service.confirm({
      title: 'تحذير',
      message: 'راجع العملية.',
      intent: 'warning',
      headerTone: 'info',
    });
    void service.confirm({
      title: 'حذف',
      message: 'سيتم حذف السجل.',
      intent: 'danger',
      headerTone: 'danger',
      confirmLabel: 'حذف',
      details: 'لا يمكن التراجع عن الحذف.',
    });

    const [warning, danger] = manager.entries().slice(-2);
    expect(warning.ref.config.frame).toMatchObject({
      header: {icon: 'warning', tone: 'info'},
      footer: {
        actions: [
          expect.objectContaining({id: 'cancel', tone: 'neutral'}),
          expect.objectContaining({id: 'confirm', tone: 'warning'}),
        ],
      },
    });
    expect(danger.ref.config).toMatchObject({
      frame: {
        header: {icon: 'error', tone: 'danger'},
        footer: {
          actions: [
            expect.objectContaining({id: 'cancel', tone: 'neutral'}),
            expect.objectContaining({
              id: 'confirm',
              label: 'حذف',
              icon: 'delete',
              tone: 'danger',
            }),
          ],
        },
      },
      data: {
        details: 'لا يمكن التراجع عن الحذف.',
        intent: 'danger',
      },
    });
  });

  it('supports at most two configurable auxiliary Button/IconButton actions and returns the pressed ID', async () => {
    const service = TestBed.inject(ErpConfirmDialogService);
    const manager = TestBed.inject(ErpOverlayManager);

    const result = service.confirm({
      title: 'اختيارات إضافية',
      message: 'اختر أحد الإجراءات.',
      auxiliaryActions: [
        {
          id: 'save-draft',
          label: 'حفظ كمسودة',
          icon: 'save',
          tone: 'secondary',
        },
        {
          id: 'details',
          label: 'التفاصيل',
          icon: 'info',
          presentation: 'icon-button',
          tone: 'info',
          placement: 'end',
        },
      ],
    });

    const entry = manager.entries().at(-1)!;
    expect(entry.ref.config.frame?.footer.actions).toEqual([
      expect.objectContaining({
        id: 'save-draft',
        icon: 'save',
        presentation: 'button',
        tone: 'secondary',
        role: 'secondary',
        placement: 'start',
      }),
      expect.objectContaining({
        id: 'details',
        icon: 'info',
        presentation: 'icon-button',
        tone: 'info',
        role: 'secondary',
        placement: 'end',
      }),
      expect.objectContaining({id: 'cancel'}),
      expect.objectContaining({id: 'confirm'}),
    ]);

    manager.completeTransition(entry.ref.id, 'entering');
    expect(entry.ref.requestFrameAction('details')).toBe(true);
    manager.completeTransition(entry.ref.id, 'leaving');

    await expect(result).resolves.toEqual({
      type: 'action',
      actionId: 'details',
    });
  });

  it('makes userDismissible=false remove Close/Cancel/Escape and keeps Confirm as the focus fallback', async () => {
    const service = TestBed.inject(ErpConfirmDialogService);
    const manager = TestBed.inject(ErpOverlayManager);

    const result = service.confirm({
      title: 'تأكيد إلزامي',
      message: 'لا يمكن الإغلاق بدون إجراء.',
      userDismissible: false,
      dismissOnEscape: true,
      dismissOnBackdrop: true,
    });

    const entry = manager.entries().at(-1)!;
    expect(entry.ref.config).toMatchObject({
      dismissOnEscape: false,
      dismissOnBackdrop: false,
      initialFocus: null,
      frame: {
        header: {
          showCloseButton: false,
        },
      },
    });
    expect(
      entry.ref.config.frame?.footer.actions.map((action) => action.id),
    ).toEqual(['confirm']);

    manager.completeTransition(entry.ref.id, 'entering');
    manager.dismissTopFromEscape();
    manager.dismissFromBackdrop(entry.ref.id);
    expect(manager.entries().at(-1)?.phase).toBe('open');

    expect(entry.ref.requestFrameAction('confirm')).toBe(true);
    manager.completeTransition(entry.ref.id, 'leaving');
    await expect(result).resolves.toEqual({
      type: 'action',
      actionId: 'confirm',
    });
  });

  it('rejects invalid auxiliary action contracts before opening an Overlay', () => {
    const service = TestBed.inject(ErpConfirmDialogService);
    const manager = TestBed.inject(ErpOverlayManager);
    const base = {
      title: 'Auxiliary validation',
      message: 'Validate actions.',
    };

    expect(() =>
      service.confirm({
        ...base,
        auxiliaryActions: [
          {id: 'one', label: 'One'},
          {id: 'two', label: 'Two'},
          {id: 'three', label: 'Three'},
        ],
      }),
    ).toThrowError(TypeError);

    expect(() =>
      service.confirm({
        ...base,
        auxiliaryActions: [{id: 'confirm', label: 'Reserved'}],
      }),
    ).toThrowError(TypeError);

    expect(() =>
      service.confirm({
        ...base,
        auxiliaryActions: [
          {id: 'same', label: 'One'},
          {id: 'same', label: 'Two'},
        ],
      }),
    ).toThrowError(TypeError);

    expect(() =>
      service.confirm({
        ...base,
        auxiliaryActions: [
          {
            id: 'icon-only',
            label: 'Icon only',
            presentation: 'icon-button',
          },
        ],
      }),
    ).toThrowError(TypeError);

    expect(manager.entries()).toEqual([]);
  });

  it('stacks above existing blocking Modal and Drawer parents without replacing them', async () => {
    const service = TestBed.inject(ErpConfirmDialogService);
    const manager = TestBed.inject(ErpOverlayManager);

    for (const [kind, position] of [
      ['modal', 'center'],
      ['drawer', 'start'],
    ] as const) {
      const parent = manager.open(ParentOverlayContent, {
        kind,
        position,
        frame: parentFrame(`Parent ${kind}`),
      });
      manager.completeTransition(parent.id, 'entering');

      const result = service.confirm({
        title: 'تأكيد داخلي',
        message: 'هذا التأكيد مفتوح من داخل نافذة حاجبة.',
        intent: 'warning',
      });

      expect(manager.entries()).toHaveLength(2);
      expect(manager.entries()[0]).toMatchObject({
        ref: parent,
        phase: 'open',
      });
      const confirmEntry = manager.entries()[1];
      expect(confirmEntry.ref.config.kind).toBe('modal');
      expect(confirmEntry.ref.config.blocking).toBe(true);

      manager.completeTransition(confirmEntry.ref.id, 'entering');
      confirmEntry.ref.dismiss('close-action');
      manager.completeTransition(confirmEntry.ref.id, 'leaving');

      await expect(result).resolves.toEqual({
        type: 'dismissed',
        reason: 'close',
      });
      expect(manager.entries()).toHaveLength(1);
      expect(manager.entries()[0].ref).toBe(parent);

      parent.dismiss('parent-cleanup');
      manager.completeTransition(parent.id, 'leaving');
      expect(manager.entries()).toEqual([]);
    }
  });

  it('rejects blank required copy before opening an Overlay', () => {
    const service = TestBed.inject(ErpConfirmDialogService);
    const manager = TestBed.inject(ErpOverlayManager);

    expect(() =>
      service.confirm({title: '   ', message: 'Message'}),
    ).toThrowError(TypeError);
    expect(() =>
      service.confirm({title: 'Title', message: '   '}),
    ).toThrowError(TypeError);
    expect(manager.entries()).toEqual([]);
  });
});
