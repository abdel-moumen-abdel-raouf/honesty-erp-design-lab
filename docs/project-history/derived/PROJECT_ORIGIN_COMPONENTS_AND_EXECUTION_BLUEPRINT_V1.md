# Honesty ERP — Project Origin, Components, and Execution Blueprint V1

## Document purpose and evidence rules

This document is a bounded historical reconstruction and planning analysis. It is not an implementation authorization, a visual approval, or a replacement for current repository authority.

Evidence precedence used here is:

1. `README_FIRST.md`;
2. `NEW_CHAT_HANDOFF.md`;
3. `src/app/controls/CONTROLS_EXECUTION_ROADMAP_V1.md`;
4. `src/app/controls/INPUTS_PRODUCT_OWNER_REVIEW_FINDINGS_V1.md`;
5. verified current repository source;
6. `docs/project-history/raw/ERP_DESIGN_LAB_CHATGPT_CHAT_HISTORY.txt` as historical evidence.

Analysis snapshot metadata:

- **Repository snapshot analyzed:** `a35006d7c435a4feb6159e8e64861e83a7d2fccc`
- **Historical archive:** `docs/project-history/raw/ERP_DESIGN_LAB_CHATGPT_CHAT_HISTORY.txt`
- **Historical archive SHA256:** `4657817D73184A8DF0AAA89E3ECD6EF0A76D754DB791ABD7CB76B53598BC19E6`

Current-state claims in this V1 analysis describe that repository snapshot. Later repository changes do not retroactively change those claims; a later analysis must identify and evaluate its own snapshot.

Archive citations use the form **History Lx–Ly** and refer to exact one-based lines in the raw archive. Historical assistant suggestions are identified as such and are not treated as Product Owner requirements unless later accepted. Current-state assertions name the source paths that were inspected. The decision vocabulary is restricted to: **CURRENT**, **IMPLEMENTED**, **PARTIALLY_IMPLEMENTED**, **NOT_IMPLEMENTED**, **DEFERRED**, **SUPERSEDED**, **REJECTED**, **HISTORICAL_ONLY**, **UNRESOLVED**, and **NEEDS_PRODUCT_OWNER_CONFIRMATION**.

# 1. Executive Reconstruction

## Direct historical evidence

The work began because the .NET backend was already substantially advanced while the Angular frontend was the blocking problem. Earlier AI-assisted UI design had produced work the Product Owner considered poor enough to discard. The reported symptoms were inconsistent buttons, sizing, action ordering, pages, forms, navigation, empty states, and a weak path to scaling roughly 300–400 ERP pages. The Product Owner deliberately stopped feature expansion to solve the foundation instead (**History L1–L30**).

The archive quickly reframed the issue as architectural rather than a collection of isolated CSS defects. “Everything configurable” had produced or threatened God components; the proposed remedy was controlled, typed configurability and explicit layers: Design System, UI Components, UI Patterns, and Feature Pages (**History L36–L42, L99–L115, L245–L340**). Table and form discussions reinforced the same boundary: reusable UI should own presentation and interaction, while pages own data access and business rules (**History L422–L620, L978–L1118**).

The existing system was not empty. The later audit found hundreds of symbols, more than one hundred components, many route/page archetypes, strong data, forms, permission, icon, navigation, and workflow foundations, but also token fragmentation, native-control bypasses, and insufficient visual/governance boundaries (**History L4099–L4848, L7527–L8367**). Technical closure then demonstrated that route counts, screenshot counts, and passing gates did not make the UI visually acceptable: 116 routes had evidence, but zero had Product Owner visual approval, and the Product Owner rejected the visual language, Dark theme, hierarchy, spacing, and review experience (**History L34977–L35458, L37438–L37463, L37489–L37896**).

The decisive response was to separate visual experimentation and approval from production integration. The Product Owner proposed a dedicated repository, and the accepted model made it an Arabic-first, RTL-first Angular/TypeScript/SCSS Design Lab with no backend or feature pages. It would hold approved tokens, specs, screenshots, decisions, primitives, and review evidence; Codex would later implement approved results in production architecture (**History L43855–L43916, L43920–L44000**). The Design Lab was explicitly intended to solve the missing visual-design and review-authority problem, not to create a second unrelated design system (**History L44214–L44266**).

## Synthesis

The original underlying problem was a mismatch between breadth and authority: the old frontend had many reusable capabilities, but no reliably governed path from design intent to tokens, component contracts, isolated evidence, Product Owner approval, and then feature-scale adoption. The Design Lab is therefore both:

- a technical reference implementation for Foundation, primitives, controls, overlays, and governance; and
- a review instrument that makes visual and runtime behavior auditable before any broader ERP migration.

The eventual vision is an Arabic-first, RTL-first, desktop-oriented ERP UI system with controlled APIs, semantic token ownership, ERP-only authoring boundaries, reusable basic controls and composites, data-heavy patterns, consistent interaction, and an explicit Product Owner approval gate. The Design Lab does not itself prove that the full ERP application shell, patterns, tables, workflows, and feature pages are complete.

# 2. Project Origin and Evolution

| Stage | Historical reconstruction | Evidence | Reconciled status |
|---|---|---|---|
| 1. Frontend becomes the blocker | Backend work was comparatively mature; Angular UI inconsistency and prior discarded AI designs blocked scaling. | History L1–L30 | **HISTORICAL_ONLY** as origin; the problem statement remains relevant. |
| 2. Root-cause reframing | The discussion moved from fixing individual screens to controlling component scope, preventing God components, and defining layers. | History L36–L42, L87–L115, L245–L340 | **CURRENT** in governance. |
| 3. ERP capability decomposition | Data Explorer, SmartTable, forms, page headers, empty states, wizards, selectors, and page archetypes were decomposed into reusable systems with page-owned data/business rules. | History L367–L620, L624–L1118 | **PARTIALLY_IMPLEMENTED** across the historical main app; mostly absent from the current Design Lab. |
| 4. Old-repository audit | A full audit identified 115 components, hundreds of public symbols, valuable reusable engines, two major boundary violations, and fragmented visual/token architecture. | History L2130–L3091, L4099–L4848, L7527–L8367 | **HISTORICAL_ONLY** inventory evidence; individual capabilities require current verification. |
| 5. Foundation V2 and closure attempt | A large technical program added contracts, governance, per-component evidence, and a migration plan. | History L21922–L26236, L31779–L33879 | **SUPERSEDED** as the active execution model; useful lessons were retained. |
| 6. Migration halted for visual review | Supplier migration was proposed, then halted because Customers and the Foundation were technically strong but not visually approved. | History L26237–L27593, L27599–L28123 | **REJECTED** as the next action; feature migration remains gated. |
| 7. Visual closure rejected | The Product Owner rejected the visual language, Dark theme, overboxing, hierarchy, typography, scale, spacing, and the supposed isolation of showcase routes. | History L34977–L35458, L37438–L37896 | **CURRENT** historical constraint: technical completion never equals visual approval. |
| 8. Rules of the new system | Token layers, no native page authoring, small meaningful primitives, isolated evidence, reference-first visual work, and Product Owner approval were established. | History L37949–L40970, L41658–L41766, L42811–L42919, L43308–L43380 | **CURRENT**, subject to later authority refinements. |
| 9. Design Lab conceived | A separate Angular Design Lab became the proposed visual authority and review workspace; no backend, Customers, or Suppliers. | History L43855–L44000 | **IMPLEMENTED** as this repository. |
| 10. Foundation-first review workflow | Foundation pages would be reviewed and frozen incrementally, then reference-led components, composites, patterns, and only later production integration. | History L43751–L43797, L44049–L44170, L44270–L44322 | **PARTIALLY_IMPLEMENTED**; Foundation and many controls exist, but current authority still requires Product Owner runtime/visual review. |
| 11. Current Design Lab maturity | Actual source now includes Foundation review routes, structural/text/icon primitives, button/input/overlay families, review internals, governance, and zero-warning tooling. | `src/app/app.routes.ts`; `src/app/foundation/**`; `src/app/primitives/**`; `src/app/controls/**`; `src/app/shared/**`; `package.json` | **IMPLEMENTED** technically, **PARTIALLY_IMPLEMENTED** as an approved product system. |

Important pivots were therefore not simple rewrites. The project preserved architectural ideas that worked—typed APIs, backend-independent UI, icon ownership, forms/data engines, permission separation, staged overlay transactions—while rejecting the assumption that route coverage, screenshot automation, or a technically “closed” foundation supplied visual authority.

# 3. Core Product Vision

| Quality | Evidence and interpretation | Current status | Confidence |
|---|---|---|---|
| Arabic-first | The original shell and workflows were explicitly Arabic-first; the accepted Design Lab brief requires Arabic-first output. | **CURRENT**; encoded in `AGENTS.md` and current Arabic review copy. | HIGH |
| RTL-first | RTL was an original requirement, later treated as first-class behavior rather than a visual afterthought. The Design Lab brief explicitly requires RTL-first Angular. | **CURRENT**; logical CSS and RTL motion/direction contracts exist. | HIGH |
| ERP-oriented | Data-heavy lists, transaction forms, permissions, approval/workflow, money, temporal, party, stock, and reporting needs drove the component discussion. | **CURRENT** as product orientation; not all ERP patterns are in this repo. | HIGH |
| Desktop-oriented | Desktop-first was explicitly accepted while preserving responsive readability. | **CURRENT**; Foundation Query API and review widths enforce responsive behavior. | HIGH |
| Reusable architecture | The Product Owner sought controlled reuse across hundreds of pages, not one-off feature components. | **CURRENT**. | HIGH |
| Visual consistency | Inconsistency was a primary trigger, but consistency on a rejected visual language was explicitly deemed insufficient. | **CURRENT**, with Product Owner review still required. | HIGH |
| Theme behavior | Light/Dark and semantic themes were durable goals. Historical user-selectable/system theme ideas evolved: current authority makes the App root the sole runtime theme authority and removes Theme from Preferences. | **SUPERSEDED** in mechanism; **CURRENT** in Light/Dark capability. | HIGH |
| Component ownership | Native semantics belong inside ERP primitives/controls; pages author ERP components rather than raw visible HTML/control semantics. | **CURRENT** and governed. | HIGH |
| Maintainability and scalability | Stable typed APIs, layer boundaries, token ownership, testable behavior, and versioned evolution were repeatedly emphasized. | **CURRENT**. | HIGH |
| Functional accessibility | The Product Owner rejected screen-reader/blind-helper work as an acceptance program, but preserved keyboard, focus, labels, native semantics, and necessary ARIA as interaction correctness. | **CURRENT** only to the extent encoded by current contracts; no claim of WCAG conformance. | MEDIUM |
| Developer ergonomics | Controlled enums/configuration, centralized behavior, isolated public APIs, and escape hatches through composition were preferred over arbitrary CSS and God components. | **CURRENT**. | HIGH |
| Design Lab as authority | The Lab exists to make Foundation/component evidence inspectable and to separate visual approval from production integration. | **CURRENT**, but its candidates are not automatically approved. | HIGH |

# 4. Original Problem Statement

| Problem class | Underlying problem, not merely symptom | Historical evidence | Relevant today? |
|---|---|---|---|
| UI consistency | Common actions, sizes, state treatments, page hierarchy, forms, and empty states varied across screens. | History L26–L30, L718–L806 | Yes — **CURRENT** review concern. |
| Architecture | Over-configurable components and feature-specific duplication blurred primitives, patterns, and pages. | History L36–L42, L99–L115, L245–L340 | Yes — mitigated by current layers, but still a standing constraint. |
| Design tokens | The old system had fragmented tokens and insufficient semantic/component ownership. | History L123–L210, L4099–L4848, L7527–L8367 | Yes — substantially **IMPLEMENTED** in this repo. |
| Component reuse | Reuse existed, but component boundaries and public APIs were inconsistent; some features bypassed shared controls. | History L1392–L1668, L7527–L8367 | Yes — governance now addresses bypass; higher-level patterns remain missing. |
| Theme | Light/Dark output lacked reliable hierarchy; Dark became a visual blocker. Later theme ownership also fragmented. | History L34977–L35458, L37489–L37896 | Yes — App-only authority is **IMPLEMENTED**; Product Owner acceptance remains pending. |
| RTL/Arabic | Arabic layout, mixed-direction identifiers, logical movement, and typography required first-class handling. | History L1–L30, L1321–L1388, L43062–L43078 | Yes — **CURRENT**. |
| Interaction | Keyboard/focus, overlay lifecycle, staged selection, table behavior, and controlled loading/disabled states could not be left to page-specific code. | History L480–L620, L1321–L1388, L43498–L43513 | Yes — many foundations are **IMPLEMENTED**, broader patterns are not. |
| Governance | Architectural rules could drift because tests/routes/screenshots measured presence rather than ownership or approval. | History L31779–L33879, L34977–L35458, L37438–L37896 | Yes — strong current governance exists, but it cannot replace Product Owner review. |
| Workflow/review | Visual design, implementation, and review were conflated. Showcases were not truly isolated, and evidence volume hid weak reviewability. | History L31350–L31767, L34977–L35458, L37489–L37896 | Yes — this is the central reason for the Design Lab. |

