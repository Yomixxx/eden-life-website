---
version: alpha
name: Browser Stack — Frame (video / frame layer)
description: >
  A light, product-template-style system built around one recurring hero component: a real
  captured page shown inside a drawn browser-chrome window, tilted in 3D and stacked 2-3 deep
  with parallax. Ground is off-white, not the dark-green treatment of v1/v2. Brand color
  (Eden Life green) carries the accent dot, the URL-bar favicon dot, and headline highlight
  word — never the page content itself, which is real captured screenshot.
unit: the frame — 1920×1080 only (this project is 16:9-only, church-screen + website embed)
principle: one browser-window hero per frame · the stack always drifts · never a static hold

colors:
  bg: "#F7F9F8"
  bg-2: "#EEF3F1"
  ink: "#0D1917"
  ink-soft: "#42504C"
  accent: "#1FAE55"
  accent-deep: "#0B6B34"
  chrome-bar: "#FFFFFF"
  chrome-border: "#E2E8E5"
  dot-red: "#FF5F57"
  dot-yellow: "#FEBC2E"
  dot-green: "#28C840"
  shadow: "rgba(13, 25, 23, 0.18)"

typography:
  headline: { fontFamily: "Montserrat", px: 74, weight: 800, lineHeight: 1.05, tracking: "-0.01em", color: "{colors.ink}" }
  headline-accent: { fontFamily: "Montserrat", px: 74, weight: 800, lineHeight: 1.05, tracking: "-0.01em", color: "{colors.accent-deep}" }
  subhead: { fontFamily: "Poppins", px: 28, weight: 500, lineHeight: 1.45, color: "{colors.ink-soft}" }
  chrome-url: { fontFamily: "Poppins", px: 15, weight: 500, color: "{colors.ink-soft}", tracking: "0.01em" }
  eyebrow: { fontFamily: "Poppins", px: 20, weight: 600, tracking: "0.16em", upper: true, color: "{colors.accent-deep}" }

spacing:
  safe-pad: "110px"
  chrome-bar-h: "44px"
  chrome-radius: "14px"
  chrome-dot: "13px"

components:
  browser-window:
    description: >
      The one recurring hero. A rounded-rect card: a 44px white top bar (3 traffic-light dots
      left, a pill-shaped fake URL field centered, showing "edenlifeng.org/<path>") sitting
      above the real captured page screenshot, clipped to the window's content area (the
      screenshot is always wider/taller than the window and cropped — never letterboxed).
      14px corner radius, 1px chrome-border, soft drop shadow ({colors.shadow}, large blur,
      low spread — never a hard shadow).
    size: "primary window ~1180x760px at native rotation before 3D tilt"
    z-stack: "primary in front, 1-2 echo windows behind at reduced scale/opacity, offset up-right"
  stack-parallax:
    description: >
      Echo windows sit behind the primary at rotateY 6-10deg / rotateX 2-4deg (perspective
      1600-2000px on the ancestor), offset +60/-40px per layer, opacity 0.55/0.32, no chrome
      detail needed at that scale (a flat tinted rect reading as "another window" is enough).
  accent-dot:
    size: "10px circle, {colors.accent}"
    description: "Decorative punctuation near headline text or between stacked windows — never on the content screenshot itself."
  cta-pill:
    border: "2px solid {colors.accent}"
    rounded: "999px"
    background: "rgba(31, 174, 85, 0.08)"
    typography: "{typography.chrome-url} scaled up, {colors.accent-deep}"
