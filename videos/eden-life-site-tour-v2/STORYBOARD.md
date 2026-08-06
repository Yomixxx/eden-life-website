---
format: 1920x1080
duration: 28.7s
message: "Here's what your first Sunday at Eden Life would actually feel like"
arc: Hook (imagine) → Arrival → Payoff (the room) → Teaching → Community → Growth → Events → Give → Testimonies → CTA
audience: church congregation / first-time visitors watching a promo ad played during a service or event
mode: collaborative
music: none
---

## Video direction

- **Palette** (from `frame.md`, real site tokens — same as v1): field = `cream` (#080F0E); panel = `green` (#162421); accent = `pink-deep` (#5EC957, the site's real brand green); secondary accent = `pink` (#25D366); text = `ink` (#FFFFFF).
- **Type**: Montserrat (bold/black) for caption lines, Poppins for any supporting copy.
- **Motion grammar — continuous from the start; this is a second creative pass and the v1 slideshow mistake (easing the camera to a stop, then holding static) must not recur even once.** Every frame's Ken Burns push/pan runs at a clearly visible, constant (linear/`none`-eased) rate from t=0 straight through to the cut — never decelerating to zero, never parking on a static final position. A caption line lands within the first ~0.4s of its frame and, once landed, keeps a small continuous drift of its own rather than sitting still. Only Frame 10 (the CTA, the video's real exit) is allowed one brief settle, capped at ~0.6–0.7s, at the very end.
- **Voice / register**: second-person, chronological, warm and inviting ("you arrive", "you're taught", "you don't leave alone") — NOT a directory of site sections. Caption cards are short narrative fragments in that same voice ("You arrive.", "You're taught, not talked at.", "You don't leave alone.") — never a page name like "Grow" or "Connect".
- **Callback device**: Frame 1 opens on the real homepage hero photo (`home-hero.png`), dim and slightly blurred, as an "imagine this" tease with no caption yet. Frame 3 returns to the SAME photo, now full brightness/clarity with a different crop/motion path, as the payoff once the practical arrival details (Frame 2) have landed — a deliberate before/after reveal, not a repeated shot.
- **Transitions**: alternate `zoom-through` and short `crossfade 0.35s` — never the plain default 0.5s crossfade.
- **Negative list**: no invented illustrations, no stock photography, no browser chrome/cursor, no bouncy/elastic entrances, no lazy breathing, no easing any pan to a stop before its cut, no static hold anywhere except Frame 10's capped 0.6–0.7s settle.

## Frame 1 — Imagine your first Sunday

- scene: Real homepage hero screenshot, dim and softly blurred — a tease, not the full reveal
- voiceover: "Ever imagined your first Sunday here?"
- duration: 1.835s
- transition_in: cut
- status: outline
- src: compositions/frames/01-imagine.html
- type: hook
- persuasion: Future pacing
- beat: curiosity
- blueprint: compose
- asset_candidates: assets/home-hero.png — real homepage hero, live-service photo, shown dim and blurred in this frame

narrativeRole: Opens on an invitation to imagine, not a claim — sets up the "first Sunday" narrative frame the whole video runs on, and plants the hero image for its Frame 3 payoff.
keyMessage: This video is about what YOU would experience, not a feature list.

focal: assets/home-hero.png
roles: assets/home-hero.png = background (full-bleed, dimmed ~55%, blurred ~6px — deliberately soft, this is the "before" half of the Frame 1/3 callback)
sfx: none

Scene 1 (0.0–1.835s): home-hero.png full-bleed, dimmed and softly blurred; a continuous, clearly-visible push-in runs from t=0 straight to the cut at a constant rate — no easing to a stop. No caption card — the question is carried by voice alone over the soft, half-glimpsed image.

Timing note: real duration is 1.835s (synced to voice). Motion runs the full shot.

## Frame 2 — You arrive

- scene: Plan Your Visit page (campus cards, service times, come-as-you-are checklist), then What to Expect
- voiceover: "You arrive — two campuses, real service times, and come as you are."
- duration: 3.819s
- transition_in: zoom-through
- status: outline
- src: compositions/frames/02-you-arrive.html
- type: product_intro
- persuasion: Friction reduction
- beat: relief
- blueprint: compose
- asset_candidates: assets/new-here-plan-your-visit.png — campus/service-time cards and come-as-you-are checklist; assets/new-here-what-to-expect.png — first-time-visitor guide

narrativeRole: The story's first concrete beat — turns the imagined moment into a real, practical arrival with no friction.
keyMessage: Showing up is simple.

focal: assets/new-here-plan-your-visit.png
roles: assets/new-here-plan-your-visit.png = cutout (primary, first half); assets/new-here-what-to-expect.png = supporting (second half)
sfx: soft transition swish on the internal cut

