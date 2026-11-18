# Wattlebridge experience refinement handoff

## Latest direction — refine the existing site

Aaron explicitly clarified that he does **not want a complete redesign**. Keep the existing Wattlebridge identity, core page structure, approved copy, photographs, employer/candidate journeys and working form. Improve the current experience in place. This clarification supersedes the earlier request in this handoff to treat the page as a redesign starting point.

His priorities are custom animations and effects, scroll-activated animation, a properly framed hero, premium typography and scrolling that feels polished and deliberate. The site should feel like a crafted experience rather than a generic landing page. Preserve what works; do not replace the page with a different template or rebuild its architecture without a concrete need.

Aaron will work directly in this GitHub repository through Replit, using his preferred available model (requested: Opus 5.5). The repository does not select or guarantee a model. Replit is the editor and preview environment; production updates will be deployed from Codex to the existing Sites project, not hosted on Replit.

## Refinement priorities

1. **Frame the hero deliberately.** Refine the current oversized headline and paired-arch photographs as one composition: outer margins, text measure, line breaks, image proportions, crops, baseline alignment and CTA placement. Review complete first viewports at realistic desktop and mobile heights. The header, headline, photographs and actions should feel intentionally related, without accidental clipping or excessive blank space. Do not force everything into a fixed viewport height at the expense of readability.
2. **Elevate typography.** Refine font choice, optical weight, scale, tracking, leading and responsive wrapping across the current site. Manrope is the current display font, not an immutable choice; Aaron has authorized custom typography. Use appropriately licensed fonts, retain their licenses and load them efficiently. Preserve readable body text and the supplied logo unchanged. Premium typography comes from the whole type system, not simply making every heading larger.
3. **Choreograph scrolling.** Add purposeful, custom scroll-triggered motion: for example, selective text entrances, image-mask reveals, restrained image depth/parallax and carefully timed transitions between existing sections. Choose effects that suit the current identity, rather than stacking every effect onto every section. Shape pacing, easing, stagger and distance consistently. Content must remain visible if animation initialization fails.
4. **Polish interaction.** Refine the existing hamburger/open-close choreography, navigation links, buttons, service accordion and form states. Keep the menu compact; Aaron explicitly rejected a full-screen panel padded with empty space. Anchor clicks must close the menu and smoothly reach the correct section without sticky-header obstruction.
5. **Make the finish hold up on real devices.** Preserve native wheel, touch and keyboard control, avoid forced scroll speeds or long pinned sequences, and keep animation responsive to interruption. Respect reduced motion and simplify effects for small screens where needed. Favor transform/opacity animation and avoid layout thrashing, unnecessary React renders on every scroll frame, heavy dependencies without a clear benefit or continuous decorative motion.

Study Digital Prodigy, Aurixa, Syntra and HUMN for craft and interaction quality while refining this site's existing visual language. The reference projects are not instructions to transplant their palettes, effects or layouts.

## Read first and resolve precedence

Read `docs/WATTLEBRIDGE_CODEX_BUILD_BRIEF.md` for the confirmed email agreement, approved copy, branding, source asset links and repository references. It is the implementation brief used for the build, with private correspondence, mailbox links and commercial discussions omitted for this public repository. Some instructions in that document predate the following direct instructions from Aaron:

- Custom React + TypeScript with Vite and AI assistance are approved. The old WordPress/Elementor and no-AI assessment requirements are superseded. Do not touch WordPress staging.
- Aaron subsequently requested custom typography/font. The current implementation uses locally hosted Instrument Sans (OFL, replacing Manrope) for display typography and Arial for body text. The brief's original Arial-only restriction is superseded by that later request. The supplied logo remains unchanged.
- Aaron asked for a custom animated hamburger menu and automatic scrolling from navigation buttons. He then rejected excessive empty space in the full-screen menu. The current menu is sized to its content. Preserve clear keyboard operation, Escape/focus return and reduced-motion support while refining it.
- Aaron explicitly authorized public publication through the existing Sites hosting and chose `wattlebridge.digitalprodigy.dev`. Replit is the editing environment and manages the domain DNS; he clarified that he is NOT requesting migration of public hosting to Replit.
- Do not email or send messages to Tracy or Chad. Do not invent testimonials, clients, statistics, vacancies, employee identities or business claims.

## Source map

- `src/App.tsx`: homepage composition, modal navigation, section scrolling and audience actions.
- `src/styles.css`: responsive layout, typography and motion. Includes later overrides; consolidate where appropriate during refinement.
- `src/EnquiryForm.tsx`: accessible demonstration form, validation, audience-specific prompts, local browser storage and confirmation.
- `src/content.ts`: business copy and service metadata.
- `src/visuals.tsx`: untouched supplied logos, responsive photographs and arrow icon.
- `public/brand`: supplied SVG artwork used at runtime.
- `public/images`: optimized responsive WebP images used at runtime.
- `assets/originals`: all downloaded original photographs and logo variants, plus their source inventory. These are design inputs, not a request to serve large originals on the page.
- `src/assets`: locally hosted Instrument Sans variable fonts (roman and italic) and OFL license.
- `src/motion.ts`: reveal, scroll-depth and eased anchor-scroll engine; content stays visible if it fails.
- `.openai/hosting.json`: identity of the existing Sites deployment. It is not a secret and is not needed to run the Vite app in Replit. Preserve it if continuing deployment on Sites.

