# UI Quality Audit Workflow

Use this workflow whenever a demo is added, visually revised, or prepared for
client review. It combines visual judgment, UX validation, implementation, and
a final standards gate.

## Invocation

Ask Codex:

> Run `workflows/ui-quality-audit.md` against Demo N. Audit local screenshots
> and the live site, fix confirmed findings, verify EN/VI, then commit and push
> only after every gate passes.

If the user requests audit-only work, stop after Phase 2 and do not edit files.

## Required Skill Order

1. `impeccable` - inspect screenshots and rendered pages for visual problems.
2. `ux-ui-advisor` - confirm the user impact and priority of each finding.
3. `frontend-design` - implement only confirmed findings.
4. `web-design-guidelines` - perform the final quality gate.

Do not let implementation begin before UX review. Do not let a successful
static check override a visible problem in the browser.

## Scope Setup

Before auditing:

1. Read `AGENTS.md` and `PRODUCT.md`.
2. Record the target demo, pages, languages, and viewport sizes.
3. Check `git status`; preserve unrelated user changes.
4. Start the local server with
   `python3 -m http.server 8765 --bind 127.0.0.1`.
5. Capture or inspect Homepage, About, and Contact at 375, 430, 768, and
   1440px in English and Vietnamese.
6. Compare the local render with the current live deployment.

## Phase 1 - Impeccable Visual Audit

Inspect the complete page, not only the first viewport. Log evidence for every
finding and check these failure modes explicitly:

- A personal or expert promise without a relevant human image nearby.
- Stock imagery showing the wrong person, activity, context, or emotional tone.
- Repeated imagery that makes distinct sections feel generic.
- Hero value proposition or primary CTA falling below the initial viewport.
- Oversized headings, weak hierarchy, dense prose, or repetitive eyebrow labels.
- Template-like card grids, excessive uppercase tracking, decorative clutter,
  generic wellness/spa styling, or visual patterns that weaken the concept.
- Weak contrast, invisible focus, undersized controls, or unclear hover states.
- Cropping, overflow, awkward line wrapping, or dead space at target widths.
- Unnecessarily large image payloads or missing dimensions and alt text.

Use this finding format:

| ID | Severity | Page/viewport | Evidence | User impact | Proposed fix |
| --- | --- | --- | --- | --- | --- |

Severity definitions:

- `P0`: blocks access, navigation, form use, or essential content.
- `P1`: materially damages comprehension, trust, accessibility, or conversion.
- `P2`: noticeable quality or consistency problem.
- `P3`: polish opportunity with low user impact.

## Phase 2 - UX Impact Review

For each finding, `ux-ui-advisor` must mark it as `confirm`, `revise`, or
`reject` and explain:

- Who is affected and at what stage of the journey.
- Whether comprehension, trust, safety, accessibility, or task completion is
  affected.
- Whether the proposed fix creates new cognitive load or visual competition.
- Whether the fix preserves the selected demo's distinct design language.

Prioritize P0/P1 findings. Combine related P2 findings into one coherent fix.
Reject changes that are purely decorative or unsupported by user impact.

## Phase 3 - Frontend Implementation

`frontend-design` implements confirmed findings while preserving project rules:

- Keep Demo 1, Demo 2, and Demo 3 visually distinct.
- Do not invent names, credentials, team size, claims, testimonials, or prices.
- Update `i18n.js` whenever visible English copy or attributes change.
- Keep shared behavior in root `script.js`.
- Use licensed placeholders until client photography is available.
- Optimize remote images with explicit width, quality, and modern format where
  supported; retain intrinsic dimensions and meaningful alt text.
- Maintain 44px touch targets, visible focus, reduced motion, semantic HTML,
  and no horizontal overflow.
- Bump query-string versions on every affected HTML page after changing a CSS,
  JavaScript, or translation asset.

After implementation, recapture the affected pages and verify each finding
against its original evidence. Do not mark a finding fixed from source review
alone.

## Phase 4 - Web Design Guidelines Gate

The final reviewer checks the rendered result independently:

- Accessibility: semantics, labels, contrast, keyboard order, focus visibility,
  modal/menu focus management, touch targets, zoom, and reduced motion.
- Responsive behavior: no overflow, clipping, overlap, hidden CTA, or broken
  typography at all target widths in EN and VI.
- Visual quality: hierarchy, spacing rhythm, image relevance, crop quality,
  concept consistency, and absence of generic template patterns.
- Interaction states: default, hover, focus, active, validation, menu open/close,
  modal open/close, outside click, and `Escape`.
- Performance basics: appropriately sized images, stable dimensions, font
  fallback, and no browser console errors or warnings.

Any new P0/P1 finding returns the workflow to Phase 2. P2 findings return to
Phase 3 when they are within scope. Record deferred P3 items separately.

## Automated Quality Gate

With the local server stopped, run:

```sh
./scripts/check-ui-quality.sh
```

The script checks JavaScript syntax, Prettier formatting, whitespace errors,
and HTTP 200 responses for all nine pages, shared assets, and the PDF. It does
not replace browser or visual testing.

## Required Interaction Checks

Do not submit a real lead.

1. Open and close the mobile menu with pointer and keyboard.
2. Confirm outside click and `Escape` close it.
3. Confirm focus returns to the menu button and closed navigation is inert.
4. Open and close the guide modal via CTA, close button, backdrop, and `Escape`.
5. Confirm focus trap, focus return, and background inert state.
6. Trigger required form validation without completing submission.
7. Switch EN/VI on every page and inspect long Vietnamese labels and headings.
8. Confirm the contact form describes opening an email draft, not sending data.

## Completion And Deployment

The workflow passes only when:

- Every confirmed P0/P1/P2 finding is fixed or explicitly deferred by the user.
- Before/after evidence confirms the rendered fix.
- The automated quality gate passes.
- Browser console reports zero errors and zero relevant warnings.
- All required interactions work with pointer and keyboard.
- The working tree contains no accidental artifacts.

Then create one focused commit, push `main`, wait for GitHub Pages, and verify
all nine live pages plus `script.js`, `i18n.js`, the target CSS asset, and the
PDF return HTTP 200. Confirm a unique marker from the new change is present on
the live page to rule out stale deployment.

## Final Report

Report:

1. Scope audited.
2. Findings grouped by severity.
3. UX decisions: confirmed, revised, rejected, deferred.
4. Files changed and why.
5. Interaction and responsive checks completed.
6. Automated gate results.
7. Commit hash, deployment status, and live URLs.
8. Remaining client inputs or residual risks.