The core problem can be stated as follows: **the ERP needed a trustworthy, layered conversion path from Product Owner intent to approved visual contracts to reusable production components, with evidence strong enough to prevent both visual drift and architectural drift.**

# 5. Decision Reconciliation Model

The following rules govern every status in this document:

- **CURRENT** — presently authoritative rule or approved direction, whether or not fully implemented.
- **IMPLEMENTED** — verified in current repository source; it does not imply Product Owner visual approval.
- **PARTIALLY_IMPLEMENTED** — meaningful source exists, but the intended capability, evidence, approval, or breadth is incomplete.
- **NOT_IMPLEMENTED** — no current source implementation was found and the item is not merely deferred or rejected.
- **DEFERRED** — current authority explicitly postpones it.
- **SUPERSEDED** — a later decision replaced an earlier proposal/API/mechanism.
- **REJECTED** — explicitly declined or invalidated.
- **HISTORICAL_ONLY** — existed in the audited old system or historical plan but is not current Design Lab authority.
- **UNRESOLVED** — evidence conflicts or does not produce a final answer.
- **NEEDS_PRODUCT_OWNER_CONFIRMATION** — historically plausible but cannot be authorized from current authority.

## Reconciliation chains for major conflicts

| Topic | Decision chain | Effective conclusion |
|---|---|---|
| Visual closure | Broad route/screenshot closure → Product Owner observes poor visual language and false isolation → visual system rejected → separate Design Lab proposed → current Lab candidates await page-by-page review. | **PARTIALLY_IMPLEMENTED**; never describe technical green as visual approval. |
| Feature migration | Supplier proposed after technical V2 → Product Owner requires Customer/Foundation visual review first → migration halted → Design Lab created. | Supplier/customer migration is **DEFERRED** and outside this repo. |
| Theme authority | Historical Theme preference and Light/Dark/System proposal → multiple local review contexts caused opposite-theme islands → current authority removes Theme from Preferences and assigns the sole runtime `data-theme` binding to App. | Historical user-selectable/system Preference mechanism is **SUPERSEDED**; App-only Light/Dark authority is **CURRENT/IMPLEMENTED**. |
| Typography primitives | Early recommendation included Text/Heading/Link → later repository contract established ErpText as the sole public typography gateway, with no ErpHeading or ErpLink. | Separate Heading/Link primitives are **SUPERSEDED**. |
| Select architecture | Old repo had Select/MultiSelect/RemoteSelect; historical decision favored one typed public ErpSelect → current Design Lab implements ItemPicker and ComboBox selection composites, but no `ErpSelect`. | One universal ErpSelect is **NOT_IMPLEMENTED** and **NEEDS_PRODUCT_OWNER_CONFIRMATION**, not an automatic backlog authorization. |
| Table ownership | Early “SmartTable for everything” concern → Product Owner selected a primitive table plus SmartTable composition → current Design Lab has neither. | Table family is **NOT_IMPLEMENTED** here and requires a dedicated authorized phase/reference. |
| Accessibility | Assistant proposed WCAG gates → Product Owner clarified “no screen readers or blind helpers” → assistant retained keyboard/focus/native semantics as functional correctness. | Formal WCAG/screen-reader program is **REJECTED/HISTORICAL_ONLY**; interaction correctness is **CURRENT**. |
| Component references | Assistant initially generalized design work → Product Owner required a reference or explicit waiver before visual production components → structural primitives received a waiver; current controls have family-specific authority. | Reference-first or explicit waiver is **CURRENT**. |
| Google AI Studio | Proposed as a rapid visual lab and initially preferred for bootstrap → current repository is an Angular Design Lab with Codex implementation and Product Owner review. | The exact Google AI Studio workflow is **HISTORICAL_ONLY**; the separate Design Lab objective is **IMPLEMENTED**. |
| Overlay defaults | Historical/current programs changed blur/backdrop defaults multiple times → latest authority and source use medium blur, primary backdrop, Escape/backdrop false. | Earlier low/default combinations are **SUPERSEDED**. |
| SearchBox mode vocabulary | Earlier popup boolean/nonblocking popup contract → current source exports `modal \| dropdown \| inline` and current authority describes three-mode behavior. | Old `popupMode` contract is **SUPERSEDED**. |

# 6. Master Component and Capability Inventory

## Inventory method

The archive contains two different kinds of names:

- a concrete audited old-repository inventory of 115 Angular components, documented in the archive's inventory and component-contract report (**History L2130–L2131, L9145–L21071**); and
- proposals/examples raised during architecture discussions, which are not requirements unless later accepted (**History L214–L241, L367–L399, L624–L714**).

The tables below normalize renamed counterparts into one row where the old and current names clearly describe the same role. Every old audited component name is retained either as the row name or in the Notes column. “Absent” means absent from this Design Lab at the inspected HEAD, not absent from the historical main ERP repository. Current implementation was verified from selectors and source under `src/app/primitives/**`, `src/app/controls/**`, `src/app/shared/**`, `src/app/foundation/**`, and the route inventory in `src/app/app.routes.ts`.

**Inventory warning:** the 166 rows are an evidence inventory, not a 166-component implementation backlog. The inventory intentionally includes implemented systems, historical-only capabilities, superseded contracts, internal foundations, patterns, services, guards, and candidate public components. Section 6 is the canonical row-level classification; presence in this inventory does not authorize implementation.

## Foundation, tokens, primitives, typography, and iconography

| Family | Component / Capability | Type | Evidence / Source | Intended Purpose | Dependencies | Current Repository State | Decision Status | Notes |
|---|---|---|---|---|---|---|---|---|
| Foundation | Reference tokens | Sass foundation | History L123–L210; L40276–L40370 | Compile-time physical primitives. | None | Present under `src/styles/foundation/reference/**`. | **IMPLEMENTED** | Must not emit runtime CSS by default. |
| Design Tokens | Semantic tokens | Runtime CSS contract | History L123–L210; L40276–L40370 | Shared meaning for color, type, spacing, state, motion, and layers. | Reference | Present under `src/styles/foundation/semantic/**`. | **IMPLEMENTED** | Current token path is Reference → Semantic → resolution → Component Tokens. |
| Foundation | Theme mappings | Theme resolution | History L41658–L41766; L42682–L42716 | Resolve semantic roles for Light/Dark. | Semantic | Present in `_light.scss` / `_dark.scss`; App is sole runtime authority. | **IMPLEMENTED** | Historical Theme Preference is superseded. |
| Foundation | Density | Runtime resolution | History L41658–L41766; L43082–L43103 | Compact/comfortable/spacious geometry policy. | Reference, Semantic | Foundation page and contracts present. | **IMPLEMENTED** | Current controls may still await visual acceptance. |
| Foundation | Query API | Sass public API | History L878–L927; L41658–L41766 | Central responsive viewport/container behavior. | Reference breakpoints | Present under `src/styles/foundation/queries/**`. | **IMPLEMENTED** | Raw component breakpoints remain forbidden. |
| Design Tokens | Component Token framework | Sass/runtime contract | History L40276–L40370; L43130–L43160 | Component-scoped canonical slots/facets. | Semantic/resolution | Framework plus 46 concrete modules present. | **IMPLEMENTED** | Feature/page overrides forbidden. |
| Foundation | Colors and feedback hues | Review surface | History L43751–L43795; L44049–L44066 | Review palettes, themes, status/feedback colors. | Reference/Semantic/Theme | Routed Foundation pages exist. | **IMPLEMENTED** | Technical evidence is not visual approval. |
| Foundation | Typography roles | Review surface | History L41658–L41766; L43775–L43790 | Arabic/Latin type roles and scale. | Reference/Semantic/Theme | Foundation typography page exists. | **IMPLEMENTED** | Current fonts are repository authority, not inferred here. |
| Foundation | Spacing | Review surface | History L41658–L41766; L43775–L43790 | Shared spacing/inset/layout roles. | Reference/Semantic | Foundation spacing page exists. | **IMPLEMENTED** | 4px historical scale was accepted. |
| Foundation | Borders and radius | Review surface | History L41658–L41766; L43775–L43790 | Shared edge and shape roles. | Reference/Semantic | Foundation page exists. | **IMPLEMENTED** | Visual acceptance remains separate. |
| Foundation | Elevation | Review surface | History L41658–L41766; L43775–L43790 | Genuine layering/elevation roles. | Semantic | Foundation page exists. | **IMPLEMENTED** | Decorative shadow use remains constrained. |
| Foundation | Motion catalog/adapter | Runtime foundation | History L43775–L43790; later current authority | Shared named motion vocabulary and lifecycle. | Motion tokens, Animate.css adapter | Present under `src/app/foundation/motion/**`. | **IMPLEMENTED** | Vendor names are internal. |
| Foundation | Layers | Runtime foundation | History L43775–L43790 | Stable stacking roles. | Semantic/Theme | Foundation layer page and overlay use exist. | **IMPLEMENTED** | No page-owned z-index system. |
| Foundation | Charts palette/evidence | Review foundation | History L42653–L42672; L43775–L43790 | Chart color/system review, not a chart product family by itself. | Colors/Theme | Foundation chart page and review internal exist. | **PARTIALLY_IMPLEMENTED** | Production chart components are absent. |
| Foundation | UI Preferences | Service/review foundation | History L42224–L42245; L42814–L42888; L43494–L43599 | Typed user display/format settings. | Semantic formatting policies | Preferences services/page present. | **PARTIALLY_IMPLEMENTED** | Theme is intentionally no longer a Preference. Backend persistence remains outside current Lab. |
| Layout | ErpContainer | Public primitive | History L42904–L42919; L44088–L44115 | Logical centered width/gutter boundary. | Component Tokens | `src/app/primitives/container/**`. | **IMPLEMENTED** | Current widths full/48/75/90rem. |
| Layout | ErpStack | Public primitive | History L40412–L40548; L42613–L42627 | Vertical flow with tokenized gap/alignment. | Component Tokens | Present. | **IMPLEMENTED** | Meaningful primitive, not DOM mirror. |
| Layout | ErpInline | Public primitive | History L40412–L40548; L42613–L42627 | Inline/flex flow with wrap/alignment. | Component Tokens | Present. | **IMPLEMENTED** | RTL logical behavior. |
| Layout | ErpGrid | Public primitive | History L40412–L40548; L41658–L41766 | Controlled grid and responsive behavior. | Query API, Component Tokens | Present. | **IMPLEMENTED** | Columns 1–6. |
| Layout | ErpSurface | Public primitive | History L40412–L40548; L44088–L44115 | Tokenized surface/border/radius/elevation/padding. | Component Tokens | Present. | **IMPLEMENTED** | Not a generic card product component. |
| Layout | ErpSection | Public primitive | History L40412–L40548 | Semantic section gap without visual overboxing. | Component Tokens | Present. | **IMPLEMENTED** | No inherent border/background. |
| Layout | ErpDivider | Public primitive | History L214–L241; current source | Logical separator. | Component Tokens | Present. | **IMPLEMENTED** | Replaces raw `hr` authoring. |
| Typography | ErpText | Public primitive | History L40412–L40548; current authority | Sole production typography gateway and semantic internal host owner. | Typography Component Tokens | `src/app/primitives/text/**`. | **IMPLEMENTED** | Separate ErpHeading/ErpLink are superseded. |
| Iconography | ErpIcon | Public primitive/facade | History L7527–L8367; L4099–L4848 | Semantic icon registry, vendor isolation, RTL, tone/variant/size. | Registry, Component Tokens | `src/app/primitives/icon/**`; 72 semantic names in current contract. | **IMPLEMENTED** | Old icon facade strength was intentionally preserved. |

## Buttons, actions, field foundation, entry, numeric, and choice controls