Scene 1 (0.0–1.9s): new-here-plan-your-visit.png full-bleed, continuous push-in from t=0, still moving at the seam; caption card "You arrive." fades in within the first ~0.4s, low-key, then keeps a small continuous drift rather than sitting static.
Scene 2 (1.9–3.819s): velocity-matched cut (cut-the-curve) to new-here-what-to-expect.png as the VO says "come as you are"; push-in continues on this plate too, right through to the cut.

Timing note: real duration is 3.819s (synced to voice). Motion runs continuously across both plates and the internal cut.

## Frame 3 — And this becomes real

- scene: The SAME real homepage hero screenshot as Frame 1, now full brightness and clarity — the payoff half of the callback
- voiceover: "And this is what walks you in."
- duration: 1.6s
- transition_in: crossfade 0.35s
- status: outline
- src: compositions/frames/03-this-becomes-real.html
- type: benefit_highlight
- persuasion: Show-don't-tell proof
- beat: awe
- blueprint: compose
- asset_candidates: assets/home-hero.png — same file as Frame 1, now shown full-clarity as the reveal

narrativeRole: Pays off Frame 1's tease now that the visitor has "arrived" — the imagined moment becomes a real, vivid one.
keyMessage: The imagined moment is real, and it's this vivid.

focal: assets/home-hero.png
roles: assets/home-hero.png = background (full-bleed, full brightness, no dim — deliberately the opposite treatment of Frame 1)
sfx: none

Scene 1 (0.0–1.6s): home-hero.png full-bleed at full brightness/clarity (no dim, no blur — the reveal), a continuous push-in on a DIFFERENT crop/path than Frame 1 used (e.g. panning toward the crowd rather than the stage) runs constantly from t=0 to the cut. No caption — the visual contrast with Frame 1 IS the statement.

Timing note: real duration is 1.6s (synced to voice) — the tightest beat in this cut. Motion runs the full shot.

## Frame 4 — You're taught, not talked at

- scene: Sermons library, then Watch Live
- voiceover: "You're taught, not talked at — and if you can't make it in person, it still reaches you."
- duration: 4.181s
- transition_in: zoom-through
- status: outline
- src: compositions/frames/04-taught.html
- type: benefit_highlight
- persuasion: Value stacking
- beat: trust
- blueprint: compose
- asset_candidates: assets/watch-sermons.png — sermons library; assets/watch-live.png — live streaming page

narrativeRole: Moves from arrival to substance — what actually happens once you're in the room.
keyMessage: The teaching is real and reaches you either way.

focal: assets/watch-sermons.png
roles: assets/watch-sermons.png = cutout (primary, first half); assets/watch-live.png = supporting (second half)
sfx: soft transition swish on the internal cut

Scene 1 (0.0–2.0s): watch-sermons.png full-bleed, continuous push-in from t=0; caption card "You're taught, not talked at." fades in within the first ~0.4s and keeps drifting.
Scene 2 (2.0–4.181s): cut-the-curve to watch-live.png as the VO says "it still reaches you"; push-in continues through to the cut.

Timing note: real duration is 4.181s (synced to voice). Motion runs continuously across both plates and the internal cut.

## Frame 5 — You don't leave alone

- scene: Belong / Community Groups page
- voiceover: "You don't leave alone. Real community, every week."
- duration: 2.88s
- transition_in: crossfade 0.35s
- status: outline
- src: compositions/frames/05-not-alone.html
- type: benefit_highlight
- persuasion: Social proof
- beat: belonging
- blueprint: compose
- asset_candidates: assets/connect-community-groups.png — community/small-group life page

narrativeRole: The story's emotional center — you're not just taught, you're kept.
keyMessage: Belonging continues past the service.

focal: assets/connect-community-groups.png
roles: assets/connect-community-groups.png = background (full-bleed)
sfx: none

Scene 1 (0.0–2.88s): connect-community-groups.png full-bleed, continuous pan runs the entire brief shot, no stop; caption card "You don't leave alone." fades in within the first ~0.4s and keeps drifting through to the cut.

Timing note: real duration is 2.88s (synced to voice). Motion runs the full shot.

## Frame 6 — There's a next step

- scene: Growth Steps discipleship pathway
- voiceover: "There's a clear next step for you, wherever you're starting."
- duration: 2.795s
- transition_in: zoom-through
- status: outline
- src: compositions/frames/06-next-step.html
- type: benefit_highlight
- persuasion: Value stacking
- beat: aspiration
- blueprint: compose
- asset_candidates: assets/grow-growth-steps.png — discipleship pathway detail page

narrativeRole: The story moves forward in time — not just belonging, but growing.
keyMessage: There's always a next step, no matter where you're starting from.

focal: assets/grow-growth-steps.png
roles: assets/grow-growth-steps.png = background (full-bleed)
sfx: none

Scene 1 (0.0–2.795s): grow-growth-steps.png full-bleed, continuous push-in runs the whole shot, no stop; caption card "There's a next step." fades in within the first ~0.4s and keeps drifting.

