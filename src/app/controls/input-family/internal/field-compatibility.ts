import {ErpInputConfigurationState} from '../input-contracts';
import {
  ErpFieldAppearance,
  ErpFieldBorderMode,
  ErpFieldShape,
  ErpFieldVariant,
} from '../field-contracts';

export interface ErpFieldCompatibilityInput {
  readonly appearance: ErpFieldAppearance;
  readonly borderMode: ErpFieldBorderMode;
  readonly shape: ErpFieldShape;
  readonly variant: ErpFieldVariant;
  readonly multiline: boolean;
}

export interface ErpFieldCompatibilityResult {
  readonly configurationState: ErpInputConfigurationState;
  readonly effectiveBorderMode: ErpFieldBorderMode;
}

export function resolveFieldCompatibility(
  input: ErpFieldCompatibilityInput,
): ErpFieldCompatibilityResult {
  const effectiveBorderMode =
    input.variant === 'text' ? 'underline' : input.borderMode;
  const glassCompatible =
    input.appearance !== 'glass' ||
    input.variant === 'solid' ||
    input.variant === 'outline' ||
    input.variant === 'subtle';
  const dashedCompatible =
    input.borderMode !== 'dashed' ||
    input.variant === 'outline' ||
    input.variant === 'subtle';
  const shapeCompatible = !(input.multiline && input.shape === 'pill');

  return {
    configurationState:
      glassCompatible &&
      dashedCompatible &&
      shapeCompatible
        ? 'ready'
        : 'invalid',
    effectiveBorderMode,
  };
}
