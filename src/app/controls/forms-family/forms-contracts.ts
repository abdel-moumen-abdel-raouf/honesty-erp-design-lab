export interface ErpFormValidationIssue {
  readonly key: string;
  readonly message: string;
  readonly fieldLabel?: string;
  readonly targetId?: string;
}

export interface ErpRepeaterItem<TValue = unknown> {
  readonly key: string;
  readonly value: TValue;
}

export interface ErpRepeaterItemContext<TValue = unknown> {
  readonly $implicit: TValue;
  readonly item: ErpRepeaterItem<TValue>;
  readonly key: string;
  readonly index: number;
}

export interface ErpStepDefinition {
  readonly id: string;
  readonly label: string;
  readonly description?: string;
  readonly disabled?: boolean;
  readonly optional?: boolean;
  readonly completed?: boolean;
}

export interface ErpStepPanelContext {
  readonly $implicit: ErpStepDefinition;
  readonly step: ErpStepDefinition;
}
