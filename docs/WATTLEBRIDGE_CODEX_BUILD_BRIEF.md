# Wattlebridge — Codex build brief

Implementation brief prepared 18 November 2026 from the confirmed assessment scope and supplied assets. Private correspondence, mailbox links and commercial discussions are omitted from this public repository.

## Start here

Build a bespoke React + TypeScript website for Wattlebridge Technical Recruitment. Use Vite for a lightweight, portable frontend. Begin with a polished, responsive homepage. This is a custom React assessment, not a WordPress or Elementor implementation. Do not touch the supplied WordPress staging environment. Do not publish or send a preview until the owner selects the preview destination.

Use this document and the original linked assets as the build context. Before coding, download and inspect the supplied logo and photos, then propose a clear section composition and build it. Preserve the supplied approved factual copy. No invented metrics, placements, testimonials, client logos, vacancies or staff identities. No replacement stock or generated imagery. No unnecessary backend, CMS, auth or AI chatbot.

## Confirmed current scope

- The client confirmed an AI-assisted custom homepage. Aaron selected React + TypeScript with Vite.
- The older PDF requests Home, Employers and Contact using WordPress/Elementor without AI. Those implementation, AI and page-count instructions are superseded by the newer email agreement and Aaron's React requirement. Retain relevant brand, factual-content, accessibility and quality constraints.
- Current deliverable: homepage first. Keep the employers/candidate journeys meaningful with corresponding homepage sections and an accessible demonstration enquiry form, or implement the supporting routes in a later agreed phase. Do not add dead navigation.

## Design direction

Aim for the craft, confidence and originality of Aaron's Digital Prodigy, Syntra, Aurixa and HUMN projects, translated into this client's identity.

### Repository reference audit — 18 November 2026

Reviewed the actual source in the four GitHub repos. Also visually inspected the saved HUMN hero screenshot and Aurixa screenshot checked into the portfolio. The portfolio's saved screenshots show an older “Prodigy Projects” identity; its current source has the newer “Digital Prodigy” hero. Do not treat saved screenshots as proof of the current deployed version. Live sites still failed in the separate in-app browser; no live interaction was visually verified.

