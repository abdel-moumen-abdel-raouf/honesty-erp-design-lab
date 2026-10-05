import {Component, signal} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {ErpText} from '../../primitives/text/text';
import {ErpRepeater, ErpRepeaterItemTemplate} from './repeater';

@Component({selector: 'app-repeater-host', imports: [ErpRepeater, ErpRepeaterItemTemplate, ErpText], template: '<erp-repeater label="جهات الاتصال" [items]="items()" [minItems]="minItems()" [maxItems]="2" (addRequested)="adds.set(adds()+1)" (removeRequested)="removed.set($event)"><ng-template erpRepeaterItem let-value let-index="index"><erp-text data-item>{{ index }}:{{ value.name }}</erp-text></ng-template></erp-repeater>'})
class RepeaterHost { readonly items = signal([{key: 'a', value: {name: 'أحمد'}}]); readonly minItems = signal(0); readonly adds = signal(0); readonly removed = signal(''); }

describe('ErpRepeater', () => {
  it('renders stable keyed rich item context and controlled intents', () => {
    const fixture = TestBed.createComponent(RepeaterHost); fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[data-repeater-key="a"]')).not.toBeNull();
    expect(fixture.nativeElement.querySelector('[data-item]').textContent).toContain('0:أحمد');
    fixture.nativeElement.querySelector(':scope erp-repeater > erp-button button').click();
    expect(fixture.componentInstance.adds()).toBe(1);
    fixture.nativeElement.querySelector('erp-icon-button button').click();
    expect(fixture.componentInstance.removed()).toBe('a');
  });

  it('guards min, max, and disabled boundaries without mutating items', () => {
    const fixture = TestBed.createComponent(RepeaterHost); fixture.componentInstance.items.set([{key: 'a', value: {name: 'أ'}}, {key: 'b', value: {name: 'ب'}}]); fixture.componentInstance.minItems.set(2); fixture.detectChanges();
    const buttons = fixture.nativeElement.querySelectorAll('button');
    expect([...buttons].some((button: HTMLButtonElement) => button.textContent?.includes('إضافة') && button.disabled)).toBe(true);
    expect(fixture.nativeElement.querySelector('erp-icon-button button').disabled).toBe(true);
    expect(fixture.componentInstance.items()).toHaveLength(2);
  });
});
