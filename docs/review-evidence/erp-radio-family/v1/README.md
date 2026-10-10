# ERP Radio Family — Internal Visual Evidence V1

## Authority and limitation

`ErpRadioBox` follows the explicit Product Owner direction recorded in
`RADIO_BOX_VISUAL_CONTRACT_V1.md`: preserve native radio semantics and apply
the accepted CheckBox V5 family method and visual language. The previously
named external file `erp-radiobox.html` was not available under Downloads on
2026-10-10, so no unavailable external measurement is presented here as
verified reference evidence.

## Reproduction

With the Design Lab running locally:

```powershell
$env:RADIO_EVIDENCE_URL='http://127.0.0.1:4999'
node tools/review/capture-radio-evidence.mjs
```

The script opens the secondary on-demand evidence on the dedicated RadioBox
and RadioGroup pages. It asserts one primary Workbench target through the
recorded measurements and captures:

- `radio-box-1440-light-rtl.png`
- `radio-box-390-dark-ltr.png`
- `radio-group-1280-dark-ltr.png`
- `radio-group-320-light-rtl.png`
- `runtime-measurements.json`

The RadioBox evidence includes standalone, title/description, required,
outline/filled/soft, 18/22/28/36 px, selected, disabled, read-only, danger and
success cases. RadioGroup evidence includes ordinary and Tile single-select
groups. These are internal-review artifacts; they do not record Product Owner
visual acceptance.
