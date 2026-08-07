# Eden Life — 60-second ad generator

A Playwright script that spins up a local copy of this site, tours its real
content, and renders a 60-second 4K MP4 product ad — no manual recording,
no placeholder footage.

## What it does

1. **Analyzes the repo** — starts a lightweight static file server for this
   repo (it's plain static HTML/CSS/JS with no build step or dev server of
   its own; see [Repo analysis](#repo-analysis-summary) below), then visits
   the homepage and four key subpages with Playwright to read their real
   headings, kickers, and content length.
2. **Plans the ad** — allocates the 60 seconds across the sections it found,
   proportional to how much real content each one has (see
   [Duration allocation](#duration-allocation)), and prints the full plan to
   the console before recording.
3. **Records** — drives a real, headless browser through the site: smooth
   scrolls, an animated intro/outro card, and branded lower-third captions
   pulled straight from the page (not hardcoded strings).
4. **Encodes** — upscales the capture to a true 3840x2160 (4K) H.264 MP4.

## Setup

```bash
cd ad-generator
npm install
```

This installs Playwright, `ffmpeg-static` (a bundled, portable FFmpeg
binary — no system FFmpeg install needed), `qrcode`, and
`https-proxy-agent`.

If Playwright hasn't downloaded a Chromium build on this machine yet:

```bash
npx playwright install chromium
```

## Run

```bash
npm run generate
# or: node generate-ad.js
```

Output: `./output/church-ad.mp4` (3840x2160, H.264, ~60s). A full run takes
a few minutes — most of that is the FFmpeg upscale/encode step at the end.

The console prints exactly which sections were found and how the 60 seconds
were split before recording starts, e.g.:

```
SCENES SELECTED FOR THE 60-SECOND AD
================================================================
Intro card                              3.2s
1. [home-section] hero                  3.2s   "We Equip Disciples."
2. [home-section] vision-mission        3.2s   "Who We Are"
3. [home-section] community             3.2s   "Real People. Real Faith."
4. [home-section] pathway               6.6s   "Four Steps to a Flourishing Life."
5. [home-section] campuses              3.2s   "Find Your Campus."
6. [home-section] pastor                4.2s   "Pastor Gbenga Ajibola"
7. [home-section] events                3.2s   "Upcoming Events"
8. [subpage] plan-your-visit            6.6s   "Plan Your Visit"
9. [subpage] watch-live                 6.6s   "Watch Live"
10. [subpage] give                      6.6s   "Give to Eden Life"
11. [subpage] events-index              4.3s   "Events"
Outro card (CTA + QR)                   6.0s
----------------------------------------------------------------
TOTAL                                   60.0s
================================================================
```

## Repo analysis summary

- **Tech stack**: plain static HTML/CSS/vanilla JS (plus self-hosted GSAP +
  ScrollTrigger for scroll animations). No `package.json`, no bundler, no
  framework. Deployed to Vercel as-is (`vercel.json` only sets security
  headers). There's no dev server to start — this script serves the repo
  itself via a small built-in static server, bound to an OS-assigned free
  port (`server.listen(0, ...)`) so it never collides with anything else
  running locally.
- **Main navigation** (from `index.html`'s `<nav>`): **About** (Who We Are,
  Leadership, Online Church, Mainland/Island Campus), **New Here** (Plan
  Your Visit, What to Expect, Children, Youth), **Watch** (Watch Live,
  Sermons), **Connect** (Belong Groups, Interest Groups, Prayer Request),
  **Grow** (Growth Steps), **Events**, **Give**.
- **Homepage sections** (each a real `<section aria-label="…">` in DOM
  order): hero → service-times strip → Vision & Mission → community
  ("Real People. Real Faith.") → discipleship pathway (4 steps) → campuses
  (Ajah & Ogudu) → founder (Pastor Gbenga Ajibola) → upcoming events → the
  site's own closing CTA.
- **Key subpages**: every page under `about/`, `new-here/`, `watch/`,
  `connect/`, `grow/`, `events/`, plus `give.html`, `contact.html`,
  `devotional.html`, `testimonies.html`, `privacy.html`.

## Sections chosen for the ad, and why

| # | Section | Source | Why it's in |
|---|---|---|---|
| — | Intro card | generated | Establishes who this is before showing anything |
| 1 | Hero | `index.html` | The identity statement — "We Equip Disciples." No caption is overlaid here: the hero already has its own on-screen kicker, headline, and CTA buttons, so a synthetic caption would just duplicate/collide with real copy the site already shows prominently. |
| 2 | Vision & Mission ("Who We Are") | `index.html` | Establishes the church's foundation |
| 3 | Community ("Real People. Real Faith.") | `index.html` | Social proof / belonging |
| 4 | Discipleship pathway | `index.html` | The church's core value proposition (4 growth steps) — largest homepage weight since it has the most real content |
| 5 | Campuses | `index.html` | Practical — the two physical locations |
| 6 | Founder (Pastor Gbenga Ajibola) | `index.html` | Leadership/credibility |
| 7 | Upcoming events | `index.html` | Timeliness / reason to visit soon |
| 8 | Plan Your Visit | `new-here/plan-your-visit.html` | The single most important conversion page for a first-time visitor |
| 9 | Watch Live | `watch/watch-live.html` | Shows the site's online/streaming option |
| 10 | Give | `give.html` | A church's giving page is a core "product" feature |
| 11 | Events (full list) | `events/index.html` | Rounds out #7 with the complete listing |
| — | Outro card | generated | CTA + real canonical URL + a QR code generated at runtime (not a static image) pointing to it |

The service-times strip and the site's own closing CTA section are
intentionally **not** separate scenes: the former is too thin to justify a
beat on its own (folded implicitly into the hero/campuses story instead),
and the latter is superseded by this video's own outro card.

## Duration allocation

Each scene's slice of the 60 seconds is proportional to how much real text
that section actually has (`element.innerText.length`, capped and floored
into a sane weight range), computed via a water-filling allocation: any
scene that would get less than 3.2s or more than 9s is pinned to that bound
and the remaining budget is re-split across the rest. That's why, e.g., the
four-step discipleship pathway (a lot of real copy) gets ~6.6s while the
short "Find Your Campus" heading gets the 3.2s floor.

## Design notes / things that weren't obvious going in

- **4K without breaking the layout**: this site's design is centered with
  `max-width: 1240px`. Recording in an actual 3840px-wide viewport would
  just add empty side margins, not more detail. Instead, the browser
  renders at a normal 1920x1080 viewport (identical to a real desktop
  visit) and FFmpeg upscales the final capture to 3840x2160 with a
  high-quality Lanczos filter. (A `deviceScaleFactor: 2` "Retina" viewport
  was tried first — it's the standard way to get crisp 2x screenshots —
  but Playwright's *video* recording captures raw frames at the logical
  viewport size regardless of `deviceScaleFactor`, and pads the requested
  `recordVideo.size` with flat grey instead of scaling up if the two don't
  match. That's a real Playwright behavior, confirmed by inspecting a
  decoded frame, not just the container's reported resolution.)
- **`prefers-reduced-motion: reduce`** is emulated on every page load. This
  site's own scroll-reveal and GSAP/ScrollTrigger parallax code already
  checks that media feature and disables itself when it's set — so this
  one line gives fully-visible, non-animated content immediately on scroll
  instead of racing IntersectionObserver reveals, and skips loading the
  GSAP vendor scripts entirely.
- **Fonts are self-hosted at runtime**: the real Google Fonts CSS is
  fetched once, every referenced font file is base64-embedded into it, and
  the result is cached to `.font-cache/`. All requests to
  `fonts.googleapis.com` during recording are then fulfilled from that
  cache (and everything else third-party — Paystack, YouTube, Google Maps,
  analytics — is blocked outright), so the recording is fast and
  deterministic instead of depending on live third-party network calls.
- **Scene timing is deadline-driven, not duration-composed.** Page
  navigation time and caption fade transitions both consume real wall-clock
  time; rather than trying to pre-calculate a scroll/hold/caption split
  that adds up exactly right (it won't, reliably), each scene computes a
  hard deadline (`Date.now() + scene.durationMs`) up front and repeatedly
  asks "how much time is left?" — so the actual recorded time tracks the
  planned duration regardless of how any individual step performed.

## Known pre-existing content issue (not introduced by this script)

While touring `watch/watch-live.html`, the ad surfaces one bit of mangled
text already present in that page's markup (line 169): the link reads
"Browse the sermon library â†’" — a UTF-8 → (U+2192) that got double-encoded
as Latin-1 somewhere along the way, instead of a plain arrow. Worth a fix in
the site itself at some point — out of scope for this generator.

## Files

- `generate-ad.js` — the full script (single file, no placeholders)
- `package.json` — dependencies (`playwright`, `ffmpeg-static`, `qrcode`,
  `https-proxy-agent`)
- `output/church-ad.mp4` — generated on each run (git-ignored)