| Family | Component / Capability | Type | Evidence / Source | Intended Purpose | Dependencies | Current Repository State | Decision Status | Notes |
|---|---|---|---|---|---|---|---|---|
| Buttons / Actions | ErpButton | Public basic control | History L245–L340; L42374–L42584 | Standard text action. | Text, Icon, tokens, ripple | Present. | **IMPLEMENTED** | Old audited `Button` maps here. |
| Buttons / Actions | ErpIconButton | Public basic control | History L245–L340; L1668–L1707 | Icon-only semantic action. | Icon, Tooltip composition | Present. | **IMPLEMENTED** | Visible Tooltip evidence required at consumption boundary. |
| Buttons / Actions | ErpFab | Public basic control | History L42374–L42584; L42858–L42858 | Floating primary action control. | Button foundation, Icon | Present. | **IMPLEMENTED** | Position belongs to parent. |
| Buttons / Actions | ErpExtendedFab | Public basic control | Current source; Button-family program | FAB with visible text label. | Button foundation, Text, Icon | Present. | **IMPLEMENTED** | Not named in the earliest archive inventory. |
| Composite Controls | ErpSplitButton | Public composite | History L42374–L42584; L42858–L42858 | Primary action plus compact related actions. | Button, Overlay/action menu | Present. | **PARTIALLY_IMPLEMENTED** | Current governance records a temporary legacy compact-overlay exception. |
| Composite Controls | ErpFabMenu | Public composite | History L42374–L42584; L42858–L42858 | Expandable FAB action menu. | Fab/Button/Tooltip | Present. | **IMPLEMENTED** | Later visual approval still required. |
| Composite Controls | ErpButtonGroup | Public composite | History L245–L340; current roadmap | Ordered button collection. | Button | Present. | **IMPLEMENTED** | Distinct from historical form grouping. |
| Menus | ErpActionMenu / internal action-menu content | Historical/public then internal capability | History L9145–L21071 | Compact menu of actions. | Buttons, overlay/menu behavior | Internal action-menu content exists; no current public `ErpActionMenu`. | **PARTIALLY_IMPLEMENTED** | Public status needs confirmation before reuse. |
| Utilities | ErpAsyncActionLock | Historical directive/component | History L9145–L21071 | Prevent duplicate asynchronous actions. | Action state | Absent. | **HISTORICAL_ONLY** | Old audited capability, not current backlog authority. |
| Field Foundation | ErpInputBase | Internal abstract base | Current authority/roadmap | Stable CVA, normalized value, disabled/focus/validation substrate. | Angular Forms | Present. | **IMPLEMENTED** | Non-renderable, no selector/tokens. |
| Field Foundation | ErpFieldBase | Internal abstract base | Current roadmap | Shared field presentation/validation inputs. | InputBase | Present. | **IMPLEMENTED** | Not authored by pages. |
| Field Foundation | ErpFieldFrame | Internal component | Current roadmap; current authority | Visual field shell, labels, hit-area delegation. | Field tokens | Present. | **IMPLEMENTED** | Visual review remains ongoing. |
| Field Foundation | ErpFieldTrigger | Internal component | Current roadmap | Whole-field semantic trigger for pickers. | FieldFrame | Present. | **IMPLEMENTED** | Owns native button internally. |
| Feedback | ErpFieldFeedback | Internal component | Current roadmap | In-flow field error/helper/status surface. | Field contracts | Present. | **IMPLEMENTED** | Not Tooltip/Overlay. |
| Forms | ErpFormField | Historical wrapper | History L9145–L21071 | Old field composition wrapper. | Old forms system | No current public component; replaced by internal Field family. | **SUPERSEDED** | Old audited `FormField`. |
| Forms | ErpFormActions | Historical form component | History L9145–L21071 | Standard form action row. | Button/action policy | Absent. | **NEEDS_PRODUCT_OWNER_CONFIRMATION** | Current Overlay footer covers only blocking surfaces. |
| Forms | ErpValidationSummary | Historical form component | History L9145–L21071 | Aggregate validation issues. | Input validation contract | Absent. | **NEEDS_PRODUCT_OWNER_CONFIRMATION** | Current inputs expose issues but no aggregate component. |
| Field Entry | ErpTextBox / old ErpTextInput | Public basic control | History L9145–L21071 | Single-line text entry. | FieldBase/Frame | Present as `ErpTextBox`. | **IMPLEMENTED** | Historical name superseded. |
| Field Entry | ErpTextAreaBox / old ErpTextarea | Public basic control | History L9145–L21071 | Multi-line text entry. | FieldBase/Frame | Present. | **IMPLEMENTED** | Current public name differs. |
| Field Entry | ErpPasswordBox / old ErpPasswordInput | Public basic control | History L9145–L21071 | Password draft/reveal entry. | FieldBase, domain action | Present. | **IMPLEMENTED** | Reveal stays distinct from generic trailing icon. |
| Search | ErpSearchBox / old GlobalSearch capability | Public control | History L26–L30; L367–L399; old GlobalSearch at L9145–L21071 | Inline/dropdown/modal query and selection. | FieldBase, anchored/blocking overlays, SelectionTile | Present with `modal \| dropdown \| inline`. | **PARTIALLY_IMPLEMENTED** | Current authority still requires runtime/visual re-review. Shell-level GlobalSearch remains absent. |
| Field Entry | ErpUrlBox | Public basic control | Historical input-family direction; current roadmap | Progressive URL draft and validated commit. | FieldBase/domain validation | Present. | **IMPLEMENTED** | Built-in or developer pattern. |
| Field Entry | ErpTelBox | Public basic control | Historical input-family direction; current roadmap | Telephone entry without alphabetic commits. | FieldBase/domain validation | Present. | **IMPLEMENTED** | Mixed-direction handling remains important. |
| Numeric | ErpNumberBox / old ErpNumberInput | Public basic control | History L9145–L21071 | Text-like decimal numeric editor. | FieldBase/domain validation/preferences | Present. | **IMPLEMENTED** | Browser number spinner intentionally absent. |
| Numeric | ErpNumberStepper | Public basic control | Current roadmap | Scalar increment/decrement. | NumberBox semantics, buttons | Present. | **IMPLEMENTED** | Distinct from range slider. |
| Numeric | ErpMoneyBox / old ErpMoney | Public basic control | History L9145–L21071; L42224–L42245 | Monetary numeric editing/display. | FieldBase, preferences | Present. | **PARTIALLY_IMPLEMENTED** | Current findings still require Product Owner review of formatting evidence. |
| Numeric | ErpRangeSlider | Public basic control | Current roadmap | Two-thumb interval selection. | Field/Input contracts | Present. | **PARTIALLY_IMPLEMENTED** | Current review findings cover geometry/tooltips. |
| Boolean / Choice | ErpCheckBox / old ErpCheckbox | Public basic control | History L214–L241; L42904–L42919 | Native-semantic Boolean/indeterminate selection. | InputBase, Icon | Present. | **DEFERRED** | Current visual redesign explicitly waits for PO reference/template. |
| Boolean / Choice | ErpRadioBox / old radio option | Public basic control | History L214–L241; L42904–L42919 | Native-semantic single option. | InputBase | Present. | **DEFERRED** | Current visual redesign not authorized. |
| Boolean / Choice | ErpRadioGroup | Public composite/control | History L9145–L21071 | One-of-many radio value owner. | RadioBox/InputBase | Present. | **IMPLEMENTED** | Current visual acceptance not implied. |
| Boolean / Choice | ErpSwitch | Historical basic control | History L214–L241; L9145–L21071 | Binary on/off setting. | Field/Input foundations | Absent. | **NEEDS_PRODUCT_OWNER_CONFIRMATION** | Historical presence does not authorize building it. |
| Selection | ErpSelect | Historical proposed universal public control | History L41658–L41766; L42529–L42570; L43216–L43276 | Typed local/remote searchable/filterable/sortable selection. | Field, anchored overlay, data adapters | No current `ErpSelect`. | **NOT_IMPLEMENTED** | Accepted historically, but current authority has not authorized a new family phase. |
| Selection | ErpMultiSelect | Historical old component | History L9145–L21071 | Multiple option selection. | Select engine | Absent. | **SUPERSEDED** | Historical plan favored one typed public Select API; current repo has other pickers. |
| Selection | ErpRemoteSelect | Historical old component | History L9145–L21071 | Remote paged/search selection. | Select/data adapter | Absent. | **SUPERSEDED** | Remote was intended as an internal mode, not separate public control. |
| Field Entry | ErpContactField | Historical component | History L9145–L21071 | Contact-value entry/composition. | Text/Tel/Email domain rules | Absent. | **HISTORICAL_ONLY** | Requirement scope unresolved. |

## Temporal, selection, file/image, overlay, and feedback families

