import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ErpContainer} from '../../primitives/container/container';
import {ErpDivider} from '../../primitives/divider/divider';
import {ErpGrid} from '../../primitives/grid/grid';
import {ErpInline} from '../../primitives/inline/inline';
import {ErpSection} from '../../primitives/section/section';
import {ErpStack} from '../../primitives/stack/stack';
import {ErpSurface} from '../../primitives/surface/surface';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-structural-primitives',
  imports: [
    ErpContainer,
    ErpDivider,
    ErpGrid,
    ErpInline,
    ErpSection,
    ErpStack,
    ErpSurface,
  ],
  templateUrl: './structural-primitives.html',
  styleUrl: './structural-primitives.scss',
})
export class StructuralPrimitives {}
