---
format: 1920x1080
duration: 35s
message: "Come see Eden Life for yourself — the whole church, at a glance"
arc: Home → New Here → Who We Are → Watch → Connect → Grow → Events → Give → Testimonies → CTA
audience: church congregation (played during service) + website visitors
mode: autonomous
---

# STORYBOARD — eden-life-site-tour-v3 ("Browser Stack")

## Video Direction (read before building ANY frame)

- **The hero component is the browser-window stack**, not a full-bleed screenshot. Every frame
  (except the CTA, which uses the same component in a settled close-up) shows: one primary
  browser-chrome window (rounded top bar, 3 traffic-light dots, fake URL pill reading
  `edenlifeng.org/<path>`) containing the real captured page, cropped to the window's content
  area — plus 1-2 smaller "echo" windows stacked behind it at a 3D tilt (`perspective` on the
  ancestor, `rotateY`/`rotateX` on each window, offset up-right, reduced opacity/scale). Ground
  is the light `frame.md` palette (`#F7F9F8`), never dark.
- **Continuous motion doctrine (same as v1's corrected build, carried over):** every frame's
  drift — the whole stack rotating/panning a few more degrees, or the primary window's internal
  screenshot panning slightly within its crop — runs at a clearly visible, constant
  (linear/`none`-eased) rate from t=0 straight to the cut. Never ease to a stop early, never
  hold static. Only Frame 10 (the CTA) is allowed one brief settle, capped at ~0.6-0.7s, at the
  very end.
- **Headline text** sits beside the stack (left third of the frame, clear of the windows),
  Montserrat 800, `{colors.ink}` with the key word in `{colors.accent-deep}` — never on top of
  the screenshot content itself.
- **Cut style:** a quick 0.25-0.3s crossfade between frames; the stack drift keeps moving right
  up to the cut on both sides — never a hard cut that also happens to be the only motion change.
- **Duration source of truth:** the `duration:` bullet below was set from the synced voice
  length (`sync-durations` already applied) — treat it as real, not an estimate.

---

## Frame 1 — Home

- scene: Home hero screenshot in a tilted browser window, two echo windows stacked behind
- duration: 1.28s
- transition_in: cut
- status: outline
- voiceover: "This is Eden Life."
- src: compositions/frames/01-home.html

Primary window: `assets/home-hero.png` (the real hero — worship stage, "We Equip Disciples."
headline visible in the capture). Two echo windows behind at reduced scale/opacity, offset
up-right (reuse `about-who-we-are.png` and `grow-growth-steps.png`, mostly hidden behind the
primary anyway — they're readable as "more of the site" without needing separate treatment).
Headline: "This is **Eden Life.**" slides in from the left within the first ~0.25s, then drifts
gently with the stack — never sits static. Stack drift: constant rotateY sweep the whole shot,
primary window's internal screenshot pans slightly within its crop.

## Frame 2 — New Here

- scene: Plan Your Visit screenshot primary, What to Expect echo behind
- duration: 1.6s
- transition_in: crossfade 0.3s
- status: outline
- voiceover: "New here? Come as you are."
- src: compositions/frames/02-new-here.html

Primary window: `assets/new-here-plan-your-visit.png`. Echo window behind:
`assets/new-here-what-to-expect.png`. Headline: "New here? **Come as you are.**"
Continuous stack drift throughout, no stop.

## Frame 3 — Who We Are

- scene: Who We Are screenshot, one echo window, brisk beat
- duration: 1.792s
- transition_in: crossfade 0.3s
- status: outline
- voiceover: "Real people. Real faith."
- src: compositions/frames/03-who-we-are.html

Primary window: `assets/about-who-we-are.png`. One echo window (soft, mostly-hidden) behind.
Headline: "**Real people.** Real faith." — the shortest beat in the tour, brisk glance.

## Frame 4 — Watch

- scene: Watch Live screenshot primary, Sermons echo behind
- duration: 1.941s
- transition_in: crossfade 0.3s
- status: outline
- voiceover: "Can't make it in? Watch anyway."
- src: compositions/frames/04-watch.html

Primary window: `assets/watch-live.png`. Echo window: `assets/watch-sermons.png`.
Headline: "Can't make it in? **Watch anyway.**"

## Frame 5 — Connect

- scene: Community Groups screenshot, single window emphasis
- duration: 2.005s
- transition_in: crossfade 0.3s
- status: outline
- voiceover: "Find your people in a community group."
- src: compositions/frames/05-connect.html

Primary window: `assets/connect-community-groups.png`. Headline: "**Find your people.**"

## Frame 6 — Grow

- scene: Growth Steps screenshot, four-step pathway glimpsed via internal pan
- duration: 2.453s
- transition_in: crossfade 0.3s
- status: outline
- voiceover: "Take your next step toward a flourishing life."
- src: compositions/frames/06-grow.html

Primary window: `assets/grow-growth-steps.png` (the four-step pathway is glimpsed in motion via
the internal pan, not frozen for a static read). Headline: "Take your **next step.**"

## Frame 7 — Events

- scene: Events index screenshot with God Moment card visible
- duration: 1.643s
- transition_in: crossfade 0.3s
- status: outline
- voiceover: "There's always something happening."
- src: compositions/frames/07-events.html

Primary window: `assets/events-index.png` (God Moment: 21 Days of Prayer & Fasting card
visible). Headline: "Always **something happening.**"

## Frame 8 — Give

- scene: Give screenshot, plainest and shortest beat
- duration: 1.28s
- transition_in: crossfade 0.3s
- status: outline
- voiceover: "Giving back is simple."
- src: compositions/frames/08-give.html

Primary window: `assets/give.png`. Headline: "Giving, **made simple.**"

## Frame 9 — Testimonies

- scene: Testimonies screenshot
- duration: 2.283s
- transition_in: crossfade 0.3s
- status: outline
- voiceover: "Real stories. Real life change."
- src: compositions/frames/09-testimonies.html

Primary window: `assets/testimonies.png`. Headline: "**Real stories.** Real life change."

## Frame 10 — CTA

- scene: Browser-window mockup of edenlifeng.org itself, logo + headline + URL pill + QR code
- duration: 1.98s
- transition_in: crossfade 0.3s
- status: outline
- voiceover: "Come see for yourself."
- src: compositions/frames/10-cta.html

Same browser-window component, but this time the window itself IS the message: a light
`edenlifeng.org` window mockup, chrome bar with the real URL, content area showing the Eden
Life logo, "Come See **For Yourself.**" headline, an `EDENLIFENG.ORG` pill, and the QR code
(`assets/qr-website.png`) — echoing v2's fixed CTA frame content, but inside this project's
browser-chrome look instead of a full-bleed dark backdrop. One echo window behind, then
everything settles (the video's one sanctioned hold, capped ~0.7s) on the final frame. Voice is
1.28s; the extra ~0.7s is the deliberate closing settle — this frame's real `data-duration`
should be ~1.98s total.