| Family | Component / Capability | Type | Evidence / Source | Intended Purpose | Dependencies | Current Repository State | Decision Status | Notes |
|---|---|---|---|---|---|---|---|---|
| Date / Time | ErpDateBox / old ErpDateInput | Public composite | History L9145–L21071 | Canonical date value with blocking picker. | FieldTrigger, OverlayFrame, preferences | Present. | **PARTIALLY_IMPLEMENTED** | Current Inputs acceptance pending. |
| Date / Time | ErpDateTimeBox / old ErpDateTimeInput / ErpDateTime | Public composite | History L9145–L21071 | Canonical date-time with staged picker. | Temporal utilities, Overlay | Present. | **PARTIALLY_IMPLEMENTED** | Historical aliases normalized. |
| Date / Time | ErpTimeBox / old ErpTimeInput | Public composite | History L9145–L21071 | Canonical time with Now/staged picker. | Temporal utilities, Overlay | Present. | **PARTIALLY_IMPLEMENTED** | Current review findings apply. |
| Date / Time | ErpDateRangeBox / old ErpDateRange | Public composite | History L367–L399; L9145–L21071 | Chronological staged range with presets/preview. | Temporal picker, Overlay | Present. | **PARTIALLY_IMPLEMENTED** | Product Owner runtime/visual acceptance pending. |
| Selection | ErpColorPicker | Public composite | Historical component matrix; current roadmap | System/free color selection. | System-color registry, Overlay | Present. | **PARTIALLY_IMPLEMENTED** | Swatch borders and modes implemented; review pending. |
| Selection | ErpIconPicker | Public composite | Historical picker discussion; current roadmap | Semantic icon selection. | ErpIcon registry, Overlay, SelectionTile | Present. | **PARTIALLY_IMPLEMENTED** | Roving focus/current opening evidence under review. |
| Selection | ErpItemPicker / historical EntityPicker idea | Public composite | History L367–L399 | Generic staged item selection. | Selection family, Overlay | Present. | **PARTIALLY_IMPLEMENTED** | Text options use list rows. |
| Selection | ErpComboBox | Public composite | Historical Select discussion; current roadmap | Editable query plus staged item selection. | FieldBase, selection overlay | Present. | **PARTIALLY_IMPLEMENTED** | Pointer/ArrowDown/type-open implemented; review pending. |
| File / Image | ErpFilePicker / old ErpFileUpload | Public basic control | History L9145–L21071 | Multi-file local selection/policy boundary. | FileSelectionBase | Present. | **PARTIALLY_IMPLEMENTED** | No upload/backend authority; hover/focus evidence awaits review. |
| File / Image | ErpImagePicker / old ErpImageUpload | Public basic control | History L9145–L21071 | Multi-image local selection/preview. | FileSelectionBase | Present. | **PARTIALLY_IMPLEMENTED** | No HTTP upload/progress/retry. |
| Overlay | AnchoredOverlayController/geometry | Internal shared runtime | Historical tooltip/select architecture; current authority | Nonblocking anchored positioning/collision. | Viewport geometry | Present. | **IMPLEMENTED** | Used by Tooltip and dropdown SearchBox; not a public component. |
| Overlay | ErpTooltip / ErpTooltipContent | Public control + content marker | History L214–L241; L9145–L21071 | Plain/rich explanatory anchored surface. | AnchoredOverlay, motion, tokens | Present. | **PARTIALLY_IMPLEMENTED** | Current authority records continuing PO runtime review of motion/arrow. |
| Overlay | ErpOverlayManager + ErpOverlayHost | Shared blocking runtime | Old Modal/Drawer at History L9145–L21071 | Stack, backdrop, focus, inert, scroll lock, lifecycle. | Layers, motion, App host | Present with exactly one app host. | **IMPLEMENTED** | User-facing visual acceptance remains pending. |
| Overlay | ErpOverlayFrame | Internal system frame | Current authority | Mandatory configurable Header/Body/Footer for modal/drawer. | Overlay, Button, Icon, Text, Tooltip | Present. | **IMPLEMENTED** | Body is primary scroll region; footer actions are ordered/typed. |
| Overlay | Modal capability / old ErpModal | Blocking surface mode | History L214–L241; L9145–L21071 | Full-app blocking dialog. | OverlayManager/Host/Frame | Implemented as overlay kind, not separate public component. | **SUPERSEDED** | Old standalone component name replaced by shared system API. |
| Overlay | Drawer capability / old ErpDrawer | Blocking surface mode | History L214–L241; L9145–L21071 | Start/end/top/bottom blocking panel. | OverlayManager/Host/Frame | Implemented as overlay kind. | **SUPERSEDED** | Logical RTL and full viewport owned centrally. |
| Overlay / Feedback | ErpConfirmDialogService | Shared system service | Current authority/source | Consistent confirmation over blocking Overlay. | OverlayFrame/action channel | Present. | **PARTIALLY_IMPLEMENTED** | Latest source awaits canonical verification and PO review. |
| Feedback | ErpAlert | Historical public component | History L9145–L21071 | In-flow feedback alert. | Feedback tokens | Absent. | **NEEDS_PRODUCT_OWNER_CONFIRMATION** | Not equivalent to FieldFeedback. |
| Feedback | ErpAsyncContent | Historical composite | History L9145–L21071 | Loading/error/empty/content state owner. | Loading/Error/Empty | Absent. | **HISTORICAL_ONLY** | Pattern may return later only with authorization. |
| Feedback | ErpEmptyState | Historical component | History L878–L927; L9145–L21071 | Controlled empty-result/onboarding/error-like state. | Text/Icon/Button | Absent. | **NEEDS_PRODUCT_OWNER_CONFIRMATION** | Repeatedly discussed, but no current phase. |
| Feedback | ErpErrorState | Historical component | History L9145–L21071 | Error presentation/retry boundary. | Text/Icon/Button | Absent. | **HISTORICAL_ONLY** | Exact current requirement unresolved. |
| Feedback | ErpLoadingState | Historical component | History L9145–L21071 | Loading presentation. | Spinner/Skeleton | Absent. | **HISTORICAL_ONLY** | No current public component. |
| Feedback | ErpSkeleton | Historical primitive/control | History L214–L241; L9145–L21071 | Content-shaped loading evidence. | Motion/color | Absent. | **NEEDS_PRODUCT_OWNER_CONFIRMATION** | Was common-core suggestion and old component. |
| Status / Badges | ErpStatusBadge | Historical component | History L214–L241; L9145–L21071 | Compact semantic status label. | Text, feedback colors | Absent. | **NEEDS_PRODUCT_OWNER_CONFIRMATION** | Strong ERP utility, but not current authorization. |
| Feedback | ErpToastHost | Historical system component | History L9145–L21071 | Transient notifications. | Overlay/layers/motion | Absent. | **NEEDS_PRODUCT_OWNER_CONFIRMATION** | Must not be inferred from old presence alone. |
| Feedback | ErpOfflineBanner | Historical application feedback | History L9145–L21071 | Global offline state. | App shell/network state | Absent. | **HISTORICAL_ONLY** | Main-app concern, not Lab foundation. |
| Feedback | ErpOfflineWorkspaceBanner | Historical feature feedback | History L9145–L21071 | Workspace-scoped offline state. | Shell/workspace | Absent. | **HISTORICAL_ONLY** | Potential overlap requires confirmation. |
| System Pages | ErpBackendUnavailablePage | Historical system page | History L9145–L21071 | Backend outage state. | System page shell | Absent. | **HISTORICAL_ONLY** | Feature/application layer. |
| System Pages | ErpForbiddenState | Historical state component | History L9145–L21071 | Permission-denied state. | Permission context | Absent. | **HISTORICAL_ONLY** | Main-app concern. |
| System Pages | ErpInitializationRequiredPage | Historical system page | History L9145–L21071 | Initialization prerequisite failure. | Startup/shell | Absent. | **HISTORICAL_ONLY** | Main-app concern. |
| Feedback / Overlay | ErpConcurrencyConflictDialog | Historical dialog | History L7527–L8367; L9145–L21071 | Resolve optimistic-concurrency conflicts. | Overlay, domain data | Absent. | **HISTORICAL_ONLY** | Requires production-domain contract. |
| Feedback / Overlay | ErpSessionExpiryDialog | Historical dialog | History L9145–L21071 | Expired-session action. | Auth/session, Overlay | Absent. | **HISTORICAL_ONLY** | Main-app concern. |

## Navigation, shell, data display, tables, forms, patterns, and ERP-specific capabilities

