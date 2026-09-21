# Honesty ERP — Structural Primitives V1

- Foundation V1 frozen.
- Component Token Framework V1 frozen.
- Product Owner reference waiver granted for Structural Primitives V1.
- RTL-first.
- Logical CSS properties only where direction matters.
- All tunable design values flow through each primitive's Component Tokens.
- Ordinary CSS mechanics are not tokens.

## ErpContainer

- `width`: `full` (default), `narrow`, `content`, `wide`
- `gutter`: `page` (default), `none`

## ErpStack

- `gap`: `none`, `tight`, `default` (default), `loose`
- `align`: `stretch` (default), `start`, `center`, `end`
- `justify`: `start` (default), `center`, `end`, `between`

## ErpInline

- `gap`: `none`, `tight`, `default` (default), `loose`
- `align`: `stretch`, `start`, `center` (default), `end`, `baseline`
- `justify`: `start` (default), `center`, `end`, `between`
- `wrap`: `nowrap` (default), `wrap`

## ErpGrid

- `columns`: `1` (default), `2`, `3`, `4`, `5`, `6`
- `gap`: `grid` (default), `none`, `xxs`, `xs`, `sm`, `md`, `lg`, `xl`, `xxl`
- `responsive`: `auto` (default), `fixed`

For `responsive="auto"`:

- below `md`, all configured column counts resolve to 1;
- from `md` to below `lg`, configured 1 stays 1, configured 2 stays 2, and configured 3–6 resolve to 2;
- from `lg` to below `xl`, configured 1–3 stay unchanged and configured 4–6 resolve to 3;
- at `xl` and above, the configured column count is used unchanged.

For `responsive="fixed"`, no responsive column override is applied.

## ErpSurface

- `tone`: `canvas`, `default` (default), `elevated`, `inverse`
- `border`: `none` (default), `subtle`, `default`, `strong`
- `elevation`: `none` (default), `raised`, `overlay`
- `radius`: `none`, `control`, `surface` (default), `overlay`, `full`
- `padding`: `none`, `tight`, `default` (default), `loose`

## ErpSection

- `gap`: `none`, `default` (default), `large`

## ErpDivider

- `orientation`: `horizontal` (default), `vertical`
- `tone`: `subtle` (default), `default`, `strong`
- `stroke`: `solid` (default), `dashed`
- `weight`: `default` (default), `emphasis`
