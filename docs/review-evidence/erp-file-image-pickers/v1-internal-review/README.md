# ErpFilePicker and ErpImagePicker internal visual review

Status: `TECHNICAL_VERIFIED`, `INTERNAL_VISUAL_REVIEW_COMPLETED`, `PRODUCT_OWNER_VISUAL_REVIEW_PENDING`.

These controls have no recorded binding component-specific external visual reference. The reviewed candidates are original Honesty ERP presentations and retain the shared Field Family, Button, Icon, Text, Tooltip, and native file-input ownership contracts.

## Reproduction

1. Run the Design Lab at `http://127.0.0.1:4999`.
2. Run `node tools/review/capture-file-image-pickers-evidence.mjs`.
3. Review `runtime-measurements.json` and the eight PNG files in this directory.

The capture uses a real browser `FileList`. Each scenario submits one accepted file and one rejected text file, verifies the selected row or image preview, confirms readable rejection feedback, activates and clears the queue, exercises the drag state, and records console, broken-image, target-count, control-count, direction, theme, and horizontal-overflow evidence.

## Scenarios

| Component | Viewport | Theme | Direction | Live controls | Result |
|---|---:|---|---|---:|---|
| FilePicker | 1440 x 900 | Light | RTL | 27 | 13/13 assertions |
| FilePicker | 390 x 844 | Dark | LTR | 27 | 13/13 assertions |
| ImagePicker | 1440 x 900 | Light | RTL | 28 | 13/13 assertions |
| ImagePicker | 390 x 844 | Dark | LTR | 28 | 13/13 assertions |

Total: 52/52 runtime assertions. Every scenario has one primary `data-showcase-target`, zero horizontal page overflow, zero broken images, and zero browser warnings or errors.

## Corrected finding

The generic JSON CVA editor cannot preserve browser `File` instances because JSON serializes each file as an empty object. Synchronizing a live `File[]` back into that editor caused the editor representation to overwrite the actual picker value with an invalid plain-object array. The file-selection workbenches now keep the generic JSON draft isolated from the non-serializable live value and provide an ERP-button sample action that applies a real local `File[]` to the same `FormControl`. The visible event and current-value evidence render file names rather than object serialization. The production pickers and their public APIs were not changed.

## Visual inspection

The desktop and narrow captures were inspected after selection. The drop surface, selected row, removal affordance, helper copy, rejection feedback, image preview, and sample action remain visible without clipping. The 390 px Dark/LTR captures show the selected content and the start of the live API panel in the same viewport after scrolling the review surface into view. No visual claim in this record constitutes Product Owner acceptance.