| Family | Component / Capability | Type | Evidence / Source | Intended Purpose | Dependencies | Current Repository State | Decision Status | Notes |
|---|---|---|---|---|---|---|---|---|
| Application Shell | ErpAppShell | Historical shell | History L810–L875; L9145–L21071 | Authenticated application frame. | Navigation, overlay host, preferences | No production ERP shell; Lab `App` exists. | **HISTORICAL_ONLY** | Design Lab shell is review tooling, not ERP AppShell. |
| Application Shell | HonestyAuthShell | Historical shell | History L9145–L21071 | Authentication-page frame. | Theme/branding | Absent. | **HISTORICAL_ONLY** | Main-app concern. |
| Application Shell | HonestySystemPageShell | Historical shell | History L9145–L21071 | Shared system/error page frame. | Foundation/branding | Absent. | **HISTORICAL_ONLY** | Main-app concern. |
| Navigation | ErpSidebar | Historical shell component | History L810–L875; L41658–L41766 | Hierarchical ERP navigation. | Navigation model, preferences, permissions | Absent. | **NEEDS_PRODUCT_OWNER_CONFIRMATION** | Visual reference and current shell phase are required. |
| Navigation | ErpSidebarItem | Historical internal/public component | History L9145–L21071 | One navigation node. | Sidebar | Absent. | **HISTORICAL_ONLY** | Likely internal if rebuilt. |
| Navigation | ErpSidebarSection | Historical internal/public component | History L9145–L21071 | Group navigation nodes. | Sidebar | Absent. | **HISTORICAL_ONLY** | Likely internal if rebuilt. |
| Navigation | ErpTopbar | Historical shell component | History L9145–L21071; L43106–L43127 | Global shell actions/context. | AppShell, user/branch/notifications | Lab utility bar exists, but no production Topbar. | **NEEDS_PRODUCT_OWNER_CONFIRMATION** | Historical tone preferences are superseded by current App theme law. |
| Navigation | ErpNavigationTree | Historical control | History L810–L875; L9145–L21071 | Recursive permission-aware nav hierarchy. | Navigation config | Absent. | **HISTORICAL_ONLY** | Historical max-three-level guidance, not a current build order. |
| Navigation | ErpBreadcrumbs | Historical component | History L41658–L41766; L9145–L21071 | Hierarchical location trail. | Router/page metadata | Absent. | **NEEDS_PRODUCT_OWNER_CONFIRMATION** | Historically kept separate from PageHeader. |
| Layout / Shell | ErpPageContainer | Historical pattern component | History L624–L714; L9145–L21071 | Page width/padding boundary. | Container/spacing | Absent; `ErpContainer` primitive exists. | **SUPERSEDED** | A future page pattern may still compose Container. |
| Application Shell | ErpPageShell | Historical pattern | History L624–L714; L9145–L21071 | Page chrome and regions. | AppShell/PageHeader/Footer | Absent. | **NEEDS_PRODUCT_OWNER_CONFIRMATION** | Pattern layer not opened. |
| Application Shell | ErpPageHeader | Historical pattern | History L718–L806; L41658–L41766 | Title/context/actions hierarchy. | Text, Buttons, Breadcrumbs | Absent. | **NEEDS_PRODUCT_OWNER_CONFIRMATION** | Repeated durable need, but not current authorization. |
| Application Shell | ErpPageFooter | Historical pattern | History L9145–L21071 | Page-level persistent/footer actions. | Buttons/layout | Absent. | **HISTORICAL_ONLY** | Not the Overlay footer. |
| Layout / Disclosure | ErpSectionCard | Historical component/pattern | History L9145–L21071 | Section grouping surface. | Surface/Section | Absent. | **NEEDS_PRODUCT_OWNER_CONFIRMATION** | Must avoid reintroducing overboxing. |
| Tabs | ErpTabs | Historical control | History L214–L241; L9145–L21071 | Tabbed content/navigation. | Keyboard/focus/Text | Absent. | **NEEDS_PRODUCT_OWNER_CONFIRMATION** | Requires reference-first review. |
| Utilities | ErpThemeToggle | Historical utility | History L9145–L21071 | Theme action. | Theme authority | No public component; App owns one theme action. | **SUPERSEDED** | Current App-only authority forbids lower competing theme state. |
| Application Shell | ErpBranchSelector | Historical shell control | History L367–L399; L7527–L8367; L9145–L21071 | Active company/branch context selection. | Session/application adapter | Absent. | **HISTORICAL_ONLY** | Backend/application integration required. |
| Search | ErpGlobalSearch | Historical shell composite | History L367–L399; L9145–L21071 | Application-wide entity/action search. | SearchBox/data/navigation | Absent. | **NEEDS_PRODUCT_OWNER_CONFIRMATION** | Current SearchBox is a control, not global search. |
| Application Shell | ErpNotificationBell | Historical shell composite | History L367–L399; L9145–L21071 | Notification entry point. | IconButton/Tooltip/notification data | Absent. | **HISTORICAL_ONLY** | Main-app integration. |
| Application Shell | ErpUserMenu | Historical shell composite | History L367–L399; L9145–L21071 | User account actions. | Menu/auth context | Absent. | **HISTORICAL_ONLY** | Main-app integration. |
| Application Shell | ErpStartupGate | Historical infrastructure component | History L7527–L8367; L9145–L21071 | Hold app until required initialization. | Session/branch/config | Absent. | **HISTORICAL_ONLY** | Preserve in production main app, not Design Lab. |
| Application Shell | ErpBranchScopeGate | Historical infrastructure component | History L7527–L8367; L9145–L21071 | Enforce selected branch context. | Branch/session | Absent. | **HISTORICAL_ONLY** | Domain/application layer. |
| Utilities | ErpPermissionGate | Historical directive/component | History L7527–L8367; L9145–L21071 | Presentation-time permission visibility. | Permission service | Absent. | **HISTORICAL_ONLY** | Audit said permission split was worth preserving. |
| Data Display | ErpAvatar | Historical component | History L214–L241; L9145–L21071 | Person/entity identity image/initials. | Image/Icon/Text | Absent. | **NEEDS_PRODUCT_OWNER_CONFIRMATION** | AvatarPicker was explicitly viewed as composition, not primitive necessity. |
| Data Display | ErpCardList | Historical component | History L9145–L21071 | Responsive list/card presentation. | Surface/Grid | Absent. | **HISTORICAL_ONLY** | Page/pattern concern. |
| Charts / Visualization | ErpChartCard | Historical component | History L9145–L21071 | Chart plus title/summary/action surface. | Chart engine, Surface | Absent; only docs review chart exists. | **NEEDS_PRODUCT_OWNER_CONFIRMATION** | No production chart engine authorized. |
| Data Display | ErpKpiCard | Historical component | History L9145–L21071 | Compact KPI/value/trend. | Text/Icon/feedback colors | Absent. | **NEEDS_PRODUCT_OWNER_CONFIRMATION** | Dashboard pattern phase required. |
| Data Display | ErpDataPage | Historical orchestration component | History L422–L620; L9145–L21071 | Query/list state owner around data display. | Data source/table/filter/pagination | Absent. | **HISTORICAL_ONLY** | Historical engine may belong in main app, not Lab. |
| Tables / Grids | ErpSmartTable | Historical composite | History L26–L30; L422–L620; L7527–L8367 | Server-aware sorting/filtering/paging/selection table composition. | Table primitive, data source, toolbar, pagination | Absent. | **NEEDS_PRODUCT_OWNER_CONFIRMATION** | Strong intended capability; not authorized now. |
| Tables / Grids | ErpTable primitive | Historically accepted future primitive | History L41775–L42189 | Semantic table rendering beneath SmartTable behavior. | Foundation/Text/Layout | Absent. | **NOT_IMPLEMENTED** | Historical decision B at Q54; needs new reference/phase. |
| Tables / Grids | ErpSortHeader | Historical table internal/control | History L9145–L21071 | Accessible sort trigger/state. | Table primitive/Button/Icon | Absent. | **HISTORICAL_ONLY** | Dependency of future table family. |
| Tables / Grids | ErpTableToolbar | Historical composite | History L9145–L21071 | Search/filter/actions/column controls. | Buttons/filters/columns | Absent. | **HISTORICAL_ONLY** | Page/table composition. |
| Tables / Grids | ErpColumnChooser | Historical composite | History L367–L399; L9145–L21071 | Column visibility/order. | Table schema/selection UI | Absent. | **HISTORICAL_ONLY** | Old system capability. |
| Pagination | ErpPagination | Historical basic/composite control | History L9145–L21071 | Paged navigation and page size. | Button/Select/Text | Absent. | **NEEDS_PRODUCT_OWNER_CONFIRMATION** | Required for many data patterns, but no current phase. |
| Data Display | ErpViewSwitcher | Historical control | History L9145–L21071 | Switch table/card/other views. | Buttons/Tabs | Absent. | **HISTORICAL_ONLY** | Optional pattern, not proven universal. |
| Filtering | ErpFilterBar | Historical composite | History L367–L399; L9145–L21071 | Persistent active filters and quick filtering. | Field controls/buttons | Absent. | **NEEDS_PRODUCT_OWNER_CONFIRMATION** | Repeated ERP need. |
| Filtering | ErpFilterDrawer | Historical composite | History L367–L399; L9145–L21071 | Advanced filters in drawer. | OverlayFrame/fields | Absent. | **NEEDS_PRODUCT_OWNER_CONFIRMATION** | Blocking/nonblocking semantics need explicit decision. |
| Forms | ErpStandardEntityForm | Historical pattern | History L978–L1118; L9145–L21071 | Schema-assisted CRUD form with escape hatches. | Form engine, fields, validation | Absent. | **DEFERRED** | Form generation should follow stable controls, not precede them. |
| Forms | ErpFormSection | Historical form component | History L9145–L21071 | Group related fields. | Section/Surface/Text | Absent. | **NEEDS_PRODUCT_OWNER_CONFIRMATION** | Flat-vs-surface visual rule needs reference. |
| Forms | ErpFormStepper | Historical composite | History L1122–L1172; L9145–L21071 | Multi-step form navigation/state. | Forms, validation, buttons | Absent. | **DEFERRED** | Requires form foundation and visual review. |
| Forms | ErpRepeater | Historical composite | History L9145–L21071 | Add/remove/reorder repeated form rows. | Fields/buttons/validation | Absent. | **DEFERRED** | Complex form capability. |
| Forms | ErpRepeaterItemTemplate | Historical template directive | History L9145–L21071 | Consumer template for repeated item. | Repeater | Absent. | **HISTORICAL_ONLY** | API design must be revisited if Repeater returns. |
| Forms | ErpEntitySchemaFields | Historical form engine component | History L978–L1118; L9145–L21071 | Render registered schema fields. | Form registry/fields | Absent. | **HISTORICAL_ONLY** | Historical engine evidence, not Lab authorization. |
| Forms | ErpEntityCustomFieldOutlet | Historical outlet | History L9145–L21071 | Escape hatch for specialized fields. | Form engine | Absent. | **HISTORICAL_ONLY** | Preserve concept only if form engine is resumed. |
| Forms | ErpEntityCustomSectionOutlet | Historical outlet | History L9145–L21071 | Escape hatch for specialized sections. | Form engine | Absent. | **HISTORICAL_ONLY** | Same caveat. |
| Forms | ErpEntityReview | Historical component | History L1122–L1172; L9145–L21071 | Review staged form values before submission. | Form schema/Text | Absent. | **HISTORICAL_ONLY** | Wizard/form pattern. |
| Forms | ErpEntityReviewTemplate | Historical template directive | History L9145–L21071 | Custom review rendering. | EntityReview | Absent. | **HISTORICAL_ONLY** | Not current API. |
| Filtering / Reports | ErpReportFilterPanel | Historical composite | History L9145–L21071 | Structured report parameters. | Fields/date/select | Absent. | **HISTORICAL_ONLY** | Report pattern not opened. |
| Utilities | ErpPrintExportActions | Historical composite | History L367–L399; L9145–L21071 | Consistent print/export action menu. | Buttons/menu/format preferences | Absent. | **NEEDS_PRODUCT_OWNER_CONFIRMATION** | Formatting preferences support it, but no current component. |
| ERP-specific | ErpAttachmentList | Historical business composite | History L2130–L2131; L9145–L21071 | List/manage entity attachments. | FilePicker/table/actions | Absent. | **HISTORICAL_ONLY** | Requires backend/domain policies. |
| ERP-specific | ErpAuditTimeline | Historical business composite | History L2130–L2131; L9145–L21071 | Audit event chronology. | Data display/status/user | Absent. | **HISTORICAL_ONLY** | Main-app/domain capability. |
| ERP-specific | ErpCommercialLinesEditor | Historical business composite | History L2130–L2131; L9145–L21071 | Shared transaction line editing. | Table/fields/money | Absent. | **HISTORICAL_ONLY** | Broad name; purchase/sale variants also existed. |
| ERP-specific | ErpJournalLinesEditor | Historical business composite | History L2130–L2131; L9145–L21071 | Balanced journal line editing. | Table/money/account selectors | Absent. | **HISTORICAL_ONLY** | Domain rules required. |
| ERP-specific | ErpPartyAddressEditor | Historical business composite | History L2130–L2131; L9145–L21071 | Structured party address editing. | Form fields | Absent. | **HISTORICAL_ONLY** | Feature/domain layer. |
| ERP-specific | ErpPartyContactCards | Historical business display | History L9145–L21071 | Display party contacts as cards. | Contact editor/CardList | Absent. | **HISTORICAL_ONLY** | Old-repo visual choice not current requirement. |
| ERP-specific | ErpPartyContactEditor | Historical business composite | History L2130–L2131; L9145–L21071 | Party contact entry. | Contact fields/repeater | Absent. | **HISTORICAL_ONLY** | Domain layer. |
| ERP-specific | ErpPaymentAllocationEditor | Historical business composite | History L2130–L2131; L9145–L21071 | Allocate payments to documents. | Table/Money/selection | Absent. | **HISTORICAL_ONLY** | Domain rules required. |
| ERP-specific | ErpPurchaseLinesEditor | Historical business composite | History L9145–L21071 | Purchase document lines. | Commercial lines/table | Absent. | **HISTORICAL_ONLY** | Main-app feature. |
| ERP-specific | ErpSaleLinesEditor | Historical business composite | History L9145–L21071 | Sales document lines. | Commercial lines/table | Absent. | **HISTORICAL_ONLY** | Main-app feature. |
| ERP-specific | ErpStockAdjustmentEditor | Historical business composite | History L2130–L2131; L9145–L21071 | Inventory adjustment entry. | Table/item picker/number | Absent. | **HISTORICAL_ONLY** | Main-app feature. |
| ERP-specific | ErpStockTransferWorkflow | Historical workflow composite | History L9145–L21071 | Stock transfer stages/actions. | Workflow, lines, permissions | Absent. | **HISTORICAL_ONLY** | Domain layer. |
| ERP-specific | ErpEntityDetail | Historical page pattern | History L422–L477; L9145–L21071 | Reusable entity detail composition. | PageHeader/sections/actions | Absent. | **DEFERRED** | Patterns follow approved controls. |
| ERP-specific | ErpEntityDirectory | Historical page pattern | History L422–L620; L9145–L21071 | Search/filter/list entities. | DataPage/SmartTable/filters | Absent. | **DEFERRED** | Strong pattern, but not current Design Lab phase. |
| ERP-specific | ErpDirectoryCardTemplate | Historical template directive | History L2130–L2131; L9145–L21071 | Customize directory card output. | EntityDirectory | Absent. | **HISTORICAL_ONLY** | API must be reconsidered with pattern. |
| ERP-specific | ErpDirectoryCellTemplate | Historical template directive | History L2130–L2131; L9145–L21071 | Customize directory table cell. | EntityDirectory/SmartTable | Absent. | **HISTORICAL_ONLY** | Same caveat. |
| ERP-specific | ErpDirectoryFiltersTemplate | Historical template directive | History L2130–L2131; L9145–L21071 | Customize directory filters. | EntityDirectory | Absent. | **HISTORICAL_ONLY** | Same caveat. |
| ERP-specific | ErpMaintenanceWorkflowPanel | Historical business composite | History L9145–L21071 | Maintenance state/actions. | Workflow/permissions | Absent. | **HISTORICAL_ONLY** | Domain-specific. |
| ERP-specific | ErpWorkflowPanel | Historical business composite | History L2130–L2131; L9145–L21071 | Generic workflow state/actions. | Permissions/status/buttons | Absent. | **HISTORICAL_ONLY** | A generic current contract is not established. |
| ERP-specific | ErpLifecycleActions | Historical action composite | History L7527–L8367; L9145–L21071 | Entity lifecycle transitions. | Action policy/permissions | Absent. | **HISTORICAL_ONLY** | Main-app capability worth preserving conceptually. |
| ERP-specific | ErpBulkActionBar | Historical composite | History L367–L399; L9145–L21071 | Actions on selected records. | SmartTable/buttons/permissions | Absent. | **NEEDS_PRODUCT_OWNER_CONFIRMATION** | Expected in data patterns, but not authorized. |
| ERP-specific | ErpEntityActions | Historical composite | History L9145–L21071 | Contextual entity actions. | Action policy/buttons | Absent. | **HISTORICAL_ONLY** | Old main-app capability. |
| Utilities | ErpFinancialDataGuard | Historical guard/component | History L7527–L8367; L9145–L21071 | Gate financially sensitive content. | Permissions/domain policy | Absent. | **HISTORICAL_ONLY** | Not a Design Lab component family. |
| Utilities | ErpUnsavedChangesGuard | Historical route guard | History L9145–L21071 | Prevent accidental navigation from dirty forms. | Router/forms/confirm | Absent. | **NEEDS_PRODUCT_OWNER_CONFIRMATION** | Could consume Confirm service later; not authorized now. |
| Utilities | ErpSyncCenter | Historical application composite | History L7527–L8367; L9145–L21071 | Synchronization status/actions. | Backend/offline/session | Absent. | **HISTORICAL_ONLY** | Main-app integration. |
| Utilities | ErpPermissionTree | Historical composite | History L2130–L2131; L9145–L21071 | Hierarchical permission selection. | Tree/checkbox/permissions | Absent. | **HISTORICAL_ONLY** | A general Tree primitive is also absent. |

## Historically proposed but not accepted as current requirements

These names appeared as assistant proposals/examples rather than audited components or accepted current decisions: `ErpAvatarPicker`, chips, generic dropdown/menu variants, a notifications menu, stat cards, a column selector, generic date-range/entity picker naming, page archetype component names, and additional convenience wrappers (**History L214–L241, L367–L399, L624–L714, L31666–L31687**). Their status is **NEEDS_PRODUCT_OWNER_CONFIRMATION** or **REJECTED** where the archive explicitly rejected a mirror/God-component approach. They are intentionally not counted as authorized backlog items.

# 7. Component Families and Dependency Graph

The historical and current architecture agree on bottom-up dependency control, but the implementation is a branching directed acyclic graph rather than one linear chain. The shared token spine is:

```text
Reference primitives
  → Semantic runtime contracts
    → Theme / Density / Query resolution
      → Component Tokens

Component Tokens and the shared Foundation contracts then enable these branches:

├─→ Structural / Text / Icon primitives
│     └─→ Button / Action basics
│
├─→ InputBase / CVA
│     └─→ Field Foundation
│           └─→ concrete Field controls
│
├─→ Anchored Overlay foundation
│     └─→ Tooltip and nonblocking anchored consumers
│
└─→ Blocking Overlay foundation
      └─→ OverlayFrame
            └─→ blocking overlay-backed composites
                 (Temporal / Selection / Confirm)

Approved lower-level controls and composites
  → reusable Patterns
    → Shell / Data / Forms composition
      → ERP Feature composition and migration
```

The branches have explicit cross-dependencies: Button/Action basics consume Text/Icon primitives; Field Foundation consumes InputBase plus its visual primitive/token dependencies; OverlayFrame consumes approved Text/Icon/Button/Tooltip capabilities; and blocking Temporal/Selection composites require both concrete Field controls and OverlayFrame. The historical four-layer model and its later implementation sequence support this ordering (**History L99–L115, L8216–L8255, L8315–L8330**). Current `AGENTS.md` makes the lower-layer order normative and adds the Component Token and resolution layers.

