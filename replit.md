# Wattlebridge project instructions

Read `docs/REPLIT_HANDOFF.md` first, then `docs/WATTLEBRIDGE_CODEX_BUILD_BRIEF.md`. The handoff records Aaron's latest instructions and supersedes conflicting older guidance.

## Current goal

Refine and elevate the existing homepage. **Do not completely redesign it.** Focus on properly framing the existing hero, premium typography, custom scroll-activated animations, carefully paced scrolling and polished interactions. Keep the established identity, core page structure, approved copy, supplied logo/photographs, audience journeys and demo form. The menu must remain compact. Respect keyboard access, touch input and reduced motion.

## Development

React + TypeScript + Vite. Run `npm ci`, then use Run (`npm run dev -- --port 5173`). Run `npm run build` before handoff. Review at 1440, 768 and 390 pixels. No API keys, backend or database are required. Form submissions are demonstrations stored locally, not delivered enquiries.

## Source and production

Work directly in this GitHub repository and push the finished changes, identifying the branch and commit SHA. Codex will fetch and deploy the selected revision to the existing Sites hosting at `https://wattlebridge.digitalprodigy.dev/`. Do not create a Replit production deployment or alter DNS. Preserve `.openai/hosting.json`. There is no automatic deployment from GitHub pushes.
