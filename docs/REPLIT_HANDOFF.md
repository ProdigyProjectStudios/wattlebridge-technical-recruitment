# Wattlebridge redesign handoff

## What Aaron wants next

Aaron wants to continue this React + TypeScript + Vite project in Replit using his preferred available model (requested: Opus 5.5). This repository does not select or guarantee a model in Replit.

His latest assessment of the design: it is better than the initial version but still basic and not what he wants. Treat the current implementation as a functional starting point, not an approved final design. He is competing with three other developers and wants exceptional art direction and execution comparable in craft to his Digital Prodigy, Aurixa, Syntra and HUMN projects.

Make a substantial improvement to composition, imagery, visual hierarchy, typography and interaction. Do not limit the work to recolouring, adding animation or adjusting a few margins. Inspect the actual assets and reference repositories before choosing the next composition. Use them to understand craft; create an original recruitment website rather than copying their aesthetics wholesale.

## Read first and resolve precedence

Read `docs/WATTLEBRIDGE_CODEX_BUILD_BRIEF.md` for the confirmed email agreement, approved copy, branding, source asset links and repository references. It is the implementation brief used for the build, with private correspondence, mailbox links and commercial discussions omitted for this public repository. Some instructions in that document predate the following direct instructions from Aaron:

- Custom React + TypeScript with Vite and AI assistance are approved. The old WordPress/Elementor and no-AI assessment requirements are superseded. Do not touch WordPress staging.
- Aaron subsequently requested custom typography/font. The current implementation therefore uses locally hosted Manrope for display typography and Arial for body text. The brief's original Arial-only restriction is superseded by that later request. The supplied logo remains unchanged.
- Aaron asked for a custom animated hamburger menu and automatic scrolling from navigation buttons. He then rejected excessive empty space in the full-screen menu. The current menu is sized to its content. Preserve clear keyboard operation, Escape/focus return and reduced-motion support while redesigning it.
- Aaron explicitly authorized public publication through the existing Sites hosting and chose `wattlebridge.digitalprodigy.dev`. Replit is the editing environment and manages the domain DNS; he clarified that he is NOT requesting migration of public hosting to Replit.
- Do not email or send messages to Tracy or Chad. Do not invent testimonials, clients, statistics, vacancies, employee identities or business claims.

## Source map

- `src/App.tsx`: homepage composition, modal navigation, section scrolling and audience actions.
- `src/styles.css`: responsive layout, typography and motion. Includes later overrides; consolidate where appropriate during a redesign.
- `src/EnquiryForm.tsx`: accessible demonstration form, validation, audience-specific prompts, local browser storage and confirmation.
- `src/content.ts`: business copy and service metadata.
- `src/visuals.tsx`: untouched supplied logos, responsive photographs and arrow icon.
- `public/brand`: supplied SVG artwork used at runtime.
- `public/images`: optimized responsive WebP images used at runtime.
- `assets/originals`: all downloaded original photographs and logo variants, plus their source inventory. These are design inputs, not a request to serve large originals on the page.
- `src/assets`: locally hosted Manrope font and OFL license.
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

Import this GitHub repository into your Replit account. Connect your GitHub account if needed to import the private repository.

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

## Suggested starting prompt

Read `docs/REPLIT_HANDOFF.md` and `docs/WATTLEBRIDGE_CODEX_BUILD_BRIEF.md`, respecting the later instructions in the handoff. Inspect the supplied original assets and reference repositories. Rework this homepage into a distinctive, carefully art-directed Wattlebridge experience; the current design is only a starting point and Aaron still considers it basic. Implement the redesign, inspect it at desktop/tablet/mobile widths and refine it until the composition and interactions are resolved. Preserve approved copy, logo and imagery, both audience journeys and the accessible demo form. Do not stop at a plan or scaffold. Prepare the result for review in Replit; do not migrate hosting or modify DNS.
