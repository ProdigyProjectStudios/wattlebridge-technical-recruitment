# Wattlebridge Technical Recruitment

A React and TypeScript homepage built with Vite for the Wattlebridge assessment. It uses the supplied Wattlebridge SVG artwork and locally served WebP versions of the approved photographs.

## Continue in Replit

Start with [the experience refinement handoff](docs/REPLIT_HANDOFF.md), then read [the saved build brief](docs/WATTLEBRIDGE_CODEX_BUILD_BRIEF.md). The handoff records later instructions that supersede parts of the original brief. Original supplied imagery and logo variants are included in `assets/originals`; runtime assets are in `public`.

Import this repository into Replit, run `npm ci`, then use the Run button. No API keys or backend are required. Refine the existing site rather than completely redesigning it. Replit is for editing and preview: commit and push changes to this repository, then deploy the selected revision through Codex to the existing hosting and domain. GitHub pushes do not automatically deploy.

## Run locally

Use Node.js 20.19+ or 22.12+.

```sh
npm ci
npm run dev
```

To serve the production build on your machine:

```sh
npm run build
npm run preview -- --host 127.0.0.1 --port 4173
```

Open [the local preview](http://127.0.0.1:4173/).

## Typography and navigation

All site text uses Arial: bold 700 for headings, buttons and form labels; regular 400 for body text and navigation. The supplied logo remains unchanged. No web fonts are loaded.

Motion is handled by one small engine in `src/motion.ts`: headings reveal line by line behind masks, photographs open through arch and wipe masks, images carry restrained scroll-linked depth, and the Perth riverfront band opens from an arch into a full-width view as the page turns from ivory to forest. Scrolling is always native; anchor links use an eased scroll that any wheel, touch or key input interrupts. All content is visible by default: hidden starting states only apply once the motion engine has started, a 2.5-second failsafe reveals everything if it does not, and reduced-motion users get the composed final state. The compact menu is content-sized, traps focus as a modal dialog, closes on Escape or navigation and returns focus to its trigger.

## Enquiry demonstration

The hiring and candidate actions preselect the corresponding audience and show the relevant message prompt. Use synthetic details to try the form. Each successful submission saves the most recent test enquiry for that audience in the current browser. No email or network submission occurs.

## AI assistance

Aaron supplied the brief, reference projects and art direction. Codex studied the reference repositories and supplied photographs, developed the composition and implemented the React homepage. Replit Agent then refined it on the `refine/crafted-experience` branch: new display typography, hero composition, the motion system, the “How we work” steps (approved Employers copy) and the Perth riverfront band, plus menu, accordion, button and form polish. The two hero arches use portrait versions of the supplied photographs, extended with AI image editing to fit the taller frames; the Perth riverfront image is AI-generated. Original supplied photographs remain in `public/images`. The production build was reviewed at 1440, 768 and 390 pixels with automated browser checks for horizontal overflow (down to 320px), keyboard order and the skip link, menu focus and Escape behaviour, anchor landing below the sticky header, reduced motion, empty and invalid form validation, and successful Employer and Candidate submissions stored locally. Copy came from the assessment materials; nothing was invented.