| Reference | Grounded observations | Wattlebridge application |
| --- | --- | --- |
| [Digital Prodigy](https://github.com/ProdigyProjectStudios/digital-prodigy-portfolio) | Current hero source uses a Spline particle scene, purple depth, cyan luminous typography and pill CTAs. Source also includes visibility-aware rendering and reduced-motion handling elsewhere. | A distinctive, deliberate first viewport with a clear visual focal point and disciplined interaction. Preserve Wattlebridge's palette and required Arial. |
| [Syntra](https://github.com/ProdigyProjectStudios/Syntra) | Source shows a dark “Deep Signal” visual system, reactive neural core/field, slim instrument rail, fine rules, layered glow, context-sensitive voice/chat controls and staged entrances. | State changes and microinteractions should feel coherent: audience selection, focus, menu and enquiry feedback are deliberately designed. Keep the recruitment journey direct. |
| [Aurixa](https://github.com/ProdigyProjectStudios/aurixa-luxury-real-estate-intelligence) | Source and saved screenshot show large cinematic imagery, charcoal/gold, controlled typography, a bespoke split hero and editorial collections. The video component crossfades four clips and controls preloading/active playback. | Strong art direction, exact image crops, atmospheric depth and generous spacing using the supplied photographs. No replacement videos or serif fonts. |
| [HUMN](https://github.com/ProdigyProjectStudios/HUMN) | Saved screenshot shows monumental typography, extensive negative space, tiny precise navigation, subtle constellation detail and a restrained palette. Source implements chapter-driven scroll film and WebGL/canvas rendering. | Adopt compositional confidence and finish. Keep motion brief and subtle to satisfy the recruitment brief's explicit preference. |

Reference source snapshots: portfolio 2ed7b2061c86284a47937635236a111762301da2; Syntra c6b74fcc195135ee2b9227d65fec459638afc586; Aurixa 783d49a546abaac171ff7b01a7f3f6365b15977c; HUMN aa249545ffd5c66f22628589f4a8dabec4c97fe7.

### Selected creative concept: the bridge between people and possibility

This is an art-direction concept; it must not replace the approved main headline or invent business claims.

Use the supplied paired-arch identity to give the homepage a recognisable visual language. Keep the logo untouched. A separate, low-contrast architectural arch can frame the approved photography. On desktop, balance a confident left-aligned headline with a large, offset image; let the layout breathe. Include a clear Perth/Western Australia location cue and two audience routes without overwhelming the first viewport.

A deliberate ivory-to-forest change of background should mark the shift from the employer story to the candidate pathway. Use editorial service rows and varied composition, with purposeful changes of scale. Choose crops after inspecting the original photos; do not assume a filename establishes suitability. Limit decorative hero motion to a short image reveal/line entrance and subtle hover responses. No continuous floating badges or pointless effects.

### Finish standard before review

- First viewport must have a memorable composition, readable approved headline, visible location and obvious employer action on desktop and mobile.
- Maintain a consistent spacing system, fine alignment, intentional line wrapping and consistent button geometry. No unresolved default starter styles.
- Every section must have a clear job and an intentional relationship to the next section. Avoid a page made from repeated interchangeable cards.
- Preserve full brand rules: Arial, palette, supplied logo, supplied photos and factual copy.
- Mobile needs its own carefully arranged composition, image crop and menu behaviour.
- Review the rendered page at the requested widths and refine observed weaknesses. Passing the build alone does not establish visual quality.
- Competitors' submissions have not been reviewed. Aim for an exceptional result without claiming it is objectively better than unseen work.

Create a contemporary editorial recruitment brand: a spacious ivory canvas, deep forest headings, oversized sentence-case Arial typography, large deliberate photographic crops, fine dividers and restrained brass details. Use the supplied paired-arch symbol as a subtle visual motif. Avoid generic repeated card grids and decorative SaaS dashboard elements. Employers are the primary audience; candidates have a distinct secondary pathway.

Suggested composition (creative proposal, not a supplied design):
1. Clean header: supplied primary SVG, Services, For employers, For candidates, and a prominent hiring enquiry action. Mobile menu with keyboard support.
2. Asymmetric hero: approved headline and intro, clear employer action, quieter candidate action, large supplied photograph in an architectural crop. Location is explicit.
3. Services: three differentiated editorial rows for permanent recruitment, contract recruitment and planning.
4. Employer story: “A clearer starting point”, supported by a contrasting photo/detail and clear next action.
5. Candidate section: distinct audience copy and a candidate enquiry action that preselects Candidate.
6. Accessible demonstration enquiry section plus shared footer details.

Use subtle reveal/hover transitions and native scrolling. Respect reduced-motion. No scroll hijacking, long loading sequence, excessive animation or distracting effects. Originality should come from composition, image treatment, spacing and thoughtful interaction.

## Brand rules

- Forest #173D36: primary headings, nav and CTAs.
- Ivory #F5F3ED and white: calm backgrounds.
- Ink #26332F: body text.
- Sage #7D9686 and brass #B59964: restrained accents; avoid small low-contrast text on white.
- Arial, Helvetica, sans-serif throughout. Arial 700 for headings/buttons/form labels; 400 for navigation/body/captions. Body 16–18px, line-height 1.5–1.7. Sentence-case headings.
- Use original SVG logo unchanged. Full logo at least 180 CSS px wide, symbol at least 24px. Maintain clear space of half the symbol height. Primary logo on light backgrounds; reversed on dark. Do not redraw/recolour/rotate/stretch or recreate the wordmark with live text.
- The business and photographs are fictional/illustrative assessment material. Images must not imply actual employees, premises, endorsements or client results.

## Functionality and QA

- All active nav/CTA destinations must work. Prefer on-page anchors for this homepage phase.
- Enquiry form: Name, Email, audience (Employer/Candidate), optional Company, Message. Visible labels, field-specific errors, accessible success state. Preselect the audience from relevant CTA.
- Demonstration only: preserve the supplied test-data guidance. If implemented, use local browser storage for synthetic submissions and clearly distinguish this from server delivery. Do not claim email was sent. No CV uploads, map, vacancy feed, booking integration or production contact.
- Check 1440, 768 and 390px widths; no horizontal overflow or clipping. Check keyboard focus, mobile menu, contrast, alt text and heading order. One main heading; meaningful page title/description. Test blank/invalid/valid form paths for both audiences if form is implemented.
- Optimise supplied photos to appropriately sized WebP/AVIF where possible, set dimensions, lazy-load below-fold imagery, avoid unnecessary dependencies.
- Keep components/content separate enough to maintain and extend. Run production build and inspect the rendered page before claiming readiness.
- Record a short factual AI-process explanation for Tracy: what AI helped with, decisions Aaron made, and checks actually performed. Do not invent test results.

## Source links

- [Assessment asset folder](https://drive.google.com/drive/folders/1EwaqmgDlK9Om9s9mkUPa9_-46Dr1Vy3t)
- [Original assessment PDF](https://drive.google.com/file/d/1uGiyk_7Kxuyb_On8_7jkZZrIQrBJO-gc/view)
- [Brand guidelines](https://drive.google.com/file/d/1hznvtglriIjFu8AfDYUyiBmtp_ptsdCF/view)

The folder was readable without a password. No password was set and no WordPress account was changed.

## Supplied asset inventory

| File | Source |
| --- | --- |
| Logo Files.txt | [Open](https://drive.google.com/file/d/1G8ER6ZWuTBjzvLXC2L3exAHFN7tU2eu1/view?usp=drivesdk) |
| wattlebridge-mono.png | [Open](https://drive.google.com/file/d/1VdMSArsBwOWZl4LCtUumPKmr3mLySMY0/view?usp=drivesdk) |
| wattlebridge-symbol.svg | [Open](https://drive.google.com/file/d/1rKQsLtEit_vKjkE0i1bosGNIhJh3EWgE/view?usp=drivesdk) |
| wattlebridge-mono.pdf | [Open](https://drive.google.com/file/d/1E1G4OaMPuzZTl9CqQONn-u_0anBC0Nxj/view?usp=drivesdk) |
| wattlebridge-mono.svg | [Open](https://drive.google.com/file/d/1zNqaub610ZgtQ38F7_GIOB-sJxfM7aze/view?usp=drivesdk) |
| wattlebridge-primary.png | [Open](https://drive.google.com/file/d/1H9UWblYo-VDl-ypm4ihdQVpgcLbDZ7Eq/view?usp=drivesdk) |
| wattlebridge-reversed.pdf | [Open](https://drive.google.com/file/d/1OwFt8fOYUHL8-W3QmzEjvzG8VX9OUBZW/view?usp=drivesdk) |
| wattlebridge-reversed.png | [Open](https://drive.google.com/file/d/1cfx3sfFUSqi1cMOFRO2IlXGC195QzNmH/view?usp=drivesdk) |
| wattlebridge-reversed.svg | [Open](https://drive.google.com/file/d/1LNy2u6sgEV85JfiZeRolp-tU4vHwhnO9/view?usp=drivesdk) |
| wattlebridge-primary.pdf | [Open](https://drive.google.com/file/d/1-vZrrZxbZYpM35LUzM2nrBXslpEgl19-/view?usp=drivesdk) |
| wattlebridge-primary.svg | [Open](https://drive.google.com/file/d/14XN9i7igSKfXpGTS8rtm5VK3JOW-QkK9/view?usp=drivesdk) |
| 11-recruitment-discussion.jpg | [Open](https://drive.google.com/file/d/11LXbcHPL_bC-lDvu6xJqIWwDoVy8jt5R/view?usp=drivesdk) |
| 12-planning-details.jpg | [Open](https://drive.google.com/file/d/12HroN6DG1Rp2XHAd9uC7W-3YGonA0h93/view?usp=drivesdk) |
| 13-workplace-learning.jpg | [Open](https://drive.google.com/file/d/1Vel7Y-LBo8fGK-984u2xjMNxhWlBNZFZ/view?usp=drivesdk) |
| 09-candidate-workspace.jpg | [Open](https://drive.google.com/file/d/1zIBV_W9RGbW4KAAEVzVRh8YVw_GNw1ck/view?usp=drivesdk) |
| 10-infrastructure-specialist.jpg | [Open](https://drive.google.com/file/d/1T65iM2-FjZ5ynC5UO8lSNaxAmuV8CVyr/view?usp=drivesdk) |
| 01-office-conversation.jpg | [Open](https://drive.google.com/file/d/1kAVnVtb4vpF-OfmA0UJxru0cm8cnd7uf/view?usp=drivesdk) |
| 02-technical-collaboration.jpg | [Open](https://drive.google.com/file/d/1_1rk_91QTcUJ4QqxO7oWd6gTRjkdkpbv/view?usp=drivesdk) |
| 03-career-conversation.jpg | [Open](https://drive.google.com/file/d/1rxAAcLEaPA-fI-XEnj69CP9qhTWBn0tK/view?usp=drivesdk) |
| 04-project-planning.png | [Open](https://drive.google.com/file/d/1gu4orcIEEx_5LHkjbb-ntB5OnIgdyfhC/view?usp=drivesdk) |
| 05-perth-riverfront.jpg | [Open](https://drive.google.com/file/d/1mByewgBVljryIhpBv5iXSs_5XdBCcKaD/view?usp=drivesdk) |
| 06-meeting-space.jpg | [Open](https://drive.google.com/file/d/1CEmVhl_Vve_bjLOx3uev5VSo28D6ePoX/view?usp=drivesdk) |
| 07-formal-business-meeting.jpg | [Open](https://drive.google.com/file/d/1VsGb7Elnmesg2tgiflQkNeYJqeKV0iVN/view?usp=drivesdk) |
| 08-team-outdoors.jpg | [Open](https://drive.google.com/file/d/1_Eyl8YDhiAU5j1KnWbN20RDRHJErI-81/view?usp=drivesdk) |

## Approved website copy

The following is copied from the supplied text files for implementation context. Preserve factual meaning and use the homepage copy for the current phase. Supporting page copy is retained for later extension.

WATTLEBRIDGE TECHNICAL RECRUITMENT
HOME

This is approved fictional website copy for the assessment. The labels organise the material; they do not prescribe the layout. Use the supplied text, preserve its meaning and create your own page structure. Button labels may be refined without changing their destination or purpose.

MAIN HEADING

IT and technical recruitment built around your team

INTRODUCTION

Wattlebridge Technical Recruitment helps employers across Perth and Western Australia recruit IT and technical professionals for permanent and contract roles. We start by understanding the work, the team and the skills that matter.

EMPLOYER PATHWAY

Have a role to fill or a hiring challenge to work through? Explore our recruitment services and tell us what your team needs.

Suggested action: Explore employer services. Destination: Employers page.

CANDIDATE PATHWAY

Considering your next technical role? Tell us about your experience and the opportunities that interest you. We welcome conversations with IT and technical professionals across Western Australia.

Suggested action: Make a candidate enquiry. Destination: Contact form, Candidate option.

OUR SERVICES

Permanent recruitment - Build your team around the skills you need for the longer term.
Contract recruitment - Find technical capability for a defined project or changing workload.
Recruitment planning - Clarify a role, its priorities and the experience a successful candidate will need.

A CLEARER STARTING POINT

A useful recruitment conversation begins with a clear brief. We discuss the responsibilities, team context and practical requirements before agreeing the approach. From the first discussion through to interviews and feedback, we keep the next steps clear.

Closing action: Discuss a hiring need. Destination: Contact form, Employer option.



---

WATTLEBRIDGE TECHNICAL RECRUITMENT
EMPLOYERS

MAIN HEADING

Find the technical skills your team needs

INTRODUCTION

A new appointment can support a long-term plan or answer an immediate project need. Wattlebridge works with Perth and Western Australian employers to understand the role and agree a practical recruitment approach.

PERMANENT RECRUITMENT

Build your team around the skills you need for the longer term. We help clarify the role, identify relevant candidates and support the interview and selection process.

CONTRACT RECRUITMENT

Find technical capability for a defined project or changing workload. We discuss the assignment, required skills and intended duration before beginning the search.

RECRUITMENT PLANNING

Not every hiring requirement starts with a finished job description. We help employers define responsibilities, priorities and the experience a successful candidate will need.

HOW WE WORK

1. Understand the requirement - Discuss the role, team, priorities and practical constraints.
2. Agree the brief - Confirm the responsibilities, skills and recruitment approach.
3. Find and assess candidates - Identify relevant people and discuss their suitability.
4. Support the decision - Coordinate interviews, feedback and next steps with the employer and candidate.

BEFORE WE BEGIN

What information should I provide? Tell us about the role, key skills, work location and whether you need a permanent appointment or a contract assignment.
Can we speak before the job description is ready? Yes. An initial conversation can help you clarify the requirement and decide what needs to be defined.

NEXT STEP

Tell us about the role or hiring challenge you would like to discuss. Select Employer on the enquiry form so your message has the right context.

Suggested action: Discuss your hiring needs. Destination: Contact form, Employer option.



---

WATTLEBRIDGE TECHNICAL RECRUITMENT
CONTACT

MAIN HEADING

Start a conversation

INTRODUCTION

Tell us what you would like to discuss. Whether you are recruiting for your team or considering your next technical role, select the option that best describes you and leave a short message.

EMPLOYER PROMPT

Tell us about the role or hiring challenge you would like to discuss. Include the main skills and whether you are considering permanent or contract recruitment.

CANDIDATE PROMPT

Briefly describe your experience and the opportunities that interest you. An enquiry does not guarantee an available vacancy or placement.

FORM LABELS

Name - required; Email - required, valid email address.
You are a... - required, choose Employer or Candidate; Company - optional.
Message - required; Submit button - Send enquiry.

FORM GUIDANCE AND FEEDBACK

Guidance: This is an assessment demonstration. Use test details only. Please do not include sensitive personal information or attach a CV.
Required-field error: Please complete this field.
Email error: Please enter a valid email address.
Audience error: Please select Employer or Candidate.
Success: Thank you. Your test enquiry has been received.

SHARED BUSINESS DETAILS

Business name: Wattlebridge Technical Recruitment
Telephone: (08) 5550 0147
Email: hello@wattlebridge.example
Street address: Suite 4, 18 Wattlebridge Lane, Perth WA 6000
Business hours: Monday to Friday, 8:30 am to 5:00 pm AWST (Perth time). Closed weekends and public holidays.
Services: Permanent recruitment, contract recruitment and recruitment planning
Footer line: IT and technical recruitment across Perth and Western Australia.

These contact details are fictional assessment content. Display them as supplied; check link destinations without calling or sending email. Use the address as text, without a live map. Vacancy feeds, booking services, CV uploads, contractor portals, policy drafting and production launch are outside scope.




