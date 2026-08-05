---
format: 1920x1080
duration: 36.3s
message: "Eden Life is a real, whole church — worship, community, growth, and a place to belong — and it's all right here"
arc: Hook (this is us) → New Here → Who We Are → Grow → Connect → Watch → Give → Events → Testimonies → CTA
audience: church congregation watching a promo ad played during a service/event
mode: collaborative
music: none
---

## Video direction

- **Palette** (from `frame.md`, real site tokens): field = `cream` (#080F0E, the site's own near-black bg-0); panel = `green` (#162421, bg-3); accent = `pink-deep` (#5EC957, the site's real brand green — same swatch as the live `EdenLife` wordmark); secondary accent = `pink` (#25D366, WhatsApp green already used on-site); text = `ink` (#FFFFFF).
- **Type**: Montserrat (bold/black weights) for section labels and headline chrome, Poppins for supporting copy — matching the live site's own font pairing exactly.
- **Motion grammar — CORRECTED after a slideshow-feel review; read this before building.** Frame durations are now synced tight to the real voice line (2.2–5.2s each, no padding) — there is **no spare time to hold still**. The Ken Burns push/pan on every frame **runs continuously from t=0 to the cut, at a visibly faster rate than before — never easing to a stop early and never holding a static final position**. Motion must still be moving at the very last frame before the transition takes it. Layer a **second** motion beat on top of the camera move (the caption card's own entrance, an underline draw, a chip settle) landing in the back half so two things are visibly in motion across the shot, not one move-then-freeze. `power3`/`power2` long-tail easing on entrances only — the continuous pan itself is linear/`power1`-ish drift, not an ease-in/ease-out arc that visibly decelerates to zero. Real captured screenshots stay full-bleed — never invented graphics, never a rebuilt UI. The caption card names the site *section* and enters within the first ~0.5s (not after a long establishing beat) so there's no dead opening either.
- **Rhythm**: with padding removed, the cut cadence itself carries the energy — frames now run 2.2–5.2s back to back, no breathing room. Frame 1 (hero) and Frame 10 (CTA) are the two anchor beats; Frame 10 alone is allowed a genuine settle at the very end (the video's real exit). Every other frame — including 3 (2.28s) and 7 (2.22s) — must feel like a fast confident glance, not a lingering look: get the caption on, keep the camera moving, cut.
- **Transitions**: swap the plain 0.5s crossfades for snappier 0.3–0.35s crossfades, and use `zoom-through` at every 2–3rd boundary (not just the two end-boundaries) so the cut itself carries forward motion instead of a soft dissolve between two still images.
- **Negative list**: no invented illustrations, no stock photography, no browser chrome / cursor / address bar (full-bleed content only), no bouncy/elastic entrances, no lazy breathing, **no easing the pan to a stop before the cut, no static hold once the caption has landed** — those two are exactly what read as a slideshow and must not recur.

## Frame 1 — This is Eden Life

- scene: Real homepage hero screenshot — live-service photo, "ENCOUNTERS • EQUIPPING • EXPLOITS" tagline, animated headline, Plan Your Visit / Watch Live buttons
- voiceover: "Encounters. Equipping. Exploits. This is Eden Life."
- duration: 3.392s
- transition_in: cut
- status: outline
- src: compositions/frames/01-this-is-eden-life.html
- type: hook
- persuasion: Authority by association
- beat: pride + welcome
- blueprint: compose
- asset_candidates: assets/home-hero.png — real homepage hero, live-service photo with tagline and CTAs

narrativeRole: Opens on the site's own real hero, echoing its own on-screen tagline verbatim — proves from the first second this is a real, living church, not a concept.
keyMessage: This is a real church, and this is genuinely what we look like.

focal: assets/home-hero.png
roles: assets/home-hero.png = background (full-bleed, no dim — this is the vivid hero)
sfx: none

Scene 1 (0.0–3.392s): the real homepage hero screenshot fills the frame full-bleed; a continuous push-in (camera: push/focus/drift), visibly faster than a lazy establishing drift, runs from t=0 all the way to the cut — never decelerating to a stop. No caption card on this frame — the real "ENCOUNTERS • EQUIPPING • EXPLOITS" tagline and buttons already visible in the screenshot ARE the opening statement, and the push is still moving on the last visible frame before the cut.

Timing note: this frame's real duration is 3.392s (synced to voice) — no padding, no hold. Motion runs edge to edge.

## Frame 2 — New Here? Start here.

- scene: Plan Your Visit page (campus cards, service times, come-as-you-are checklist), then What to Expect
- voiceover: "New here? We've made it easy — two campuses, real service times, and come as you are."
- duration: 4.949s
- transition_in: zoom-through
- status: outline
- src: compositions/frames/02-new-here.html
- type: product_intro
- persuasion: Friction reduction
- beat: relief
- blueprint: compose
- asset_candidates: assets/new-here-plan-your-visit.png — campus/service-time cards and come-as-you-are checklist; assets/new-here-what-to-expect.png — first-time-visitor guide

narrativeRole: Immediately answers the visitor's first real question — where, when, what do I wear — right after the hook, removing friction before anything else is shown.
keyMessage: Visiting is simple and low-friction.

focal: assets/new-here-plan-your-visit.png
roles: assets/new-here-plan-your-visit.png = cutout (primary, first ~5s); assets/new-here-what-to-expect.png = supporting (second beat, ~3s)
sfx: soft transition swish on the internal cut

Scene 1 (0.0–2.4s): new-here-plan-your-visit.png full-bleed, a continuous, visibly-moving push-in begins at t=0 and is still running at the seam; a small caption card ("New Here") fades in top-left within the first ~0.35s, on the VO's "New here?" — never blocking the real checklist content, and never a static hold once it lands (it keeps drifting with the push).
Scene 2 (2.4–4.949s): velocity-matched cut (cut-the-curve) to new-here-what-to-expect.png as the VO says "come as you are"; the push-in continues on this second plate too, still moving through to the cut — no settle, no hold.

Timing note: this frame's real duration is 4.949s (synced to voice). The internal cut lands mid-line, near "come as you are" — motion continues on both sides of the cut.

## Frame 3 — Who We Are

- scene: About / Who We Are page
- voiceover: "Get to know who we are, and what we believe."
- duration: 2.283s
- transition_in: crossfade
- status: outline
- src: compositions/frames/03-who-we-are.html
- type: benefit_highlight
- persuasion: Authority by association
- beat: trust
- blueprint: compose
- asset_candidates: assets/about-who-we-are.png — church identity/mission/values page

narrativeRole: Grounds the tour in identity before showing programs — establishes who this church is, not just what it does.
keyMessage: There's a real identity and set of beliefs behind everything else in this tour.

focal: assets/about-who-we-are.png
roles: assets/about-who-we-are.png = background (full-bleed)
sfx: none

Scene 1 (0.0–2.283s): about-who-we-are.png full-bleed, a fast, clearly-visible continuous pan runs the entire 2.3s — this is the shortest frame in the tour and must read as a brisk glance, not a lingering look; caption card ("Who We Are") fades in within the first ~0.3s and itself drifts slightly rather than sitting static; the pan is still moving on the cut.

Timing note: this frame's real duration is 2.283s (synced to voice) — the tightest beat in the tour. No hold, no easing to a stop; the whole 2.3s is motion.

## Frame 4 — Grow

- scene: Growth Steps discipleship pathway (Growth Steps → Academy → Basic Leadership → Advanced Leadership)
- voiceover: "Four simple steps to a flourishing life — wherever you're starting from."
- duration: 3.861s
- transition_in: zoom-through
- status: outline
- src: compositions/frames/04-grow.html
- type: benefit_highlight
- persuasion: Value stacking
- beat: aspiration
- blueprint: compose
- asset_candidates: assets/grow-growth-steps.png — discipleship pathway detail page

narrativeRole: Shows the church has a clear, structured path for spiritual growth — not just a Sunday service.
keyMessage: There's a real plan for growing here, at any stage.

focal: assets/grow-growth-steps.png
roles: assets/grow-growth-steps.png = background (full-bleed)
sfx: none

Scene 1 (0.0–3.861s): grow-growth-steps.png full-bleed, a continuous push-in runs from t=0 to the cut without decelerating to a stop; caption card ("Grow") fades in on "flourishing life" (~1.6s in) and keeps drifting with the push rather than parking still — the four-step pathway is glimpsed in motion, not frozen on for a static read.

Timing note: this frame's real duration is 3.861s (synced to voice). Motion runs the full shot.

## Frame 5 — Connect

- scene: Community Groups page
- voiceover: "Community groups, where real relationships grow."
- duration: 2.731s
- transition_in: crossfade
- status: outline
- src: compositions/frames/05-connect.html
- type: benefit_highlight
- persuasion: Social proof
- beat: belonging
- blueprint: compose
- asset_candidates: assets/connect-community-groups.png — community/small-group life page

narrativeRole: Adds the relational/community layer to the tour, right after the structural growth-path beat.
keyMessage: Growth here happens inside real relationships, not alone.

focal: assets/connect-community-groups.png
roles: assets/connect-community-groups.png = background (full-bleed)
sfx: none

Scene 1 (0.0–2.731s): connect-community-groups.png full-bleed, a fast continuous pan runs the entire shot, no stop; caption card ("Connect") fades in within the first ~0.4s on "community groups" and keeps drifting — another brisk beat, matched in pace to Frame 3.

Timing note: this frame's real duration is 2.731s (synced to voice). Motion runs the full shot, no hold.

## Frame 6 — Watch

- scene: Sermons library, then Watch Live
- voiceover: "Can't make it in person? Watch every service, live or on demand."
- duration: 3.989s
- transition_in: zoom-through
- status: outline
- src: compositions/frames/06-watch.html
- type: benefit_highlight
- persuasion: Risk reversal
- beat: reassurance
- blueprint: compose
- asset_candidates: assets/watch-sermons.png — sermons library; assets/watch-live.png — live streaming page

narrativeRole: Removes the last practical barrier (distance/schedule) by showing the church is fully reachable online too.
keyMessage: Distance is not a barrier to being part of this church.

focal: assets/watch-sermons.png
roles: assets/watch-sermons.png = cutout (primary, first ~5s); assets/watch-live.png = supporting (second beat, ~3s)
sfx: soft transition swish on the internal cut

Scene 1 (0.0–2.0s): watch-sermons.png full-bleed, continuous push-in from t=0, still moving at the seam; caption card ("Watch") fades in within the first ~0.3s on "watch every service."
Scene 2 (2.0–3.989s): cut-the-curve to watch-live.png as the VO says "live or on demand"; push-in continues on this plate too, right through to the cut — no settle.

Timing note: this frame's real duration is 3.989s (synced to voice). Motion runs continuously across both plates and the internal cut.

## Frame 7 — Give

- scene: Give / online giving page
- voiceover: "Give online, anytime, from anywhere."
- duration: 2.219s
- transition_in: crossfade
- status: outline
- src: compositions/frames/07-give.html
- type: benefit_highlight
- persuasion: Friction reduction
- beat: ease
- blueprint: compose
- asset_candidates: assets/give.png — online giving page

narrativeRole: A short, plain, non-pressuring beat — states the giving option exists and is easy, without lingering on it.
keyMessage: Giving is simple whenever someone chooses to.

focal: assets/give.png
roles: assets/give.png = background (full-bleed)
sfx: none

Scene 1 (0.0–2.219s): give.png full-bleed, a fast continuous pan runs the entire brief shot, no stop; caption card ("Give") fades in within the first ~0.3s on "give online" and keeps drifting — the shortest, plainest beat in the tour, meant to pass quickly.

Timing note: this frame's real duration is 2.219s (synced to voice). No hold — the whole shot is in motion.

## Frame 8 — Events

- scene: Events listing, featuring the current God Moment: 21 Days event
- voiceover: "And there's always something happening — like God Moment, twenty-one days of prayer and fasting."
- duration: 5.227s
- transition_in: zoom-through
- status: outline
- src: compositions/frames/08-events.html
- type: social_proof
- persuasion: Scarcity/urgency
- beat: curiosity + urgency
- blueprint: compose
- asset_candidates: assets/events-index.png — events listing page, includes the God Moment event card

narrativeRole: Proves the church is currently active, not dormant — ties the tour to a real, dated, ongoing program.
keyMessage: There's something real and current happening right now, not just a static program list.

focal: assets/events-index.png
roles: assets/events-index.png = background (full-bleed)
sfx: none

Scene 1 (0.0–5.227s): events-index.png full-bleed, continuous push-in runs from t=0 to the cut, never stopping; caption card ("Events") fades in within the first ~0.4s on "always something happening" — this frame's real VO already fills almost the whole shot, so the fix here is purely: keep the push moving all the way through instead of stopping at ~3.5s as before.

Timing note: this frame's real duration is 5.227s (synced to voice, effectively unchanged). The camera move must now run the FULL 5.227s, not stop early.

## Frame 9 — Testimonies

- scene: Testimonies page — real member stories
- voiceover: "Real stories, from real people, about what God has done here."
- duration: 3.627s
- transition_in: crossfade
- status: outline
- src: compositions/frames/09-testimonies.html
- type: social_proof
- persuasion: Social proof
- beat: awe + trust
- blueprint: compose
- asset_candidates: assets/testimonies.png — testimonies page

narrativeRole: Closes the tour's proof arc with lived, personal evidence, right before the CTA.
keyMessage: What's been described all through this tour is real for real people.

focal: assets/testimonies.png
roles: assets/testimonies.png = background (full-bleed)
sfx: none

Scene 1 (0.0–3.627s): testimonies.png full-bleed, continuous pan runs from t=0 to the cut, no stop; caption card ("Testimonies") fades in within the first ~0.4s on "real stories" and keeps drifting through to the seam.

Timing note: this frame's real duration is 3.627s (synced to voice). Motion runs the full shot.

## Frame 10 — Come see for yourself

- scene: Plan Your Visit revisited, Eden Life logo lockup, service times card
- voiceover: "Come see for yourself. Plan your visit — we'll see you Sunday."
- duration: 4.0s
- transition_in: zoom-through
- status: outline
- src: compositions/frames/10-come-see.html
- type: cta
- persuasion: Risk reversal
- beat: inevitability + welcome
- blueprint: logo-assemble-lockup — settled-lockup-reveal, over the real Plan Your Visit backdrop
- asset_candidates: assets/new-here-plan-your-visit.png — campus/service-time cards, closing backdrop; assets/logo.jpg — Eden Life Church logo for the lockup

narrativeRole: Closes on the single action the whole tour has been building to, echoing Frame 2's own page so the CTA feels earned, not bolted on.
keyMessage: Everything shown was real — now come experience it.

focal: assets/logo.jpg
roles: assets/new-here-plan-your-visit.png = background (full-bleed, dimmed ~45% under the lockup); assets/logo.jpg = cutout (centered lockup)
sfx: soft glow-bloom swell

Scene 1 (0.0–1.2s): new-here-plan-your-visit.png full-bleed, dimmed ~45%, a brief continued push (this frame is allowed one one exception to "always moving": the camera settles by ~1.2s, faster than before) as the Eden Life logo lockup builds in with a soft ambient glow bloom behind it.
Scene 2 (1.2–3.285s): as the VO says "plan your visit," a `pink-deep` accent underline sweeps beneath the wordmark; a thin tagline "edenlifeng.org" fades in beneath the lockup — the VO ends here.
Scene 3 (3.285–4.0s): a short, genuine settle — at most subtle jitter on the glow. This is the video's one deliberate held beat (per the motion doctrine, the final frame may hold), but capped at 0.7s, not the multi-second stall of the previous cut.

Timing note: this frame's duration is 4.0s — 0.7s longer than the 3.285s voiceover for a real but brief closing settle, nowhere near the old 6.0s. This is the ONLY frame in the tour allowed any hold at all.
