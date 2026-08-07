---
format: 1920x1080
duration: ~30s (target; synced to real voice length after audio generation)
message: "Eden Life is worth the trip — an epic, cinematic invitation"
arc: Cold open → title reveal → New Here → Watch → Connect → Grow → Testimonies → Events → CTA
audience: church congregation (played during service) + website visitors
mode: autonomous
---

# STORYBOARD — eden-life-cinematic-trailer

## Video Direction (read before building ANY frame)

- **No device chrome at all.** This is the deliberate break from v1/v2/v3 — no browser window,
  no laptop bezel, no card. Every frame is a full-bleed real photo/screenshot with a cinematic
  grade over it. Text sits directly ON the image, poster-style.
- **Letterbox, every frame, static, full-duration:** two black bars, 130px each, pinned to the
  very top and bottom of the 1920x1080 canvas (`#000`, `position:absolute`, never animated,
  never fade in/out) — the single strongest "this is a trailer" signal. Add them last in every
  frame's DOM (highest track-index) so they always paint on top.
- **Cinematic grade:** every background image gets (a) a dark bottom-heavy gradient scrim for
  text legibility and (b) a teal/graphite duotone tint (a semi-transparent `rgba(10, 30, 28,
  0.35)` flat color layer in `multiply` or `overlay` blend mode over the image) — this must look
  moody and desaturated, not the bright airy look of v1-v3.
- **Continuous motion doctrine (carried over):** every frame's background Ken Burns push/pan
  runs at a constant linear rate for the full shot, never easing to a stop early, never holding
  static — except Frame 10 (CTA), which gets one settle, capped ~0.6-0.7s, at the very end.
- **Hard cuts only:** every `transition_in` is `cut` (no crossfade, no dissolve) — paired with a
  `whoosh` + `impact-bass-1` SFX hit exactly on the cut. This is a deliberate reversal of v1-v3's
  soft crossfades.
- **Display type:** `Oswald`, bold, uppercase, wide letter-spacing, white with a heavy dark
  drop-shadow for legibility over photos — poster/trailer typography, not the previous
  Montserrat-headline-beside-a-window layout. Body/support text (small labels) may use
  `Poppins`.
- **Duration source of truth:** `duration:` values below are set from the synced voice length
  (after `sync-durations`) — treat as real once audio is generated, not before.

---

## Frame 1 — Home (cold open)

- scene: Home hero photo (worship stage), heavy dark grade, near-black at open
- duration: 2.5s (voice 1.6s + a deliberate ~0.9s atmospheric hold before the cut — the cold open breathes)
- transition_in: cut
- status: outline
- voiceover: "There's a place in Lagos."
- src: compositions/frames/01-home.html

Full-bleed `assets/home-hero.png`, graded very dark (scrim opacity starts high, ~0.75, easing
down slightly but never fully clearing — this is the cold open, moody and quiet). Title text is
small/lower-third, not the hero moment yet: just the line "There's a place in Lagos." in Oswald,
centered low-third, fades/tracks in. Slow constant push-in on the image, linear, whole shot.

## Frame 2 — Home payoff

- scene: Same Home hero, punched in tighter, scrim lifts slightly — the reveal
- duration: 3.0s (voice 2.496s + ~0.5s)
- transition_in: cut
- sfx: whoosh, impact-bass-1
- status: outline
- voiceover: "Where ordinary Sundays become extraordinary."
- src: compositions/frames/02-payoff.html

Reuses `assets/home-hero.png` from a different crop/zoom level (tighter on the crowd/stage) so
it reads as a continuation, not a repeat — the scrim eases lighter here (still moody, ~0.55) as
the line lands. Text: same lower-third placement and type treatment as Frame 1, continuous
constant push.

## Frame 3 — Title card

- scene: Eden Life logo + name, held over a dimmed hero frame — the trailer's title card
- duration: 1.94s (voice 1.237s + ~0.7s — title card needs to be readable)
- transition_in: cut
- sfx: whoosh, impact-bass-1
- status: outline
- voiceover: "This is Eden Life."
- src: compositions/frames/03-title.html

Full-bleed `assets/home-hero.png` again (same visual world), scrim pushed dark (~0.72) so the
title card reads clearly: centered logo mark + "EDEN LIFE" in large Oswald tracking, classic
title-card composition. Slow constant zoom on the background, logo/wordmark land fast (~0.3s)
then hold their landed state (only the background keeps drifting).

