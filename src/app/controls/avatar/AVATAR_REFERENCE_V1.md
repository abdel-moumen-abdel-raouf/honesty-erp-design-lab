# ErpAvatar Reference V1

## Authority

- Reference 1: `https://cdn.prod.website-files.com/61f9082050036c6c4b4899f8/69a0488093460fd20f8cc4b4_avatars-1689756128376-2x.jpeg`.
- Reference 1 SHA-256: `21DAC54CC0A54460E554063C3597892AF93DFB1C5E47B54CB746577E7C573DBE`.
- Reference 2: `https://i0.wp.com/www.cssscript.com/wp-content/uploads/2018/05/avatar-min.png?fit=581%2C368&ssl=1`.
- Reference 2 SHA-256: `D5379A4E2277E82F0CDFD47A4A9C2B5B13470424A66C76D2025DFF4A43141F3B`.
- Inspected: 2026-10-06. Review downloads are not redistributed.

## Contract

- Shapes are exactly `circle | rounded | square`.
- Content fallback remains image, deterministic initials, then semantic icon when configured.
- Presence is optional and bounded to `online | away | busy | offline`.
- Physical positions are `top | bottom | left | right | top-left | top-right | bottom-left | bottom-right`.
- Presence motion is `none | pulse | ping | breathe`; hover motion is `none | scale | lift`.
- The inner media layer clips artwork; the host does not clip presence evidence.
- All motion uses system tokens and resolves static under reduced motion.

Product Owner runtime/visual approval remains pending.
