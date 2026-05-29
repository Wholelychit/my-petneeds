# PetNeeds.ai Project Status

Date updated: 2026-05-28

## What The Site Does

PetNeeds.ai is a simple static pet information and future monetization website for families, beginner pet owners, rescue pet owners, senior pet owners, and people learning basic care routines for dogs, cats, fish, birds, reptiles, and small pets.

The site is educational only. It does not replace a licensed veterinarian, diagnose pets, treat pets, manage emergencies, process uploads, create user accounts, or provide medical advice.

## Current Status

PetNeeds.ai is a simple static pet information and community website.

The repo uses plain HTML and plain CSS. No active JavaScript file is required by the current public pages.

## Current Stack

- Plain HTML files
- Plain CSS in `styles.css`
- GitHub repository workflow
- No React, Vite, Next.js, TypeScript, npm, or build tooling
- No live ads, tracking scripts, payments, credentials, API keys, uploads, user accounts, public AI, veterinary diagnosis features, or live affiliate links

## Files / Pages Complete

- Homepage is live as `index.html`.
- Starter Guides page exists and is linked from the homepage.
- Starter checklists exist for puppies, kittens, fish tanks, senior pet comfort, and rescue first week care.
- Main category pages exist for dogs, cats, fish, birds, reptiles, small pets, senior pets, and rescue pets.
- Support pages exist for About, Contact, Privacy, Terms, Affiliate Disclosure, Ask AI planning, Safety Guide, and Photo Ideas.
- Dog comfort checklist page exists.
- Rescue first week checklist exists and is linked from Starter Guides.
- Sitemap includes all current public pages found in the repo, including the rescue first week checklist.
- Robots file points to the sitemap.
- Mobile CSS and focus styles have been improved.
- Public page navigation has been standardized across the main pages.
- Footer disclaimer styling exists in `styles.css` as `.footer-note`.
- README, GROWTH-PLAN.md, PROJECT-STATUS.md, and SITE-CHECKLIST.md are updated.

## Files / Pages Needing Work

- Public HTML pages still need canonical URLs added before this audit can be marked PASS.
- Most public pages should repeat a clear veterinarian disclaimer, not only link to the safety guide.
- `ask.js` is not present and is not required by the current public pages; docs should not imply it is active.
- Visual QA remains pending.
- Future content should continue one safe page at a time.

## SEO Status

- Public pages checked have titles, meta descriptions, exactly one H1, main navigation, and footer navigation.
- `sitemap.xml` includes the public pages found in the repository, including `senior-pet-comfort-checklist.html` and `rescue-first-week-checklist.html`.
- Canonical URLs are currently missing from public HTML pages and remain the top SEO fix.
- No live tracking, live ads, payments, uploads, user accounts, public AI, or affiliate links were found during the non-visual audit.

## Sitemap / Robots Status

- `sitemap.xml` exists and includes the current public page set.
- `robots.txt` exists and points to `https://petneeds.ai/sitemap.xml`.
- File existence check passed for the sitemap-listed pages that were inspected.

## Footer / Navigation Status

- Public pages checked have header navigation and footer navigation.
- Internal local `.html` and `styles.css` references resolved during the audit.
- Footer/navigation should be kept consistent as new guide pages are added.
- Footer disclaimer styling has been added, but the disclaimer still needs to be inserted into public page footers.

## Trust / Legal Status

- Privacy, Terms, Affiliate Disclosure, Contact, About, Safety Guide, Ask AI planning, and Photo Ideas pages exist.
- Public content is educational and beginner-friendly.
- The site must keep clear veterinarian-safety language on public pages, especially guide pages.
- Ask AI and upload-photo pages are planning/concept pages only and must not become public AI, uploads, diagnosis, or account features without direct approval.

## Monetization Status

- Monetization is inactive.
- No live ads, tracking scripts, payments, live affiliate links, credentials, API keys, public AI, uploads, or user accounts were found.
- Future monetization should stay clearly disclosed and separate from safety content.

## QA Status

- Universal Codex Repo Audit started on 2026-05-28.
- Non-visual checks found safe issues that still need page-level cleanup: missing canonical URLs and broader veterinarian disclaimer placement.
- Rescue first week checklist and sitemap coverage are now present.
- Current audit status: NEEDS FIX.
- Visual/browser QA remains pending.

## Production Rules Still Active

- Keep the current simple stack.
- Do not add private keys.
- Do not add payment setup.
- Do not add live ads.
- Do not add tracking scripts.
- Do not add live affiliate links.
- Do not add public AI.
- Do not add uploads or user accounts.
- Do not add veterinary diagnosis claims or medical diagnosis features.
- Do not delete major working code.
- Keep copy simple, family-friendly, educational, and clear that it does not replace a veterinarian.
- Commit useful safe changes directly.

## Current Public Pages

- `index.html`
- `starter-guides.html`
- `puppy-starter-checklist.html`
- `kitten-starter-checklist.html`
- `fish-tank-starter-checklist.html`
- `senior-pet-comfort-checklist.html`
- `rescue-first-week-checklist.html`
- `dogs.html`
- `dog-comfort-checklist.html`
- `cats.html`
- `fish.html`
- `birds.html`
- `reptiles.html`
- `small-pets.html`
- `senior-pets.html`
- `rescue.html`
- `ask-ai.html`
- `emergency.html`
- `upload-photo.html`
- `about.html`
- `privacy.html`
- `terms.html`
- `contact.html`
- `affiliate-disclosure.html`

## Real Blockers

- Local shell does not have `git` available.
- The GitHub connector can commit small safe file updates, but page-wide multi-file HTML cleanup is conflict-prone when another agent or session is editing the same files.
- Visual QA requires a browser pass.
- Live ads, tracking, payments, affiliate links, credentials, public AI, uploads, user accounts, veterinary claims, and diagnosis features remain blocked without direct approval.

## Next Safe Queue

1. Add canonical URLs to every public HTML page.
2. Add the `.footer-note` veterinarian disclaimer into public guide/support page footers.
3. Re-run the non-visual audit after canonical and disclaimer cleanup.
4. Run browser/mobile visual QA.
5. Add local resource planning through Codex.
6. Add email signup planning through Codex.
7. Add photo review planning through Codex without enabling real uploads.
8. Keep monetization inactive until disclosure, privacy, partner, and tracking rules are ready.

## Connector Note

Some larger new-page or multi-page writes may be awkward through the ChatGPT GitHub connector. Use Codex/local repo workflow for bigger batches when available.
