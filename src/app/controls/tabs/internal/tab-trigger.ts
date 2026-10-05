/* eslint-disable @angular-eslint/component-selector */
import {booleanAttribute, ChangeDetectionStrategy, Component, input, output} from '@angular/core';
@Component({changeDetection: ChangeDetectionStrategy.OnPush,   selector: 'erp-tab-trigger', templateUrl: './tab-trigger.html', styleUrl: './tab-trigger.scss'})
export class ErpTabTrigger { readonly id=input.required<string>(); readonly controls=input.required<string>(); readonly selected=input(false,{transform:booleanAttribute}); readonly disabled=input(false,{transform:booleanAttribute}); readonly tabIndex=input(0); readonly activated=output<void>(); readonly keyPressed=output<KeyboardEvent>(); }