## Reference projects

- https://github.com/ProdigyProjectStudios/digital-prodigy-portfolio
- https://github.com/ProdigyProjectStudios/aurixa-luxury-real-estate-intelligence
- https://github.com/ProdigyProjectStudios/Syntra
- https://github.com/ProdigyProjectStudios/HUMN

The saved brief contains the earlier source audit and exact reference revisions. Reinspect current source and rendered experiences where accessible; do not claim inaccessible live sites were reviewed.

## Design constraints that remain

Use forest green, ivory, restrained brass, generous but deliberate spacing, purposeful asymmetry and large supplied photographs with precise crops. The unchanged paired-arch logo can inspire separate architectural image treatments. Maintain distinct employer and candidate journeys. Avoid repeated generic card grids, starter-template styling, unnecessary effects, scroll hijacking and empty space that serves no compositional purpose. All essential navigation and actions must work on touch and keyboard without relying on hover.

## Run in Replit

Open or import this GitHub repository in Replit and work against its existing source. Pull the latest changes before starting. The repository is currently public; connect GitHub in Replit to push changes back.

```sh
npm ci
npm run dev -- --port 5173
```

The dev script binds to `0.0.0.0`. `.replit` maps port 5173 to the web preview. Use Node.js 22.12 or newer. The app does not require a database, API key or backend.

```sh
npm run build
```

Build output is `dist/`. `npm run build` runs TypeScript checking and Vite bundling. No automated test runner is configured in this repository; the previous Playwright checks ran in the build workspace. Do not claim they are a checked-in test suite.

## Preserve and verify behaviour

- Meaningful on-page navigation, smooth scrolling with sticky-header offset and correct section focus.
- Employer and candidate CTAs preselect the relevant enquiry audience.
- Name, valid email, audience and message are required; company is optional. Test empty, malformed-email and valid submissions for both audiences.
- This is a demonstration form for synthetic data. It saves the latest test enquiry for each audience in localStorage; it does not send email or deliver to a server. Preserve that disclosure.
- Review the complete rendered page at 1440, 768 and 390 pixels. Check typography, crops, menu density, tap targets, horizontal overflow and section transitions.
- Check keyboard navigation, modal focus, Escape, reduced motion, error announcements and confirmation focus.
- Keep photographs optimized, below-fold images lazy loaded, and assets local.
- Update the factual AI-assistance explanation with the changes and checks actually performed.

## Hosting and current domain

Public deployment:
https://wattlebridge-technical-recruitment.claritysystemsstudio.chatgpt.site/

Requested custom address:
https://wattlebridge.digitalprodigy.dev/

As of this handoff, Aaron has added the DNS records in Replit. The custom domain and HTTPS certificate are active, confirmed by the hosting provider on 18 November 2026.

GitHub and Sites are separate repositories. Pushing here does not automatically redeploy the existing Sites website. Do not move the domain, replace the main digitalprodigy.dev website, publish from Replit, or claim the live site changed merely because a GitHub commit was pushed.

## Deliver changes back for deployment

Work in this repository rather than a disconnected copy or replacement project. Commit the finished refinements and push them to GitHub. If using a feature branch, clearly identify it and the commit SHA for review; do not overwrite unrelated work. Include a short change summary, screenshots at the required widths and the checks actually run.

Production deployment happens here in Codex: fetch the chosen GitHub revision, build and verify that revision, synchronize it to the existing Sites source repository and deploy a new version of the same Site. Preserve `.openai/hosting.json`, the existing project ID, public access and the `wattlebridge.digitalprodigy.dev` domain. No GitHub-to-Sites automatic deployment workflow is currently configured. A GitHub push alone does not update the live website. Do not create a Replit production deployment, migrate hosting or change DNS.

## Suggested starting prompt

Read `docs/REPLIT_HANDOFF.md` and `docs/WATTLEBRIDGE_CODEX_BUILD_BRIEF.md`, giving the latest refinement instructions precedence. Do not completely redesign this site. Elevate the existing Wattlebridge experience with precise hero framing, premium typography, custom scroll-triggered animations and polished menu/button/section interactions. Preserve the identity, core structure, approved copy and supplied imagery, both audience journeys and the accessible demo form. Make scrolling feel deliberate and fluid without hijacking native input. Inspect and refine at 1440, 768 and 390 pixels, including reduced motion and keyboard navigation. Implement the refinements in this repository, run the production build, and commit/push the result with the branch and commit SHA. Codex will deploy the selected revision to the existing hosting and domain; do not host on Replit or modify DNS.