Timing note: real duration is 2.795s (synced to voice). Motion runs the full shot.

## Frame 7 — It's already happening

- scene: Events listing, featuring the current God Moment: 21 Days event
- voiceover: "And there's always something happening — right now, it's God Moment."
- duration: 3.349s
- transition_in: crossfade 0.35s
- status: outline
- src: compositions/frames/07-happening.html
- type: social_proof
- persuasion: Scarcity/urgency
- beat: curiosity + urgency
- blueprint: compose
- asset_candidates: assets/events-index.png — events listing page, includes the God Moment event card

narrativeRole: Proves the church is currently active — ties the story to something real and dated, not evergreen.
keyMessage: This isn't hypothetical — something real is happening right now.

focal: assets/events-index.png
roles: assets/events-index.png = background (full-bleed)
sfx: none

Scene 1 (0.0–3.349s): events-index.png full-bleed, continuous push-in runs the whole shot, no stop; caption card "It's happening now." fades in within the first ~0.4s and keeps drifting.

Timing note: real duration is 3.349s (synced to voice). Motion runs the full shot.

## Frame 8 — Giving back is simple

- scene: Give / online giving page
- voiceover: "Giving back is simple, whenever you're ready."
- duration: 2.283s
- transition_in: zoom-through
- status: outline
- src: compositions/frames/08-giving.html
- type: benefit_highlight
- persuasion: Friction reduction
- beat: ease
- blueprint: compose
- asset_candidates: assets/give.png — online giving page

narrativeRole: A short, plain, non-pressuring beat — states the option exists without lingering, deliberately low-pressure and placed late so it never leads the story.
keyMessage: Giving is easy, whenever someone's ready — never a condition of belonging.

focal: assets/give.png
roles: assets/give.png = background (full-bleed)
sfx: none

Scene 1 (0.0–2.283s): give.png full-bleed, fast continuous pan runs the entire brief shot, no stop; caption card "Whenever you're ready." fades in within the first ~0.4s and keeps drifting.

Timing note: real duration is 2.283s (synced to voice). Motion runs the full shot.

## Frame 9 — It's already changing lives

- scene: Testimonies page — real member stories
- voiceover: "It's already changing lives — real stories, real people."
- duration: 3.349s
- transition_in: crossfade 0.35s
- status: outline
- src: compositions/frames/09-changing-lives.html
- type: social_proof
- persuasion: Social proof
- beat: awe + trust
- blueprint: compose
- asset_candidates: assets/testimonies.png — testimonies page

narrativeRole: Closes the story's proof arc with lived evidence right before the CTA — everything promised is already real for real people.
keyMessage: This isn't a pitch — it's already true for people like you.

focal: assets/testimonies.png
roles: assets/testimonies.png = background (full-bleed)
sfx: none

Scene 1 (0.0–3.349s): testimonies.png full-bleed, continuous pan runs the whole shot, no stop; caption card "Real stories. Real people." fades in within the first ~0.4s and keeps drifting.

Timing note: real duration is 3.349s (synced to voice). Motion runs the full shot.

## Frame 10 — Come see for yourself

- scene: Plan Your Visit revisited, Eden Life logo lockup
- voiceover: "Come see your first Sunday for yourself."
- duration: 2.6s
- transition_in: zoom-through
- status: outline
- src: compositions/frames/10-come-see.html
- type: cta
- persuasion: Risk reversal
- beat: inevitability + welcome
- blueprint: logo-assemble-lockup — settled-lockup-reveal, over the real Plan Your Visit backdrop
- asset_candidates: assets/new-here-plan-your-visit.png — campus/service-time cards, closing backdrop; assets/logo.jpg — Eden Life Church logo for the lockup

narrativeRole: Closes the loop — the whole video has been describing this exact page; now it hands the viewer straight to it.
keyMessage: Everything described is one visit away.

focal: assets/logo.jpg
roles: assets/new-here-plan-your-visit.png = background (full-bleed, dimmed ~45% under the lockup); assets/logo.jpg = cutout (centered lockup)
sfx: soft glow-bloom swell

Scene 1 (0.0–0.8s): new-here-plan-your-visit.png full-bleed, dimmed ~45%, a brief camera settle (this frame's one sanctioned exception) as the Eden Life logo lockup builds in with a soft glow bloom.
Scene 2 (0.8–1.92s): a `pink-deep` accent underline sweeps beneath the wordmark; "edenlifeng.org" fades in beneath the lockup — the VO ends here.
Scene 3 (1.92–2.6s): a short, genuine settle (0.68s) — at most subtle jitter on the glow. The ONLY hold anywhere in this video, capped tight.

Timing note: real duration is 2.6s — 0.68s longer than the 1.92s voiceover for a real but brief closing settle. This is the ONLY frame in the tour allowed any hold at all.
