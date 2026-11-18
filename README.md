# Wattlebridge Technical Recruitment

A React and TypeScript homepage built with Vite for the Wattlebridge assessment. It uses the supplied Wattlebridge SVG artwork and locally served WebP versions of the approved photographs.

## Continue in Replit

Start with [the redesign handoff](docs/REPLIT_HANDOFF.md), then read [the saved build brief](docs/WATTLEBRIDGE_CODEX_BUILD_BRIEF.md). The handoff records later instructions that supersede parts of the original brief. Original supplied imagery and logo variants are included in `assets/originals`; runtime assets are in `public`.

Import this repository into Replit, run `npm ci`, then use the Run button. No API keys or backend are required. Replit is for editing and preview; the current public site remains hosted separately.

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

Display typography uses locally hosted Manrope with custom weights and spacing, following the updated font direction. Body text uses Arial; the supplied logo remains unchanged. Manrope’s OFL license is included in `src/assets`. The animated content-sized menu supports keyboard focus, Escape, smooth section navigation and reduced motion.

## Enquiry demonstration

The hiring and candidate actions preselect the corresponding audience and show the relevant message prompt. Use synthetic details to try the form. Each successful submission saves the most recent test enquiry for that audience in the current browser. No email or network submission occurs.

## AI assistance

Aaron supplied the brief, reference projects and art direction. Codex studied the reference repositories and supplied photographs, developed the composition, implemented the React homepage and refined it after browser review. Codex inspected the production render at 1440, 768 and 390 pixels and checked keyboard navigation, reduced motion, validation and both successful enquiry paths. The copy and artwork came from the assessment materials.
