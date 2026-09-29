export type ErpInputConfigurationState =
  | 'ready'
  | 'invalid';

export type ErpInputState =
  | 'null'
  | 'empty'
  | 'no-selection'
  | 'invalid-entry'
  | 'valid-entry';

export type ErpInputValidationSource =
  | 'presence'
  | 'constraint'
  | 'format'
  | 'domain'
  | 'custom'
  | 'external';

export interface ErpInputValidationIssue {
  readonly code: string;
  readonly message: string;
  readonly source: ErpInputValidationSource;
  readonly meta?: Readonly<
    Record<string, string | number | boolean | null>
  >;
}

export interface ErpInputValidationSnapshot {
  readonly state: ErpInputState;
  readonly valid: boolean;
  readonly errors: readonly string[];
  readonly issues: readonly ErpInputValidationIssue[];
}