## Family prerequisites

| Family | Must exist first | Why |
|---|---|---|
| Component Tokens | Reference, Semantic, theme/density/query contracts | A component contract cannot safely invent shared meaning or raw breakpoints. |
| Structural primitives | Spacing/layout semantic roles, Query API, Component Tokens | Layout must be reusable without page CSS or DOM-mirror components. |
| ErpText | Typography semantic roles and text Component Tokens | Every production text node is governed through one owner. |
| ErpIcon | Semantic registry, tokenized size/tone, vendor isolation | Consumers must never depend on a glyph pack or raw SVG. |
| Button family | Text, Icon, focus/motion/state tokens | Button variants must share behavior without one God component. |
| Field Foundation | InputBase/CVA, Text/Icon primitives, field Component Tokens, validation contracts | The shared field shell must exist before concrete Field controls. |
| Concrete Field controls | FieldFrame/Trigger/Feedback plus approved Button/Icon actions where needed | Concrete inputs require common focus, label, disabled, error, and interaction ownership. |
| Anchored Overlay consumers | Anchored Overlay controller/geometry, motion, layers, relevant primitives | Tooltip and nonblocking dropdown consumers must not recreate positioning/lifecycle behavior. |
| Blocking Overlay foundation | Motion, layers, application host ownership, relevant primitives | Backdrop, stack, focus, inertness, scroll lock, and lifecycle must be centralized before blocking consumers. |
| OverlayFrame | Blocking Overlay foundation, Text, Icon, Button, Tooltip | User-facing blocking surfaces share one Header/Body/Footer contract. |
| Temporal/selection/confirm composites | Concrete Fields where applicable, Buttons, Icon, OverlayFrame, Preferences | They stage values, localize display, and commit only through explicit actions. |
| Table/data patterns | Text, Icon, Buttons, fields, selection, pagination, data source contract | SmartTable cannot safely precede its primitive/interaction dependencies. |
| Forms/wizards | Stable fields, validation, actions, layout, overlays | A schema engine built earlier would freeze unstable control APIs. |
| Shell/navigation | Approved primitives/controls, permissions, session/context adapters | The shell should compose the system, not create private UI rules. |
| ERP-specific editors | Stable table/form/selection patterns plus domain contracts | Business composites must not become substitutes for missing lower layers. |

## Cycles and architectural risks

1. **Showcase dependency cycle.** If the Lab chrome depends on the component currently under review, changing that component can break or bias the review tool. This risk was explicitly identified in the Showcase Chrome discussion (**History L42315–L42349**). Current review internals mitigate it without creating public families.
2. **SmartTable/data cycle.** A table that owns HTTP/business rules becomes both data source and renderer. Historical analysis explicitly separated page/data ownership from SmartTable presentation and intents (**History L480–L620**).
3. **Form-engine/control cycle.** Generating fields before concrete field APIs are approved causes the schema engine to dictate component design. Historical guidance limited generation to repetitive CRUD and required escape hatches (**History L978–L1118**).
4. **Theme authority cycle.** Per-page or per-overlay theme state can fight App-level state. Current authority resolves this with one App binding; historical Theme Preference mechanisms are not allowed to return.
5. **Overlay duplication.** Picker-specific backdrops/focus/scroll stacks would fragment lifecycle behavior. Current selection/temporal composites therefore depend on the shared blocking Overlay system.
6. **Design Lab as second product system.** The archive explicitly warned against inventing `CoolButton`/`FancySelect` APIs in the Lab (**History L44214–L44243**). Current names and contracts must remain transferable to production architecture.

# 8. Implemented Versus Intended Gap Analysis

## Implemented and aligned

- Foundation token layers, Light/Dark semantic mappings, density/query contracts, component-token framework, and Foundation review routes are present.
- The structural primitives `ErpContainer`, `ErpStack`, `ErpInline`, `ErpGrid`, `ErpSurface`, `ErpSection`, and `ErpDivider` are present.
- `ErpText` is the sole typography primitive; `ErpIcon` is the semantic icon facade.
- Button/action controls, shared ripple/state infrastructure, and composites (`ErpButtonGroup`, `ErpSplitButton`, `ErpFabMenu`) are present.
- InputBase, FieldBase, FieldFrame, FieldTrigger, FieldFeedback, unified validation, concrete entry/numeric/choice/file/temporal/selection controls, and current CVA behavior are present.
- Anchored Overlay, blocking Overlay manager/host/ref/frame, Tooltip, and Confirm service are present.
- App-only theme authority, ERP-only routed-page authoring, component-token, text, icon, button, field, overlay, confirm, and zero-warning gates are present in `package.json` and `tools/**`.

These facts are **IMPLEMENTED** source state, not visual acceptance.

## Implemented but requiring Product Owner review

- Tooltip motion/arrow behavior remains under Product Owner runtime/Light/Dark review in current authority.
- Inputs as a family—including SearchBox three-mode behavior, Money formatting evidence, temporal presets, RangeSlider, pickers, and file/image feedback—remain blocked pending technical gate completion and Product Owner runtime/visual acceptance.
- Overlay/Confirm defaults, Header outline/contrast, Frame action surface, and visual presentation have current source but the latest authority still requires a fresh full verification and Product Owner re-review.
- CheckBox and RadioBox exist technically but their visual design is explicitly not final.

These are **PARTIALLY_IMPLEMENTED** in product terms even where their source is complete.

## Partially implemented

- Preferences implements local formatting/display policy, but historical backend persistence and some broad UI-setting ambitions are not Design Lab responsibilities.
- Charts has Foundation palette/evidence but no production chart family.
- Search exists as `ErpSearchBox`, but shell-level GlobalSearch is absent.
- The action-menu capability exists internally; its historical public form is not established.
- The Overlay system supplies modal/drawer capability, but legacy standalone `ErpModal`/`ErpDrawer` names are intentionally replaced rather than missing.

## Historical requirement not yet implemented

The strongest evidence-backed absences are the table/data family (`ErpTable`, SmartTable, SortHeader, TableToolbar, ColumnChooser, Pagination), broad feedback components (EmptyState, Alert, StatusBadge, Toast), navigation/shell components, and pattern families (PageHeader, forms, directories). Their historical importance is clear, but current authority does not authorize them now.

## Explicitly deferred

- CheckBox/RadioBox visual redesign until the Product Owner supplies references/templates.
- Form engine, wizards, reusable page patterns, Entity Directory/Detail, and feature migration until lower controls are approved.
- Broad later showcase/page work and any new public family until current runtime/visual gates are complete.

## Superseded or rejected

- Native visible controls in Feature/Page templates.
- God Button or one untyped “everything configurable” component.
- Separate ErpHeading and ErpLink.
- Standalone modal/drawer component ownership in place of the shared Overlay system.
- Multiple page/component theme authorities and Theme in Preferences.
- Route/screenshot counts as proof of isolation or visual approval.
- Blind preservation of legacy APIs/tests when a contract is intentionally replaced.

## Unclear or unresolved

- Whether the historically accepted universal `ErpSelect` remains the desired public selection API after current ItemPicker/ComboBox/SearchBox work.
- Which old main-application components should be ported, redesigned, internalized, or retired after the current page-by-page review.
- The exact future shell/navigation visual contract and whether historical tone preferences remain relevant under App-only theme authority.
- The production table/chart/tree/progress/disclosure component vocabulary; the archive demonstrates need, not final API.

# 9. Missing Component / Capability Backlog

This backlog is analytical only. It does not authorize implementation.

| Candidate backlog item | Evidence | Prerequisites | Requirement strength | Repository presence | Decision status | PO confirmation before implementation? |
|---|---|---|---|---|---|---|
| Complete current Overlay/Confirm verification and visual acceptance | Current authority; latest README/Handoff entries | Existing source only | Definite current gate | Present; technical rerun/review pending. | **PARTIALLY_IMPLEMENTED** | Yes, visual acceptance follows technical gate. |
| Complete Inputs runtime/Light/Dark acceptance | `INPUTS_PRODUCT_OWNER_REVIEW_FINDINGS_V1.md`; current authority | Existing source and `verify:clean` | Definite pending review state, not the automatic next action | Present; runtime/visual review pending. | **PARTIALLY_IMPLEMENTED** | Yes, when then-current authority schedules it. |
| CheckBox/RadioBox redesign | Current review state | Dedicated PO references/templates | Definite but explicitly postponed | Present; current visual implementation is not final. | **DEFERRED** | Yes; references are mandatory. |
| ErpTable primitive + SmartTable composition | History L422–L620, L41775–L42189; old audited system | Approved primitives, controls, data-source API, reference | Strong historical need | Absent from the Design Lab. | **NOT_IMPLEMENTED** | Yes. |
| Pagination, SortHeader, TableToolbar, ColumnChooser | History L367–L399, L9145–L21071 | Table family | Mixed dependent evidence | Absent from the Design Lab. | **MIXED — NEEDS_PRODUCT_OWNER_CONFIRMATION / HISTORICAL_ONLY** | Yes; exact public vocabulary first. |
| Universal Select decision | History L42529–L42570, L43216–L43276 | Reconcile current ItemPicker/ComboBox/SearchBox architecture | Historically accepted, currently ambiguous | `ErpSelect` is absent; related current pickers are present. | **MIXED — NOT_IMPLEMENTED / UNRESOLVED** | Yes. |
| EmptyState / Error / Loading / Skeleton / Alert / StatusBadge | History L878–L927, L9145–L21071 | Text/Icon/Button/feedback references | Mixed repeated and historical evidence | These named public components are absent. | **MIXED — NEEDS_PRODUCT_OWNER_CONFIRMATION / HISTORICAL_ONLY** | Yes; no grouped implementation is implied. |
| Toast/notification feedback | History L214–L241, L9145–L21071 | Overlay/layers/motion, notification policy | Mixed candidate and historical shell evidence | ToastHost and NotificationBell are absent. | **MIXED — NEEDS_PRODUCT_OWNER_CONFIRMATION / HISTORICAL_ONLY** | Yes; decide each capability separately. |
| Tabs, disclosure, menu, tree primitives/composites | History L214–L241, L810–L875, L9145–L21071 | Core controls and references | Mixed; some only historical or assistant-proposed | Tabs/tree are absent; action-menu capability exists internally; disclosure vocabulary is unapproved. | **MIXED — NEEDS_PRODUCT_OWNER_CONFIRMATION / HISTORICAL_ONLY / PARTIALLY_IMPLEMENTED** | Yes; exact vocabulary first. |
| PageHeader, Breadcrumbs, PageShell patterns | History L624–L806, L41658–L41766 | Approved core controls/layout | Strong historical pattern evidence | Absent from the Design Lab. | **NEEDS_PRODUCT_OWNER_CONFIRMATION** | Yes. |
| FilterBar / FilterDrawer / BulkActionBar | History L367–L399, L9145–L21071 | Table/data patterns, fields, overlay | Strong ERP-pattern evidence | Absent from the Design Lab. | **NEEDS_PRODUCT_OWNER_CONFIRMATION** | Yes. |
| Form sections, actions, summary, repeater, stepper | History L978–L1172, L9145–L21071 | Approved field family and validation | Mixed confirmed/deferred historical roles | Absent from the Design Lab. | **MIXED — NEEDS_PRODUCT_OWNER_CONFIRMATION / DEFERRED** | Yes; decide each capability separately. |
| Schema-driven StandardEntityForm | History L978–L1118 | Stable concrete forms/patterns | Historically bounded to CRUD | Absent from the Design Lab. | **DEFERRED** | Yes. |
| AppShell/navigation/global search/user/branch/notifications | History L810–L875, L9145–L21071 | Approved shell reference, patterns, app adapters | Mixed production need and historical application integration | Production family is absent; the Lab App is not its substitute. | **MIXED — NEEDS_PRODUCT_OWNER_CONFIRMATION / HISTORICAL_ONLY** | Yes; exact shell vocabulary first. |
| Charts/KPI production family | History L9145–L21071; current Foundation chart page | Approved visualization contracts/data engine | Mixed Foundation evidence and historical product components | Foundation chart evidence is present; production ChartCard/KPI are absent. | **MIXED — PARTIALLY_IMPLEMENTED / NEEDS_PRODUCT_OWNER_CONFIRMATION** | Yes. |
| Entity Directory/Detail and page archetypes | History L422–L714, L9145–L21071 | Table, forms, filters, page patterns | Strong long-term vision | Absent from the Design Lab. | **DEFERRED** | Yes. |
| ERP business editors/workflows | History L2130–L2131, L9145–L21071 | All relevant controls/patterns plus domain requirements | Historical main-app capability | Absent from the Design Lab; may still exist in the historical/main app. | **HISTORICAL_ONLY** | Yes, individually, if reconsidered. |
| Feature/page migration | History L1711–L1888, L27599–L28123 | Approved visual system and real-feature validation plan | Long-term objective | No production feature migration exists in this Lab. | **DEFERRED** | Yes. |

