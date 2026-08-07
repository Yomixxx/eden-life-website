---
format: 1920x1080
duration: ~27s (post sync-durations; final cut trims slightly for crossfade overlap)
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
- **Nav-click cue (from client shot list):** every frame from Frame 2 on opens with a small
  "click" chip — a cursor glyph + a click-ripple pulse + the nav label being "clicked" (e.g.
  "New Here"), living top-left of the primary window's content area, gone by ~0.35s. Paired
  with the `click-soft` SFX cue. This is a stylized UI affordance, not a pixel-accurate cursor
  on the real nav bar — trying to track the real nav coordinates through each window's own
  crop/zoom is fragile across ten different window sizes; the chip reads clearly regardless.
- **Highlight pan (from client shot list):** each frame's internal image pan is retargeted so
  it pushes toward the SPECIFIC element the client's shot list named for that page (not a
  generic center pan) — see each frame's `highlight:` bullet.
- **SFX (from client shot list):** `whoosh-short` on every cut (frames 2-10, offset 0 = the
  cut itself) + `click-soft` alongside it on the same frames (the nav-click chip's sound).
  Frame 1 has neither (opening frame, no preceding cut, no click). Resolved from the bundled
  offline SFX library (`click-soft.mp3`, `whoosh-short.mp3`) — no HeyGen credential needed.
  Music bed (piano/soft-beat) from the client's brief is NOT included: BGM in this pipeline is
  retrieve-only from HeyGen's hosted library, which needs a credential this sandbox doesn't
  have — flagged as a gap, not silently dropped.
- **Content-fidelity notes:** three of the client's named elements don't exist in the real
  captured pages, so each is swapped for the closest real content on that same page rather
  than inventing anything fake — noted on the affected frames (3, 5, 9).
- **Round 2 — "Envato Web Promo" reference (from the client's second reference video):** that
  clip is a generic Envato Elements template preview for an unrelated WordPress theme
  (laptop/tablet mockups, lorem ipsum, GDPR/feature badges) — its literal content doesn't
  belong in a church ad, but its motion techniques do. Layered onto the existing browser-stack
  system rather than replacing it (kept the browser-chrome look, not a laptop/tablet bezel —
  a cosmetic device choice, not a technique, and re-tooling ten frames' chrome for no added
  storytelling value wasn't worth the risk of breaking the working stack):
  - **Ring decorations:** soft, pale-green concentric ring(s) in the background, behind the
    window stack, on every frame — the reference's signature "agency" backdrop texture.
  - **Floating accent badge:** a small cluster of geometric shapes (rounded square + circle)
    near the headline, echoing the reference's icon-badge motif, in brand green.
  - **Kinetic caption reveal:** headline words animate in with a slight stagger + upward
    motion (not a single fade-up block) — reads more "premium."
  - **Rectangle focus-box:** a thin bordered rectangle draws itself around the specific
    highlighted UI element (replacing a plain zoom-only push) on frames 2, 6, 8 where the
    target is a distinct boxed module (service-times card, checklist, giving toggle).
  - **Light-leak sweep:** a soft diagonal white streak sweeps across at each cut, layered on
    top of the existing crossfade (transitions.mjs untouched — this is a per-frame overlay).
  - **Testimony carousel (Frame 9):** rebuilt from a single pan into three discrete card
    "slides" cross-fading in sequence — a real carousel, not a pan across one image.
  - **CTA button locked to real site text (Frame 10):** per the client's ask, the pill now
    reads the real primary button label from the live homepage hero — **"PLAN YOUR VISIT"**
    (confirmed from `assets/home-hero.png`) — instead of a generic URL-only pill, "so the ad
    and the click behavior match perfectly."
  - **"Built with Claude" dropped again:** the client's second script re-included this line
    verbatim; per their own earlier explicit choice (drop the AI-tool mention), it stays out.

---

## Frame 1 — Home

- scene: Home hero screenshot in a tilted browser window, two echo windows stacked behind
- duration: 3.115s
- transition_in: cut
- status: outline
- voiceover: "This is Eden Life, where a fresh start feels possible."
- highlight: quick push into the headline + "Plan Your Visit" / "Watch Live →" buttons
  (bottom-left of the hero capture) — client shot list: "quick zoom on headline + primary
  button." No nav-click chip (this is the opening frame, we start here, nothing was clicked).
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
- duration: 4.203s
- transition_in: crossfade 0.3s
- status: outline
- voiceover: "New here? Come as you are. Service times, directions, what to expect."
- click_label: "New Here"
- highlight: push toward the lower content band — "Come as You Are" checklist (right column)
  and "Find the Campus Closest to You" service-time card (left column), the two things the
  client's shot list named ("Come as you are" + service times/location).
- sfx: whoosh-short, click-soft
- src: compositions/frames/02-new-here.html

Primary window: `assets/new-here-plan-your-visit.png`. Echo window behind:
`assets/new-here-what-to-expect.png`. Headline: "New here? **Come as you are.**"
Continuous stack drift throughout, no stop.

## Frame 3 — Who We Are

- scene: Who We Are screenshot, one echo window, brisk beat
- duration: 3.307s
- transition_in: crossfade 0.3s
- status: outline
- voiceover: "Real people. Real faith. Meet the heart behind it."
- click_label: "About"
- highlight: push into "Founded on Faith. Built on Community." + the 15+/2/1/∞ stats grid.
  CONTENT-FIDELITY NOTE: the client's shot list asked for "pastor/leadership photo + mission
  line" — the real captured page has no distinct leadership photo (only a dim, blurred face in
  the hero background), so the trust-moment beat lands on the real mission statement + stats
  instead of a photo that doesn't exist on the page.
- sfx: whoosh-short, click-soft
- src: compositions/frames/03-who-we-are.html

Primary window: `assets/about-who-we-are.png`. One echo window (soft, mostly-hidden) behind.
Headline: "**Real people.** Real faith." — the shortest beat in the tour, brisk glance.

## Frame 4 — Watch

- scene: Watch Live screenshot primary, Sermons echo behind
- duration: 2.795s
- transition_in: crossfade 0.3s
- status: outline
- voiceover: "Can't make it in? Watch anyway, on your schedule."
- click_label: "Watch"
- highlight: push into the first sermon card in "Teaching That Transforms." CONTENT-FIDELITY
  NOTE: the real sermon thumbnails are broken images on the live site (a gray placeholder box,
  no actual video still) — added a synthetic circular play-button glyph over the first card so
  the beat still reads as "watch a sermon," without pretending the broken image is a real
  thumbnail.
- sfx: whoosh-short, click-soft
- src: compositions/frames/04-watch.html

Primary window: `assets/watch-live.png`. Echo window: `assets/watch-sermons.png`.
Headline: "Can't make it in? **Watch anyway.**"

## Frame 5 — Connect

- scene: Community Groups screenshot, single window emphasis
- duration: 1.429s
- transition_in: crossfade 0.3s
- status: outline
- voiceover: "Then connect into a group,"
- click_label: "Connect"
- highlight: push into "You Were Made to Belong" + the real photo of the group gathered.
  CONTENT-FIDELITY NOTE: the client's shot list asked for "community groups tile/cards" — the
  real Belong Groups page (at the viewport height we captured) shows a hero + one photo + copy,
  not a tile/card grid, so the highlight lands on that real photo + headline instead.
- sfx: whoosh-short, click-soft
- src: compositions/frames/05-connect.html

Primary window: `assets/connect-community-groups.png`. Headline: "**Find your people.**"
This line and Frame 6's share one continuous sentence, split at the natural clause break —
Frame 6 continues the thought mid-breath, so the crossfade between them should feel like one
exhale, not a hard topic change.

## Frame 6 — Grow

- scene: Growth Steps screenshot, four-step pathway glimpsed via internal pan
- duration: 2.603s
- transition_in: crossfade 0.3s
- status: outline
- voiceover: "and grow with next steps toward a flourishing life."
- click_label: "Grow"
- highlight: push into "Start Your Journey Here" + the "What You Will Learn" checklist
  (Salvation, The Bible, Prayer…) — the real next-steps pathway content on the page.
- sfx: whoosh-short, click-soft
- src: compositions/frames/06-grow.html

Primary window: `assets/grow-growth-steps.png` (the four-step pathway is glimpsed in motion via
the internal pan, not frozen for a static read). Headline: "Take your **next step.**"

## Frame 7 — Events

- scene: Events index screenshot with God Moment card visible
- duration: 1.472s
- transition_in: crossfade 0.3s
- status: outline
- voiceover: "See what's next in Events."
- click_label: "Events"
- highlight: push in and settle on the featured "God Moment: 21 Days of Prayer & Fasting" event
  card — client shot list: "pause on one featured event."
- sfx: whoosh-short, click-soft
- src: compositions/frames/07-events.html

Primary window: `assets/events-index.png` (God Moment: 21 Days of Prayer & Fasting card
visible). Headline: "Always **something happening.**" This line and Frame 8's continue one
sentence across the cut, same as Frames 5→6 — keep the crossfade feeling like one breath.

## Frame 8 — Give

- scene: Give screenshot, plainest and shortest beat
- duration: 2.112s
- transition_in: crossfade 0.3s
- status: outline
- voiceover: "And when you're ready, giving back is simple."
- click_label: "Give"
- highlight: push into "Secure & encrypted" + the real "Pay Online / Bank Transfer" toggle and
  amount grid — client shot list: "simple giving form + one-time/recurring toggle."
- sfx: whoosh-short, click-soft
- src: compositions/frames/08-give.html

Primary window: `assets/give.png`. Headline: "Giving, **made simple.**"

## Frame 9 — Testimonies

- scene: Testimonies screenshot
- duration: 3.307s
- transition_in: crossfade 0.3s
- status: outline
- voiceover: "Watch testimonies, real stories, real life change."
- click_label: "Testimonies"
- highlight: push into "Stories of His Faithfulness" and pan across the row of three quote
  cards (Ngozi A. → Emeka O. → Babatunde F.) — a real "swipe to another story" motion.
  CONTENT-FIDELITY NOTE: the client's shot list asked for "a quote card + smiling photo" — the
  real testimony cards are text-only (no member headshots), so the beat is the quote-card pan
  itself rather than a photo that isn't on the page.
- sfx: whoosh-short, click-soft
- src: compositions/frames/09-testimonies.html

Primary window: `assets/testimonies.png`. Headline: "**Real stories.** Real life change."

## Frame 10 — CTA

- scene: Browser-window mockup of edenlifeng.org itself, logo + headline + URL pill + QR code
- duration: 1.98s
- transition_in: crossfade 0.3s
- status: outline
- voiceover: "Come see for yourself."
- highlight: hold on the headline + the `EDENLIFENG.ORG` pill (the "primary button" in this
  frame's design) — client shot list: "hold on 'Come see for yourself' + primary button." A
  click-pulse plays on the pill right as it lands, echoing the nav-click device one last time.
- sfx: whoosh-short, click-soft
- src: compositions/frames/10-cta.html

Same browser-window component, but this time the window itself IS the message: a light
`edenlifeng.org` window mockup, chrome bar with the real URL, content area showing the Eden
Life logo, "Come See **For Yourself.**" headline, an `EDENLIFENG.ORG` pill, and the QR code
(`assets/qr-website.png`) — echoing v2's fixed CTA frame content, but inside this project's
browser-chrome look instead of a full-bleed dark backdrop. One echo window behind, then
everything settles (the video's one sanctioned hold, capped ~0.7s) on the final frame. Voice is
1.28s; the extra ~0.7s is the deliberate closing settle — this frame's real `data-duration`
should be ~1.98s total.
