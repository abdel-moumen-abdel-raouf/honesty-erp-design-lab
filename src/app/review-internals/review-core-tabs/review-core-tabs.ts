import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ErpStatusBadge} from '../../controls/status-badge/status-badge';
import {ErpTabItem, ErpTabPanel, ErpTabs} from '../../controls/tabs/tabs';
import {ErpStack} from '../../primitives/stack/stack';
import {ErpText} from '../../primitives/text/text';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector -- Design Lab review internals use the erp-review prefix.
  selector: 'erp-review-core-tabs',
  imports: [ErpStack, ErpStatusBadge, ErpTabPanel, ErpTabs, ErpText],
  templateUrl: './review-core-tabs.html',
})
export class ErpReviewCoreTabs {
  readonly items: readonly ErpTabItem[] = [
    {id: 'summary', label: 'ملخص غني', icon: 'dashboard'},
    {id: 'audit', label: 'المراجعة', icon: 'history'},
  ];
}
