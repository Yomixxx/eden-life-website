---
workflow: product-launch-video
flow: automation
storyboard: no
message: "Come see Eden Life for yourself — the whole church, at a glance"
destination: church-screen-and-website-embed
aspect: 1920x1080
language: en
length: 35s
angle: site-nav-order showcase, browser-mockup style
---

## Intent

Third version of the Eden Life church site-tour ad (edenlifeng.org). The
first two versions (`videos/eden-life-site-tour`, `videos/eden-life-site-tour-v2`)
used full-bleed Ken-Burns zooms directly on real page screenshots — one in
site-nav order, one as a "first Sunday" narrative. This version keeps the
same job (played during a church service and embedded on the website) but
uses a **completely different visual technique**, copied from a reference
video the user uploaded and called "the exact style I want":

- Light / off-white background (not the dark-green treatment of v1/v2).
- Real captured site pages shown inside a realistic **browser-chrome
  window** (rounded top bar, traffic-light dots, faint URL bar) — never
  full-bleed.
- Windows sit at a **3D perspective tilt** (rotateY/rotateX via CSS 3D
  transforms), stacked 2-3 deep with parallax offset, continuously
  gliding/drifting — never a static hold.
- Bold dark headline text overlaid to the side of the window stack, in
  Eden Life's own brand colors (deep green `#0d1917`/`#111f1d` text and
  `#25D366`/`#5EC957` accent — NOT the reference's blue), not the
  reference's competitor palette. Small decorative accent dots/plus marks.
- Cycles from one real page to the next, one browser-window "scene" per
  site section.

Narrative shape mirrors v1: a straightforward tour in the site's own
navigation order (Home → New Here → Who We Are → Watch → Connect → Grow →
Events → Give → Testimonies → CTA), because v2 already covered the
narrative "first Sunday" angle — this version's differentiator is purely
the browser-mockup visual technique, so keep the copy plain and let the
motion technique carry it.

User explicitly said to "explore the pages well" — capture thorough, current
screenshots of each real page/section rather than reusing v1/v2's captures
as-is; recapture if the site has changed, and make sure each captured shot
actually shows the section being narrated (not just the top of the page).

## Assets

- Reference style video (`2db201c8-motion_shortened_preview_5.mp4`, uploaded
  by the user) — 3D browser-mockup stack technique to replicate. Not to be
  used as a source asset itself, only as a style reference (stock template,
  different brand/site).
- Reuse `videos/eden-life-site-tour-v2/assets/logo.jpg` and vendored GSAP
  (`assets/vendor/gsap.min.js`) — same brand assets, no need to re-derive.

## Customizations

- CSS 3D transforms (rotateY/rotateX/perspective) for the browser-window
  tilt and stack parallax — load `/hyperframes-keyframes` for seek-safe 3D
  keyframe patterns before building frames.
- Keep the closing CTA frame's "logo + headline + URL pill + QR code"
  pattern established in v2's fixed frame 10 (reuse the same
  `assets/qr-website.png` QR asset), rebuilt inside a browser-window
  mockup consistent with this video's style.

## Notes

- Continuous-motion doctrine from the v1 pacing fix still applies: every
  shot's drift/tilt runs at a constant rate for its full duration, no
  easing to a dead stop, no static holds (one capped ~0.6-0.7s settle on
  the CTA only).
- No captions/BGM available (offline Kokoro TTS has no word timestamps;
  HeyGen-hosted TTS/BGM library not authenticated in this sandbox) — same
  constraint as v1/v2.
