import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ErpPage} from '../../controls/page/page';
import {ComponentCatalogContent} from './component-catalog';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-component-catalog-page',
  imports: [ErpPage, ComponentCatalogContent],
  templateUrl: './component-catalog-page.html',
})
export class ComponentCatalogPage {}