No evidence currently authorizes a Progress family, general-purpose Accordion/Disclosure family, production Chart library, or new Shell implementation. Their absence may be notable for a mature ERP system, but it is not proof that a particular API must be built.

# 10. Architecture Requirements

| Area | Reconciled durable rule | Evidence/status |
|---|---|---|
| Token flow | Reference → Semantic → Theme/Density/Query resolution → Component Tokens → component. Direct Reference colors/breakpoints and cross-component token consumption are forbidden. | History L123–L210, L40276–L40370; **CURRENT** governance. |
| Component ownership | Shared UI owns visual/interaction behavior; pages own data fetching, orchestration, and business rules. | History L480–L620, L1392–L1668; **CURRENT**. |
| Native semantics | Routed pages author ERP components only. Native controls/HTML semantics live inside approved ERP primitives/controls or review-only internals. | History L37949–L40548; current route-page governance; **CURRENT/IMPLEMENTED**. |
| ERP authoring | Feature/page code should compose controlled primitives, basic controls, composites, and patterns rather than raw markup or feature-specific styling. | History L99–L115, L1392–L1668; **CURRENT**. |
| Theme authority | The App root owns the single active Light/Dark state. Descendants inherit and do not persist or pass competing theme state. | Current authority/source; historical Theme Preference proposals are **SUPERSEDED**. |
| Responsive behavior | Desktop-first, but readable at tablet/narrow widths. Use Foundation Query API, not raw breakpoints. | History L878–L927; **CURRENT**. |
| Overlays | Blocking modal/drawer lifecycle, backdrop, focus, inertness, scroll lock, stacking, motion, and frame belong to one shared system. Tooltip and SearchBox dropdown remain nonblocking anchored systems. | Current source/authority; **IMPLEMENTED**. |
| Motion | One semantic `ErpMotionPreset` vocabulary; Animate.css is internal; lifecycle completion, direction, cleanup, cancellation, and reduced motion are centrally adapted. | Current source/authority; **IMPLEMENTED**. |
| Icon ownership | `ErpIcon` is the sole production icon gateway; vendor names/packs do not cross the registry. | Old audit strength at History L7527–L8367; **CURRENT/IMPLEMENTED**. |
| Typography ownership | `ErpText` owns production text; raw text and separate Heading/Link primitives are not allowed. | Current governance; historical three-primitive proposal **SUPERSEDED**. |
| State handling | Loading, disabled, invalid, focus, staged selection, and commit/cancel behavior must be deterministic and centrally owned. | History L1321–L1388, L1668–L1707; current controls; **CURRENT**. |
| Testing | Old tests do not dictate intentionally replaced contracts, but every new contract needs real behavior tests and governance. Current review/tooling checkpoints require zero-warning full verification. | History L42734–L42748, L43280–L43304; **CURRENT**. |
| Governance | Static checks enforce authoring boundaries; passing them proves technical conformance, not visual approval. | History L31779–L33879, L34977–L35458; **CURRENT**. |
| Accessibility | No broad screen-reader/WCAG acceptance initiative was authorized historically; keyboard, focus, labels, native semantics, and necessary ARIA remain functional correctness. | History L43482–L43513, L43811–L43876; **CURRENT** with limited scope. |
| RTL | Logical properties, mixed-direction isolation, RTL-aware directional icons/motion, and Arabic-first review copy are first-class. | History L1321–L1388, L43062–L43078; **CURRENT**. |
| Localization | Canonical model values remain stable; display digits, separators, money, and temporal formatting come from shared preferences where applicable. | History L42224–L42245, L42814–L42888, L42968–L43078; current authority; **CURRENT**. |
| API design | Use narrow typed unions/configs; no arbitrary CSS classes, raw values, vendor names, or giant configuration objects. Use composition for escape hatches. | History L245–L340, L294–L340, L42529–L42570; **CURRENT**. |
| Approval | Reference or explicit waiver precedes visual production components; PO approves Foundation/components incrementally; reopening is explicit. | History L42904–L42919, L43308–L43380, L43751–L43797; **CURRENT**. |

# 11. Product Owner Design Expectations

The archive supports the following recurring expectations:

- **Restrained hierarchy rather than decorative boxing.** The rejected work overused cards, containers, pale surfaces, and weak separation; the desired system should communicate hierarchy without card-inside-card noise (**History L34977–L35265**).
- **Light and Dark must both be deliberate.** Dark cannot be an automatic inversion or later add-on; it was a release-blocking visual concern (**History L34977–L35458, L37489–L37896**).
- **Arabic-first typography and spacing.** Tajawal for Arabic and Space Grotesk for Latin were accepted historically, with RTL and mixed-direction values handled explicitly (**History L41658–L41766, L43062–L43078**). Current source remains authoritative for actual font loading.
- **Desktop ERP density with controlled alternatives.** The UI should support dense work without crowding and avoid mobile-first simplification of data-heavy workflows (**History L878–L927, L43082–L43103**).
- **Consistent action priority and component states.** Primary/secondary/destructive order, loading, disabled, hover, active, focus, and error states must be coherent across families (**History L718–L806, L1668–L1707**).
- **True isolated evidence.** A route name or screenshot is insufficient. Review pages must expose real variants/states in a quiet environment and allow the Product Owner to judge the component itself (**History L31350–L31767, L34977–L35458, L37489–L37896**).
- **Reference-first visual design.** Before a visual product component is designed, the Product Owner supplies one reference or explicitly waives it; the reference is analyzed for what to adopt/reject before implementation (**History L42904–L42919, L43308–L43380, L44119–L44170**).
- **No designer role for the implementation agent.** Codex may render, measure, test, and implement approved rules, but it must not self-approve aesthetics (**History L40660–L40750, L44174–L44210**).
- **Avoid false uniformity.** Fixed equal tiles suit icon/color grids; textual items need list-row geometry. Similarly, one component must not absorb unrelated modes merely for API count reduction. This principle is reinforced by current selection and button architecture.

# 12. Superseded and Rejected Decisions

| Old decision or direction | Old evidence | Later superseding/rejecting evidence | Current replacement |
|---|---|---|---|
| Continue immediately to Suppliers after technical Foundation V2 | History L26237–L27593 | Product Owner challenges visual readiness and halts migration at L27599–L28123 | Visual/runtime review before feature migration. |
| Route/evidence counts prove showcase closure | History L31779–L33879 | Product Owner rejects actual review quality at L34977–L35458 and L37489–L37896 | True isolated evidence plus PO review. |
| The prior visual system could be frozen after technical closure | History L31779–L33879 | Visual language expressly rejected at L34977–L35458 | Design Lab Foundation/component approval workflow. |
| Storybook/workbench as the assumed review implementation | History L1252–L1317 | Separate Angular Design Lab accepted at L43855–L44000 | This repository's routed Design Lab. |
| Google AI Studio implementation as operational source of truth | History L43855–L44000 | Same passage limits source of truth to contracts/specs; current repo is Angular | Google idea is **HISTORICAL_ONLY**; repository source and authority docs govern. |
| Theme in user Preferences, possibly Light/Dark/System | History L42682–L42690, L43436–L43444 | Current authority removes Theme from Preferences and assigns App-only state | One persisted App theme authority. |
| Separate public ErpHeading and ErpLink | History L41775–L42189 | Current `AGENTS.md` and source establish ErpText only | ErpText internal semantic rendering. |
| Separate Select/MultiSelect/RemoteSelect public controls | Old inventory at History L9145–L21071 | Typed single Select proposal at L42529–L42570 | Historical names superseded; present-day final selection API remains unresolved. |
| Standalone ErpModal/ErpDrawer components | History L214–L241, L9145–L21071 | Current shared Overlay manager/host/frame system | Overlay kind/config APIs. |
| Raw native visible HTML/controls in routed pages | Earlier old-repo bypasses at History L7527–L8367 | Product Owner's ERP-only authoring direction at L37949–L40548 | ERP primitives/controls and review-only internals. |
| Arbitrary page overrides of Component Tokens | Question at History L43130–L43148 | Product Owner chose prohibition at L43430–L43434 | Component owns tokens; pages compose APIs. |
| Keep old tests/APIs to avoid breakage | Earlier compatibility concerns | Product Owner chose replacement of intentionally changed contracts at L42734–L42748, L43280–L43304 | New contract + updated real tests; no legacy veto. |
| Full WCAG AA/AAA as the chosen project gate | Assistant proposal at History L43358–L43368 | Product Owner clarification at L43482 and L43811–L43876 | Functional interaction correctness; no claimed WCAG program. |
| Default Overlay blur low/backdrop default in earlier Wave A | Later current-program history | Current README/Handoff/source use medium blur and primary backdrop | Medium/primary with false/false dismissal defaults. |
| SearchBox `popupMode` Boolean | Earlier correction-program contract | Current source exports `ErpSearchBoxMode = 'modal' \| 'dropdown' \| 'inline'` | Three explicit modes. |

# 13. Unresolved Product Decisions

The archive or current state raises, but does not conclusively answer, the following questions. None may be decided by implementation inference.

1. **What is the final public general selection control?** Should a universal typed `ErpSelect` still be introduced, or do `ErpItemPicker`, `ErpComboBox`, `ErpSearchBox`, and future native/simple selection cover distinct approved roles?
2. **Which page is authorized for review after the current Overlay/Confirm and Inputs gates?** Current authority explicitly stops further family/page work until Product Owner findings are supplied.
3. **What are the approved visual references for CheckBox and RadioBox?** Current source exists, but redesign is prohibited until references/templates arrive.
4. **When may the Table/Data family start, and what is its approved reference?** Historical evidence strongly supports `ErpTable` plus SmartTable, but no current implementation phase is authorized.
5. **Which feedback components are required in V1?** EmptyState, Alert, Skeleton, StatusBadge, Toast, and system states all existed historically, but current public vocabulary is not approved.
6. **What is the final navigation/shell vocabulary and visual model?** Sidebar, Topbar, Breadcrumbs, PageHeader, BranchSelector, UserMenu, and Notifications were historically important, but App-only theme authority supersedes some historical preference assumptions.
7. **Which historical form-engine capabilities should return?** StandardEntityForm, schema fields, repeaters, validation summary, steppers, and review surfaces need a new scope decision after concrete controls are approved.
8. **Which old ERP business composites should be reused versus rebuilt in the production repository?** The archive proves that they existed, not that their old APIs or visuals remain valid.
9. **Is a formal accessibility target intentionally excluded permanently or only from current acceptance?** The archive resolves functional keyboard/focus semantics but does not establish a future conformance policy.
10. **What is the production migration target and sequence after Design Lab approval?** Customers was historically the validation feature; no current authority reauthorizes that migration.
11. **Do chart, progress, tree, disclosure/accordion, badge, and menu families require dedicated public components?** Their general usefulness is not enough to infer final names or scope.
12. **What should replace the SplitButton legacy compact blocking-overlay exception?** Current governance isolates it pending deferred composite review, but the final nonblocking menu architecture is not supplied here.

# 14. Recommended Master Execution Path

This sequence is a planning proposal derived from evidence and dependencies. It does not authorize any phase. Each phase begins only after current authority and the Product Owner explicitly open it.

## Phase 0 — Finish the active technical and review gate

- **Objective:** establish the fresh canonical technical result required for the current Overlay/Confirm checkpoint, then obtain the required Product Owner Overlay/Confirm runtime/visual decision.
- **Prerequisites:** current clean source checkpoint.
- **Families:** current Overlay and Confirm scope only. Inputs and Tooltip remain separately recorded pending-review states rather than automatic follow-on work.
- **Expected deliverables:** the exact `erp-overlay` checks, full `verify:clean`, deterministic Overlay/Confirm runtime evidence, and PO accept/reject findings.
- **Governance/tests:** all existing repository gates; no warning suppression or budget increase.
- **Product Owner review gate:** mandatory current Overlay/Confirm Light/Dark and interaction review.
- **Non-goals:** no new component family, no table/shell/form work, no Checkbox/Radio redesign without reference.

## Phase 1 — Resolve currently deferred control visuals

