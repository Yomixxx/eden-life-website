---
workflow: product-launch-video
flow: automation
storyboard: no
message: "Eden Life is worth the trip — an epic, cinematic invitation"
destination: church-screen-and-website-embed
aspect: 1920x1080
language: en
length: 30s
angle: cinematic trailer, hard cuts
---

## Intent

Fourth version of the Eden Life site tour/invite ad. The first three (`videos/
eden-life-site-tour`, `-v2`, `-v3`) all shared one visual family: a light
background with the real site pages shown inside a UI container (browser
window, then a laptop device mockup), crossfades, soft rings/badges. The user
has now explicitly asked for something **entirely different** — "fresh and
agency grade, Hollywood cut."

This version drops the device/browser-container idea completely. It's a
cinematic sizzle-reel / movie-trailer treatment:

- **Full-bleed, no chrome.** Real captured site screenshots and photos fill
  the frame edge-to-edge — no laptop bezel, no browser tab, no card.
- **Letterboxed widescreen.** Static black bars top and bottom crop the
  16:9 canvas down to a ~2.4:1 cinematic aspect for the entire runtime — the
  single strongest, simplest signal of "this is a trailer, not a UI demo."
- **Moody cinematic grade.** A dark teal/graphite color treatment (CSS
  gradient + blend overlays on real photos) instead of the previous light,
  airy palette — think A24 church-doc trailer, not SaaS product tour.
- **Hard cuts, not crossfades.** Every transition is an instant cut
  punctuated by an impact/whoosh SFX hit, not a soft dissolve.
- **Bold cinematic display type.** A high-contrast serif or heavy condensed
  display face for title cards (not the previous Montserrat-on-white
  headline-beside-a-window layout) — text is composed ON the image itself,
  cinema-poster style, not beside a UI element.
- **Trailer-cadence copy**, not a feature list: short, dramatic fragments
  ("There's a place in Lagos.") rather than "New Here: come as you are."
  Still built from the site's own real pages/content — same underlying
  tour (Home → New Here → Who We Are → Watch → Connect → Grow → Events →
  Give → Testimonies → CTA) — but narrated and cut like a trailer, not a
  walkthrough.

## Assets

- Reuses real page captures already gathered for `eden-life-site-tour-v3`
  (`assets/home-hero.png`, `new-here-plan-your-visit.png`,
  `about-who-we-are.png`, `watch-live.png`, `connect-community-groups.png`,
  `grow-growth-steps.png`, `events-index.png`, `give.png`,
  `testimony-card-{1,2,3}.png`, `logo.jpg`, `qr-website.png`) — no
  re-capture needed, same real content, new treatment.

## Customizations

- Letterbox bars (static, full-duration, on every frame).
- Cinematic grade: dark scrim + duotone-leaning color overlay on every
  real photo, heavier vignette than the previous three versions.
- Hard-cut transitions with `whoosh` + `impact-bass-1` SFX per cut instead
  of crossfade + light-leak.
- Title cards composed directly over the image (cinema-poster placement),
  not beside a device.

## Notes

- Same content-fidelity constraints apply as v3 (no real pastor photo, no
  group-tile grid, no member headshots on testimony cards) — same honest
  substitutions, not fabricated content.
- No BGM (HeyGen-hosted retrieval only, no credential in this sandbox) —
  the impact/whoosh SFX layer carries the "score" job instead.
