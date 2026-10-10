# ErpTabs V1 internal reference review

This evidence compares the binding `ERP-TABS.html` reference (SHA-256
`CFBFA876AC6521ED4A6BDBEB7AAF07D01B62F8808B65F5C749E0B06F44D8C9B9`) with
the current Angular implementation and its dedicated live workbench.

Run the Angular app on `http://127.0.0.1:4999`, serve the Downloads directory
on `http://127.0.0.1:8766`, then run:

```text
node tools/review/capture-tabs-evidence.mjs
```

The capture set covers reference and implementation at desktop and narrow
viewports, Light/Dark, RTL/LTR, the on-demand exact-reference experience, and
the single live target. `runtime-measurements.json` records tab/list/indicator
geometry, typography, target count, selected label, page overflow, broken
images, and browser diagnostics. Reference colors and font family are not
parity criteria; geometry, state distribution, and motion remain binding.

Internal review found the literal Tabs component geometry aligned with the
reference specimens. The dedicated workbench was incomplete because it exposed
only one tab; the generated fixture now provides five Arabic ERP tabs, a
controlled active model, counts/icons, a disabled tab, and observable model and
event changes on the same primary target.

The desktop horizontal specimen measures `35.59375px` in both reference and
implementation, with `13px / 15.6px`, `10px 16px` padding, `8px` gap, and a
`3px` indicator. The desktop vertical list is `240px` wide in both captures;
its first tab is `231px × 40px` and its indicator is `3px × 40px`. Arabic glyph
width changes the intrinsic active-tab width, as permitted by the font/content
exception. The source reference document itself has `107px` page overflow at
390px because of its code/sample document chrome; this is recorded but is not
attributed to the Tabs component. The implementation records zero page
horizontal overflow at both 390px and 320px.

The narrow evidence also exposed an integration regression in the closed
off-canvas Sidebar: its translated fixed box expanded the document scrollable
area. AppShell now contains that intentional off-canvas visual overflow at its
own narrow boundary, while keeping the open drawer intact. Shell governance
protects the containment marker.

This evidence is `INTERNAL_VISUAL_REVIEW_COMPLETED`; Product Owner visual
acceptance remains pending.