- **Objective:** address only Product Owner findings from Phase 0 and, if supplied, finalize CheckBox/RadioBox references.
- **Prerequisites:** Phase 0 findings and explicit authorization.
- **Families:** current Inputs/Overlay; Boolean/Choice only if references are supplied.
- **Expected deliverables:** bounded contracts, tokens, specimens, runtime evidence.
- **Governance/tests:** existing field/overlay/token/route-page gates plus family-specific regression tests.
- **Product Owner review gate:** per page/family; passing tests do not freeze visuals.
- **Non-goals:** no adjacent missing family.

## Phase 2 — Decide feedback, status, and disclosure vocabulary before implementation

- **Objective:** obtain a Product Owner decision on the exact public feedback/status/disclosure vocabulary; this is decision-first, not a presumptive build phase.
- **Prerequisites:** completion of the active review gate, an explicit candidate-by-candidate Product Owner decision, and references or explicit waivers for every approved visual family.
- **Families:** Alert, EmptyState, Error/Loading, Skeleton, StatusBadge, Toast, Tabs, disclosure, menu, and tree are evidence candidates only. Historical mention does not place any of them in the implementation set.
- **Expected deliverables:** first, a decision matrix marking each candidate approved, deferred, rejected, internal-only, or unresolved, with its reference/waiver. Only an explicitly approved subset may then receive contracts, Component Tokens, isolated review routes, state matrices, governance, and tests.
- **Governance/tests:** for the approved subset only, enforce authoring ownership, motion/layer behavior, keyboard/focus, RTL, theme inheritance, and the approved public/internal boundary.
- **Product Owner review gate:** vocabulary and references/waivers before code; then each approved visual family separately after implementation.
- **Non-goals:** do not assume a common feedback/disclosure bundle exists, and do not infer that every historically mentioned control will be built.

## Phase 3 — Table and data-navigation foundation

- **Objective:** create a semantic table primitive and supporting controls before SmartTable orchestration.
- **Prerequisites:** approved feedback/buttons/selection/pagination dependencies and a table reference.
- **Families:** Table, SortHeader, Pagination, TableToolbar, ColumnChooser, selection/bulk-action boundaries.
- **Expected deliverables:** typed table model, RTL, density, sorting evidence, responsive overflow behavior.
- **Governance/tests:** no raw tables in pages, no duplicated data logic, semantic ownership, keyboard/focus where applicable.
- **Product Owner review gate:** primitive table first, then supporting controls.
- **Non-goals:** no HTTP/business logic in the table primitive.

## Phase 4 — SmartTable and data patterns

- **Objective:** compose server-aware intents and state without owning backend access.
- **Prerequisites:** Phase 3, data-source/query contract, approved filter controls.
- **Families:** SmartTable, DataPage, FilterBar/Drawer, BulkActionBar, ViewSwitcher.
- **Expected deliverables:** local/remote intent contracts, empty/loading/error states, selection, column settings.
- **Governance/tests:** stale-response behavior, server paging/sort/filter intent tests, no feature API calls.
- **Product Owner review gate:** validate against a representative ERP directory, not synthetic specimens alone.
- **Non-goals:** no Customer/Supplier migration yet.

## Phase 5 — Forms and workflow patterns

- **Objective:** compose approved fields into sections, actions, validation summary, repeaters, and stepper/review flows.
- **Prerequisites:** stable field APIs and feedback/table dependencies.
- **Families:** FormSection, FormActions, ValidationSummary, Repeater, Stepper, review surface.
- **Expected deliverables:** form composition contracts and escape hatches.
- **Governance/tests:** CVA/validation integrity, dirty/touched handling, keyboard/focus, no schema-driven visual bypass.
- **Product Owner review gate:** representative CRUD and business form.
- **Non-goals:** no generic schema engine until concrete patterns prove stable.

## Phase 6 — Optional schema-driven form engine

- **Objective:** automate repetitive CRUD only after concrete controls/patterns are approved.
- **Prerequisites:** Phase 5 and explicit confirmation that generation remains required.
- **Families:** StandardEntityForm, schema registry/fields, custom field/section outlets.
- **Expected deliverables:** typed schema, registry, escape hatches, review/step integration.
- **Governance/tests:** unsupported field types fail deterministically; custom business flows can opt out.
- **Product Owner review gate:** generated vs hand-composed parity on representative CRUD.
- **Non-goals:** no universal business-rule engine.

## Phase 7 — Navigation and application shell

- **Objective:** establish the production ERP shell only after its component dependencies and visual references are approved.
- **Prerequisites:** Buttons, menus, feedback, search, overlay, permissions/session adapters.
- **Families:** AppShell, Sidebar, Topbar, Breadcrumbs, PageHeader/PageShell, BranchSelector, GlobalSearch, NotificationBell, UserMenu.
- **Expected deliverables:** RTL hierarchy, responsive desktop behavior, permission/context boundaries, one theme authority.
- **Governance/tests:** no local theme state, maximum-depth behavior if reaffirmed, keyboard/focus, overlay host ownership.
- **Product Owner review gate:** shell in realistic ERP navigation/data context.
- **Non-goals:** no feature migration or backend coupling.

## Phase 8 — Reusable ERP page patterns

- **Objective:** validate the system through real list/detail/form/transaction workflows.
- **Prerequisites:** Table/data, forms, shell.
- **Families:** EntityDirectory, EntityDetail, page archetypes, audit/attachments/print-export patterns.
- **Expected deliverables:** a small number of proven patterns, not dozens of speculative super-components.
- **Governance/tests:** page owns data/business logic; patterns own repeatable composition.
- **Product Owner review gate:** representative real feature, historically Customers unless reauthorized differently.
- **Non-goals:** no mass migration.

## Phase 9 — ERP-specific composites and migration

- **Objective:** reintroduce only domain composites proven across real workflows, then migrate features incrementally.
- **Prerequisites:** approved Phase 8 patterns and domain requirements.
- **Families:** transaction lines, payment allocation, stock/workflow panels, permission tree, sync/offline/system pages.
- **Expected deliverables:** domain-owned typed contracts and measured reuse.
- **Governance/tests:** domain invariants, permissions, concurrency, server authority, end-to-end workflow evidence.
- **Product Owner review gate:** each migrated feature; freeze APIs only after real-use validation.
- **Non-goals:** no bulk rewrite of 300–400 pages.

# 15. Immediate Next-State Recommendation

## A. Currently authorized next repository action

The newest current-authority entries state that the latest Overlay governance false-positive correction is implemented, but a fresh rerun remains pending. The next technical actions are:

1. `npm run erp-overlay:check`;
2. `npm run erp-overlay:check:self-test`;
3. `npm run verify:clean`.

If and only if the canonical gate is green, the immediate Product Owner gate is the current Overlay/Confirm runtime/visual re-review required by the latest authority, including the current Header outline, contrast, defaults, and relevant Light/Dark behavior. Inputs and Tooltip retain their separately documented pending-review states, but they are not automatically the next execution action. Continuation after Overlay/Confirm review must follow the then-current authority. No additional implementation phase or public family is authorized by this historical analysis.

## B. Longer-term reconstructed roadmap

The longer-term evidence supports Foundation → primitives → basic controls → common feedback/disclosure → table/data → forms → shell → page patterns → ERP-specific composites → incremental feature migration. That roadmap is **planning context only**. Every unopened family requires Product Owner scope, reference/waiver, and an explicit execution phase.

# 16. Confidence and Evidence Quality

| Major conclusion | Confidence | Basis and uncertainty |
|---|---|---|
| The frontend consistency/architecture problem triggered the work | HIGH | Explicit at History L1–L42 and repeated throughout the audit. |
| The old frontend contained substantial reusable architecture | HIGH | Full inventory/audit at History L4099–L4848, L7527–L8367, L9145–L21071. |
| Visual/review failure—not absence of code—caused the Design Lab pivot | HIGH | Explicit rejection at History L34977–L35458 and L37489–L37896, followed by Lab decision at L43855–L44000. |
| Arabic-first, RTL-first, desktop ERP are durable goals | HIGH | Repeated and explicit across origin, decisions, and current governance. |
| Current Foundation/primitives/controls/overlay source exists | HIGH | Verified directly from current source and routes. |
| Current technical source is Product Owner-approved visually | HIGH confidence that this is false | Current authority repeatedly says technical checkpoints do not imply approval. |
| Table/SmartTable remains a likely major future family | HIGH as historical intent; LOW as current authorization | Repeated evidence, but no current phase. |
| Universal ErpSelect remains the final desired API | LOW | Historically accepted, but current picker architecture evolved and current authority does not settle it. |
| Old ERP business components should be ported unchanged | LOW | The archive proves existence, not current validity. |
| Formal accessibility conformance target | LOW | The Product Owner excluded screen-reader/blind-helper gates while retaining interaction correctness; future policy is unresolved. |
| Google AI Studio remains required operational tooling | LOW | It was a proposed path; the Angular Design Lab exists and current authority does not require AI Studio. |

Material evidence limitations:

- The raw archive ends immediately after agreement to begin the Design Lab; it does not itself contain the later repository execution history.
- The archive contains long assistant proposals. Only Product Owner answers or later accepted decisions were promoted.
- The historical audit describes a different/main frontend repository. Absence from this Design Lab is not proof of deletion from the production system.
- Current authority files are append-only and contain intermediate states. The latest entries and actual source take precedence over earlier sections in those same files.
- Visual quality cannot be inferred from source inspection, tests, routes, or screenshots counts.

# 17. Final Master Inventory Summary

The inventory above is a normalized capability inventory: renamed old/current counterparts share one row, while materially distinct components remain separate. Historical assistant-only examples are excluded from the numeric total unless they became accepted or were audited in source.

| Category | Implemented | Partial | Missing | Deferred | Superseded | Unresolved |
|---|---:|---:|---:|---:|---:|---:|
| Foundation / Tokens | 13 | 2 | 0 | 0 | 0 | 0 |
| Primitives / Layout / Typography / Icon | 9 | 0 | 0 | 0 | 0 | 0 |
| Buttons / Actions / Field Foundation | 10 | 2 | 0 | 0 | 0 | 0 |
| Entry / Numeric / Boolean / Choice / Selection | 8 | 7 | 3 | 2 | 2 | 0 |
| Temporal / File / Image | 0 | 6 | 0 | 0 | 0 | 0 |
| Overlay / Feedback / Status | 4 | 2 | 5 | 0 | 2 | 0 |
| Navigation / Shell / Utilities | 0 | 0 | 9 | 0 | 2 | 0 |
| Data / Tables / Filtering / Visualization | 0 | 0 | 8 | 0 | 0 | 0 |
| Forms / Patterns | 0 | 0 | 3 | 3 | 1 | 0 |
| ERP-specific / Application integration | 0 | 0 | 1 | 2 | 0 | 0 |
| **Total current-or-candidate inventory** | **44** | **19** | **29** | **7** | **7** | **0** |

“Unresolved = 0” refers only to inventory-row decision status. It does not mean there are zero unresolved Product Owner decisions. Section 13 separately records unresolved product and architecture decisions.

Summary metrics:

- **Total identifiable normalized components/capabilities:** 166.
- **Count by major family:** Foundation/Tokens 15; Primitives/Layout/Typography/Icon 9; Buttons/Actions/Field Foundation 12; Entry/Numeric/Boolean/Choice/Selection 23; Temporal/File/Image 6; Overlay/Feedback/Status 23; Navigation/Shell/Utilities 28; Data/Tables/Filtering/Visualization 15; Forms/Patterns 13; ERP-specific/Application integration 22.
- **Historical-only audited capabilities:** 60 of the 166 rows. They are excluded from the compact current/candidate status totals above rather than being mislabeled “unresolved.”
- **Requiring explicit Product Owner confirmation before implementation:** 27 rows carry **NEEDS_PRODUCT_OWNER_CONFIRMATION**; the 2 **NOT_IMPLEMENTED** and 7 **DEFERRED** rows also require an explicit phase authorization before work.
- **Genuinely absent current/future candidates:** 29 normalized rows are either **NOT_IMPLEMENTED** or **NEEDS_PRODUCT_OWNER_CONFIRMATION**. A further 7 deferred and 60 historical-only entries are absent, but calling them “missing requirements” would overstate the evidence.

The numeric summary is intentionally conservative: it distinguishes absence from authorization, and it does not count every alias (`TextInput` versus `TextBox`, `Modal` versus Overlay kind) as a separate missing product component. The authoritative immediate state remains the current technical gate and Product Owner review, not the historical roadmap.
