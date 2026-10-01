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

  it('opens the exact system modal defaults and resolves true on Confirm', async () => {
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
      dismissOnEscape: true,
      dismissOnBackdrop: false,
      initialFocus: '[data-overlay-frame-action-id="cancel"] button',
      frame: {
        showHeader: true,
        showFooter: true,
        header: {
          title: 'متابعة العملية',
          subtitle: 'يرجى تأكيد هذا الإجراء.',
          icon: 'help',
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
    expect(manager.entries().at(-1)?.phase).toBe('leaving');
    manager.completeTransition(ref!.id, 'leaving');

    await expect(result).resolves.toBe(true);
  });

  it('maps every dismissal path to false and keeps Cancel as the safe initial focus', async () => {
    const service = TestBed.inject(ErpConfirmDialogService);
    const manager = TestBed.inject(ErpOverlayManager);

    const result = service.confirm({
      title: 'إلغاء العملية',
      message: 'هل تريد تنفيذ الإجراء؟',
    });
    const ref = manager.entries().at(-1)!.ref;
    manager.completeTransition(ref.id, 'entering');

    expect(ref.requestFrameAction('cancel')).toBe(false);
    expect(manager.entries().at(-1)?.phase).toBe('leaving');
    manager.completeTransition(ref.id, 'leaving');

    await expect(result).resolves.toBe(false);
  });

  it('maps warning and danger intents to registered semantic icons and button tones', () => {
    const service = TestBed.inject(ErpConfirmDialogService);
    const manager = TestBed.inject(ErpOverlayManager);

    void service.confirm({
      title: 'تحذير',
      message: 'راجع العملية.',
      intent: 'warning',
    });
    void service.confirm({
      title: 'حذف',
      message: 'سيتم حذف السجل.',
      intent: 'danger',
      confirmLabel: 'حذف',
      details: 'لا يمكن التراجع عن الحذف.',
    });

    const [warning, danger] = manager.entries().slice(-2);
    expect(warning.ref.config.frame).toMatchObject({
      header: {icon: 'warning'},
      footer: {
        actions: [
          expect.objectContaining({id: 'cancel', tone: 'neutral'}),
          expect.objectContaining({id: 'confirm', tone: 'warning'}),
        ],
      },
    });
    expect(danger.ref.config).toMatchObject({
      frame: {
        header: {icon: 'error'},
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
      confirmEntry.ref.dismiss('test-dismiss');
      manager.completeTransition(confirmEntry.ref.id, 'leaving');

      await expect(result).resolves.toBe(false);
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
