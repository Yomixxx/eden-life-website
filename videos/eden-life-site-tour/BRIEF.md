---
workflow: product-launch-video
flow: automation
storyboard: yes
message: "Eden Life is a real, whole church — worship, community, growth, and a place to belong — and it's all right here"
destination: church-screen
aspect: 1920x1080
language: en
audience: church congregation watching a promo ad played during a service/event
length: 85s
angle: show-it-as-is site tour
---

## Intent

A full walkthrough of the actual Eden Life Church website, built from real captured
screenshots of the site itself (not stock photography, not invented graphics) —
a promo ad meant to be played on a screen in church. It should feel like a guided
tour through everything the church offers online: the homepage, planning a first
visit, who the church is, community groups, growth/discipleship, watch/sermons,
giving, events, and testimonies — ending on a clear "plan your visit" call to action.

This replaces an earlier, too-narrow pair of social-media ad concepts the user
correctly rejected ("what is this result for the website cant you see the pages
of the site??? what i need is a walkthrough of the entire site as a promo we
would play in church"). Format confirmed by the user: 16:9, "a promo ad video"
(not a short vertical reel).

## Assets

- capture/screenshots/full-page.png + scroll-*.png — homepage, captured live via
  `hyperframes capture` against a local server of the real site (10 scroll positions
  + full page).
- capture/pages/about-who-we-are-viewport.png — About / Who We Are.
- capture/pages/new-here-plan-your-visit-viewport.png — Plan Your Visit.
- capture/pages/new-here-what-to-expect-viewport.png — What to Expect.
- capture/pages/connect-community-groups-viewport.png — Community Groups.
- capture/pages/grow-growth-steps-viewport.png — Growth Steps / discipleship.
- capture/pages/watch-sermons-viewport.png — Watch / Sermons.
- capture/pages/watch-live-viewport.png — Watch Live.
- capture/pages/give-viewport.png — Give.
- capture/pages/events-index-viewport.png — Events.
- capture/pages/testimonies-viewport.png — Testimonies.
  (Each also has a `-full.png` full-page variant if a taller crop is needed for a
  scroll-reveal treatment on a given frame.)

## Customizations

- None beyond the standard build.

## Notes

- Show-it-as-is brief: feature the site's own captured screens as the video's
  assets — per the product-launch-video route, do not rebuild pages in HTML/CSS;
  use the real screenshots with Ken Burns / scroll motion.
- No pasted script; narration written fresh, restructure freely.
- No BGM (offline render, no HeyGen credential — same limitation as the two
  earlier ads in this repo); voice-only.
