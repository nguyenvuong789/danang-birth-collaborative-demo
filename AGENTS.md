# Project: DaNang Birth Collective Website Concepts

## Purpose

This repository contains two client-ready static website concepts for DaNang Birth Collective in Da Nang, Vietnam. The client has not selected a final concept yet, so maintain both versions unless the user explicitly asks to remove one.

- Demo 1: clean, monochrome editorial direction inspired by BHMBORN's restraint
- Demo 2: softer sage maternal direction with a warmer, more approachable tone informed by Gentle Childbirth

Use the reference sites for general mood only. Never copy their layouts, logos, images, text, or other assets.

## Live Sites

- Demo 1 homepage: https://nguyenvuong789.github.io/danang-birth-collaborative-demo/
- Demo 1 About: https://nguyenvuong789.github.io/danang-birth-collaborative-demo/about.html
- Demo 1 Contact: https://nguyenvuong789.github.io/danang-birth-collaborative-demo/contact.html
- Demo 2 homepage: https://nguyenvuong789.github.io/danang-birth-collaborative-demo/demo-2/
- Demo 2 About: https://nguyenvuong789.github.io/danang-birth-collaborative-demo/demo-2/about.html
- Demo 2 Contact: https://nguyenvuong789.github.io/danang-birth-collaborative-demo/demo-2/contact.html

GitHub Pages deploys from `main` in `nguyenvuong789/danang-birth-collaborative-demo`.

## Tech Stack

- Standalone HTML, CSS, and JavaScript
- No package manager, build step, framework, CMS, or WordPress integration
- Google Fonts and licensed Unsplash placeholder images
- Shared behavior in `script.js`
- Shared English/Vietnamese translations in `i18n.js`
- Separate visual systems in `styles.css` and `demo-2/styles.css`

## Project Map

- `index.html`, `about.html`, `contact.html`: Demo 1 pages
- `styles.css`: Demo 1 visual system
- `demo-2/index.html`, `demo-2/about.html`, `demo-2/contact.html`: Demo 2 pages
- `demo-2/styles.css`: Demo 2 visual system
- `script.js`: shared menu, reveal, contact-form, guide-modal, and year behavior
- `i18n.js`: shared EN/VI text and attribute translations
- `output/pdf/cross-cultural-guide-to-birth.pdf`: guide download
- `favicon.svg`: temporary brand mark; the official logo is still pending

Do not recreate `demo-2/script.js`. Both demos intentionally use the root `script.js`.

## Confirmed Business Information

- Business: DaNang Birth Collective
- Location/service area: Da Nang, Vietnam
- Contact: `danangbirthcollaborative@gmail.com`
- Services:
  - Prenatal education
  - Birth doula support
  - Postpartum doula support
  - Pregnancy and postpartum strength training
  - Nutrition consultations
- Positioning: continuous support through the changing seasons of a woman's life and health journey
- Audience: women and families seeking pregnancy, birth, postpartum, maternal wellness, fitness, nutrition, and local support in Da Nang

## Content Rules

- The practice currently represents one practitioner, but the client-facing brand voice uses `we`, `us`, and `our`.
- Do not use first-person singular language such as `I`, `me`, or `my`.
- Do not invent practitioner names, team members, institutions, certifications, qualification titles, years of experience, testimonials, prices, packages, or medical claims.
- Collective terms such as `team` or `doulas` may remain where they support the brand voice, but never invent named additional practitioners or claim a specific team size.
- Do not show placeholder language such as "coming soon", "request team information", or "ask for a publication update". The demo should read as a complete website.
- Keep services visible without prices until the client requests pricing.
- Treat professional photos, official logo, final colors, exact training qualifications, and final copy as pending client materials.
- Current Unsplash images are temporary licensed placeholders. Replace them only with suitable licensed images or client-provided assets.

## Internationalization

