---
workflow: product-launch-video
flow: automation
storyboard: yes
message: "There's still time to join God Moment — 21 Days of Prayer & Fasting"
destination: instagram-reels
aspect: 1080x1920
language: en
audience: Eden Life Church members and prospective attendees, social feed viewers
length: 15s
angle: urgency
---

## Intent

A 15-second vertical promo for "God Moment: 21 Days of Prayer & Fasting," Eden
Life Church's current prayer-and-fasting program (3rd–23rd August 2026). The
program is already a few days in, so the ad's job is to create urgency — you
can still join — not to introduce the event from scratch. Tone: reverent but
urgent, not somber; a call to action, not just an announcement. Ends by
pointing to the event page for details.

Site tagline to carry through: "Prayers | Prophecies | Possibilities."

## Assets

- assets/photos/god-moment-hero.png — event flyer, primary visual anchor.
- assets/photos/god-moment-schedule.png — program schedule, may support a beat.
- assets/photos/god-moment-timetable.png — daily timetable, may support a beat.
- assets/logo.jpg — Eden Life Church logo.
- Brand tokens sourced locally from the site's own CSS (`assets/styles.css`)
  instead of a live URL capture — the source is a local static-site repo, not
  a hosted page. Real tokens: near-black backgrounds (`--bg-0 #080f0e` /
  `--bg-1 #0d1917`), signature green accent `--eden #5ec957`, white/translucent
  text (`--text-hi #fff`, `--text-lo rgba(255,255,255,.45)`), display font
  Montserrat (`--font-display`), body font Poppins (`--font-body`). Note:
  some legacy event pages reference an undefined `--gold` variable — that is
  a site bug, not the real brand color; do not use gold.

## Customizations

- None beyond the standard build.

## Notes

- Not a site tour — this is a promo, sell the event.
- No pasted script; narration/copy may be freely written and restructured.
- Event detail page is /events/god-moment.html — the closing CTA should point
  there in spirit (e.g. "Details on our website" / "Link in bio"), since the
  rendered video itself has no clickable link.
- Today's in-story date is Aug 5, 2026 — day 3 of 21; do not imply the program
  is starting soon, it is already running.
