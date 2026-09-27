# Honesty ERP — Post-CR12 Wave A Repair V1

## Authority and status

Wave A passed technical gates at commit
`fae0e3d991c0e380d1d23746e09f7a4eda4293bd` but failed Product Owner
runtime and visual review. This repair program is correction-only and runs in
the required R00 through R05 order. It adds no public component family, does
not start Wave B, and does not declare visual approval, family freeze, or
closure of Basic Controls.

## Rejected runtime and visual results

1. The Lab theme control did not make the active Light/Dark theme globally
   authoritative because control showcases retained duplicated local theme
   contexts and Light-only roots.
2. The blocking Overlay did not reliably read as a full-application blocking
   layer above the Lab toolbar, and the backdrop composition required retuning.
3. Tooltip motion presets were technically present but insufficiently
   perceptible during Product Owner review.
4. Complete-page screenshot capture failed at runtime on `/controls/inputs`
   with the visible message `فشل التقاط الصفحة`; the actual browser exception
   must be captured before repair.
5. Field full-surface interaction passed unit tests but still requires direct
   runtime verification across representative editors, pickers, tones,
   statuses, helper positions, padding zones, and explicit actions.

## Repair boundaries

- R01 makes the Lab theme globally authoritative and removes opposite-theme
  islands from control showcase routes.
- R02 restores true full-viewport blocking Overlay stacking and applies the
  approved backdrop percentages while retaining `low` blur and false dismissal
  defaults.
- R03 strengthens Tooltip motion using the existing public preset catalog and
  anchored architecture.
- R04 captures the real screenshot exception, repairs it, and requires runtime
  success across the specified direct, Overlay-open, and iframe cases.
- R05 performs runtime Field hit-area verification and changes shared Field
  infrastructure only if a failure is reproduced.

Glass removal, Solid/Ghost redesign, SearchBox three-mode work,
Number/Money/DateRange changes, CheckBox/RadioBox redesign, File/Image hover,
FabMenu, SplitButton, and Wave B remain outside this repair.

## Completion boundary

R05 completion stops for Product Owner review. Technical success does not equal
visual approval.