- Every page supports English and Vietnamese.
- `i18n.js` translates exact English text-node and attribute values. When English copy changes, update the matching key in `i18n.js` or the Vietnamese version will remain stale.
- Preserve both desktop and mobile language switchers.
- Language preference is stored in local storage under `dbc-language`.
- Check both languages after changing visible copy, placeholders, labels, `aria-label`, `alt`, `title`, or page titles.

## Forms And Lead Capture

- Contact forms open a prefilled draft in the visitor's email application. They do not send medical data to a backend.
- Keep the warning that visitors should not include private medical details.
- The Cross-Cultural Guide to Birth is a lead magnet, not a direct public download CTA.
- Both guide CTAs open an accessible modal that collects name and email.
- Guide leads use FormSubmit and are sent to `danangbirthcollaborative@gmail.com`.
- After submission, visitors are redirected to the PDF and receive an autoresponse containing the guide link.
- FormSubmit requires one-time activation from the client's Gmail inbox. Do not submit a real test lead or send email without explicit user approval.

## Design Boundaries

- Preserve the distinction between the two concepts. Do not merge their palettes, typography, image shapes, or component language.
- Demo 1 should remain sharper, editorial, monochrome, restrained, and premium.
- Demo 2 should remain soft, sage-led, maternal, warm, and professional without becoming decorative or overly feminine.
- Keep typography and desktop headlines controlled; the user has previously rejected oversized desktop text.
- Favor whitespace, thin rules, simple CTA treatment, and restrained motion.
- Avoid unnecessary decorative numbering, ornamental SVG lines, vertical text, excessive hover effects, and generic template styling.

## Interaction And Accessibility Requirements

- Mobile menu must support click, outside click, `Escape`, focus return, and `inert` navigation when closed.
- Guide modal must support backdrop close, close button, `Escape`, focus trapping, focus return, and background `inert` state.
- Preserve visible keyboard focus.
- Preserve `prefers-reduced-motion` behavior.
- Mobile touch targets should remain at least 44px high.
- Do not introduce horizontal overflow at 375px, 430px, 768px, or 1440px.
- Keep animations subtle and GPU-friendly; avoid locking vertical page scrolling when the mobile menu opens.

## Code Conventions

- Use semantic HTML and progressive enhancement.
- Keep shared behavior in `script.js`; add demo-specific branching only when the visual systems genuinely require it.
- Keep each visual system in its existing CSS file.
- Prefer clear selectors and consolidate effective declarations into their original blocks instead of appending override sections at the end of CSS files.
- Use Prettier formatting for CSS and JavaScript.
- Use `apply_patch` for manual edits.
- Update CSS/JS query-string versions in all affected HTML pages after changing a shared asset so GitHub Pages visitors do not receive stale cached files.
- Preserve existing accessibility attributes and localized text when editing markup.

## Local Verification

Start a local server:

```sh
python3 -m http.server 8765 --bind 127.0.0.1
```

Minimum checks before committing:

```sh
node --check script.js
prettier --check script.js styles.css demo-2/styles.css
git diff --check
```

Also verify:

- All six pages load without console errors
- Mobile menu works on both concepts
- EN/VI switching works on all pages
- Contact forms build the expected email draft
- Guide modal opens and closes correctly without submitting a real lead
- PDF returns HTTP 200
- No horizontal overflow at the target widths
- Desktop and mobile screenshots still match the intended concept

## Git And Deployment

- Work on `main` unless the user requests another branch.
- Preserve unrelated user changes in a dirty worktree.
- Use focused commits and do not amend unless explicitly requested.
- After pushing, wait for GitHub Pages and verify all six live URLs plus `script.js` and the PDF return HTTP 200.

## Pending Client Inputs

- Official logo
- Confirmed brand colors
- Professional practitioner photos
- Exact training qualifications and credential wording
- Final approved copy
- Confirmation of the preferred design concept

When these arrive, replace placeholders carefully without adding unsupported claims or changing the unselected concept unless requested.