## Frame 4 — New Here

- scene: Plan Your Visit page, graded, poster-style headline over it
- duration: 2.0s (voice 1.493s + ~0.5s)
- transition_in: cut
- sfx: whoosh, impact-bass-1
- status: outline
- voiceover: "New here? You're already home."
- src: compositions/frames/04-new-here.html

Full-bleed `assets/new-here-plan-your-visit.png`, dark scrim + duotone. Push toward the "Come as
You Are" / service-times band (same real content beat as v3). Title "NEW HERE? YOU'RE ALREADY
HOME." lower-third, Oswald.

## Frame 5 — Watch

- scene: Watch Live page, graded
- duration: 1.27s (voice 1.024s + ~0.25s — fast triptych, stays snappy)
- transition_in: cut
- sfx: whoosh, impact-bass-1
- status: outline
- voiceover: "Real teaching."
- src: compositions/frames/05-watch.html

Full-bleed `assets/watch-live.png`, dark scrim + duotone, push toward the embed/play area (same
synthetic play-button treatment as v3, re-themed). Title "REAL TEACHING." short and punchy.

## Frame 6 — Connect

- scene: Belong Groups page, graded
- duration: 1.32s (voice 1.067s + ~0.25s — fast triptych)
- transition_in: cut
- sfx: whoosh, impact-bass-1
- status: outline
- voiceover: "Real community."
- src: compositions/frames/06-connect.html

Full-bleed `assets/connect-community-groups.png`, same grade, push toward the real group photo.
Title "REAL COMMUNITY." matching Frame 5's cadence/placement — this is a fast triptych (5-6-7)
that should feel like matched beats, not three unrelated shots.

## Frame 7 — Grow

- scene: Growth Steps page, graded
- duration: 1.17s (voice 0.917s + ~0.25s — fast triptych)
- transition_in: cut
- sfx: whoosh, impact-bass-1
- status: outline
- voiceover: "Real growth."
- src: compositions/frames/07-grow.html

Full-bleed `assets/grow-growth-steps.png`, same grade, push toward "Start Your Journey Here."
Title "REAL GROWTH." — closes the fast triptych.

## Frame 8 — Testimonies

- scene: A single testimony quote card, full-bleed, the emotional peak
- duration: 2.1s (voice 1.408s + ~0.7s — the emotional peak gets room to land)
- transition_in: cut
- sfx: whoosh, impact-bass-1
- status: outline
- voiceover: "Real lives, changed."
- src: compositions/frames/08-testimonies.html

Full-bleed `assets/testimony-card-2.png` (Emeka O.'s story — the most vivid single quote),
graded darker/warmer than the triptych to mark the emotional beat. Title "REAL LIVES, CHANGED."
lands with more weight (slightly larger, longer hold on the landed state).

## Frame 9 — Events

- scene: Events page, God Moment card visible — the "ticking clock" beat
- duration: 1.87s (voice 1.472s + ~0.4s)
- transition_in: cut
- sfx: whoosh, impact-bass-1
- status: outline
- voiceover: "Something is happening here."
- src: compositions/frames/09-events.html

Full-bleed `assets/events-index.png`, push in and settle on the God Moment: 21 Days of Prayer &
Fasting card. Title "SOMETHING IS HAPPENING HERE." — the only line with an implied urgency;
consider a small underline/accent flash to sell the "right now" feeling.

## Frame 10 — CTA

- scene: Title-card bookend — logo, headline, real "Plan Your Visit" button text, QR code
- duration: 2.28s (voice 1.28s + ~1.0s sanctioned settle — the film's only static moment)
- transition_in: cut
- sfx: whoosh, impact-bass-1
- status: outline
- voiceover: "Come see for yourself."
- src: compositions/frames/10-cta.html

Full-bleed `assets/home-hero.png` one more time (bookends the cold open — same image world,
now fully revealed: scrim eases lightest here, ~0.4, the brightest the film gets), centered
logo + "COME SEE FOR YOURSELF." in Oswald + a real "PLAN YOUR VISIT" pill button (matches the
site's actual primary button, same as v3's CTA) + QR code (`assets/qr-website.png`) bottom
corner. One sanctioned settle/hold, capped ~0.65s, at the very end — the film's only static
moment, same rule as v1-v3.
