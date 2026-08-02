#!/usr/bin/env node
'use strict';

/**
 * Eden Life — 60-second product ad generator.
 *
 * Spins up a local static server for this repo, analyzes the real site
 * (homepage sections + key subpages), then drives a Playwright-recorded
 * browser through a proportionally-timed tour of what it found, and
 * encodes the result to a 4K MP4.
 *
 * Usage:  node generate-ad.js
 * Output: ./output/church-ad.mp4
 */

const fs = require('fs');
const path = require('path');
const http = require('http');
const https = require('https');
const { execFile } = require('child_process');
const { chromium } = require('playwright');
const QRCode = require('qrcode');
const ffmpegPath = require('ffmpeg-static');
const { HttpsProxyAgent } = require('https-proxy-agent');

// Respect a configured HTTPS_PROXY (common on corporate networks / CI
// sandboxes) for the one-time Google Fonts fetch; falls back to a direct
// connection when no proxy is set, which is the common case on a normal
// machine.
const PROXY_URL = process.env.HTTPS_PROXY || process.env.https_proxy;
const proxyAgent = PROXY_URL ? new HttpsProxyAgent(PROXY_URL) : undefined;

// ────────────────────────────────────────────────────────────────────────
// CONFIG
// ────────────────────────────────────────────────────────────────────────

const SITE_ROOT = path.resolve(__dirname, '..'); // the website repo root
const OUTPUT_DIR = path.resolve(__dirname, 'output');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'church-ad.mp4');
const RAW_VIDEO_DIR = path.join(OUTPUT_DIR, '.raw-capture');
const FONT_CACHE_DIR = path.join(__dirname, '.font-cache');

const TOTAL_DURATION_MS = 60_000;
const INTRO_DURATION_MS = 3_200;
const OUTRO_DURATION_MS = 6_000;
const CONTENT_BUDGET_MS = TOTAL_DURATION_MS - INTRO_DURATION_MS - OUTRO_DURATION_MS;
const MIN_SCENE_MS = 3_200; // floor so no scene is a flash-cut
const MAX_SCENE_MS = 9_000; // ceiling so no single scene dominates the ad

// Capture at a normal 1920x1080 logical viewport (identical to a real
// desktop visit of this site) with deviceScaleFactor left at 1, then
// upscale to true 4K (3840x2160) as a final step in the FFmpeg encode.
//
// Two things rule out the more obvious "render bigger" options:
//  - Rendering in an actual 3840px-wide viewport would just add empty
//    side margins around this site's centered max-width:1240px layout
//    instead of showing more detail.
//  - Rendering at 1920x1080 with deviceScaleFactor:2 to get crisp 2x
//    pixel density (the usual trick for a Retina-quality screenshot)
//    does NOT work for Playwright's *video* recording: its screencast
//    captures raw frames at the logical viewport size regardless of
//    deviceScaleFactor, and if recordVideo.size is then set larger than
//    that (e.g. 3840x2160), Playwright pads the extra space with flat
//    grey rather than scaling the frame up — confirmed by inspecting an
//    actual decoded frame, not just the container's reported resolution.
//
// So: viewport and recordVideo.size are kept identical (no mismatch, no
// padding), and OUTPUT_RESOLUTION below is what FFmpeg upscales to with a
// high-quality Lanczos filter during encoding.
const VIEWPORT = { width: 1920, height: 1080 };
const DEVICE_SCALE_FACTOR = 1;
const VIDEO_SIZE = { width: VIEWPORT.width * DEVICE_SCALE_FACTOR, height: VIEWPORT.height * DEVICE_SCALE_FACTOR };
const OUTPUT_RESOLUTION = { width: 3840, height: 2160 };
const FPS = 30;

// Brand tokens, lifted directly from assets/styles.css :root, so the
// generated overlays (captions, transitions, intro/outro cards) match the
// site's real design instead of inventing a new look.
const BRAND = {
  bg0: '#080f0e',
  bg2: '#111f1d',
  eden: '#5ec957',
  edenGlow: 'rgba(94,201,87,.35)',
  textHi: '#ffffff',
  fontDisplay: "'Montserrat', system-ui, sans-serif",
  fontBody: "'Poppins', system-ui, sans-serif",
};

// ── Sections identified by repo analysis ──────────────────────────────
// Homepage <section> elements, in DOM order (each carries a real
// aria-label/aria-labelledby in index.html — confirmed by inspection).
// "times-strip" (a thin service-times bar) and "fullcta" (the site's own
// closing CTA) are intentionally excluded: the former is too minor to
// justify a beat, the latter is superseded by this video's own outro card.
const HOME_SECTIONS = [
  // The hero already carries its own strong on-screen kicker + headline +
  // CTA buttons — showing our synthetic caption on top of it would just
  // duplicate/collide with real copy the site already displays prominently,
  // so this is the one scene that skips the caption overlay entirely.
  { key: 'hero', selector: 'section.hero', noCaption: true },
  { key: 'vision-mission', selector: 'section.page-section[aria-label="Vision and Mission"]' },
  { key: 'community', selector: 'section.collage' },
  { key: 'pathway', selector: 'section.pathway' },
  { key: 'campuses', selector: 'section.campuses' },
  { key: 'pastor', selector: 'section.pastor' },
  { key: 'events', selector: 'section.events' },
];

// Key subpages drawn from the main nav — the practical "next step" pages
// (visit, watch, give, full events list) that round out the homepage tour.
const SUBPAGES = [
  { key: 'plan-your-visit', path: '/new-here/plan-your-visit.html' },
  { key: 'watch-live', path: '/watch/watch-live.html' },
  { key: 'give', path: '/give.html' },
  { key: 'events-index', path: '/events/index.html' },
];

const GOOGLE_FONTS_CSS_URL =
  'https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,600;0,700;0,800;0,900;1,400&family=Poppins:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&display=swap';

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.pdf': 'application/pdf',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml',
  '.webmanifest': 'application/manifest+json',
};

// ────────────────────────────────────────────────────────────────────────
// STATIC SERVER (auto-detects a free port — this repo has no dev server
// of its own: it's a plain static HTML/CSS/JS site with no package.json
// or build step, deployed as-is to Vercel per vercel.json)
// ────────────────────────────────────────────────────────────────────────

function startStaticServer(rootDir) {
  return new Promise((resolve, reject) => {
    const server = http.createServer((req, res) => {
      try {
        const urlPath = decodeURIComponent(req.url.split('?')[0]);
        if (urlPath.includes('..')) {
          res.writeHead(400);
          res.end('Bad request');
          return;
        }
        let filePath = path.join(rootDir, urlPath);

        const serveFinal = (finalPath) => {
          fs.readFile(finalPath, (err, data) => {
            if (err) {
              fs.readFile(path.join(rootDir, '404.html'), (err404, notFoundData) => {
                res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end(err404 ? 'Not found' : notFoundData);
              });
              return;
            }
            const ext = path.extname(finalPath).toLowerCase();
            res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
            res.end(data);
          });
        };

        fs.stat(filePath, (err, stat) => {
          if (!err && stat.isDirectory()) {
            filePath = path.join(filePath, 'index.html');
          }
          serveFinal(filePath);
        });
      } catch (e) {
        res.writeHead(500);
        res.end('Server error');
      }
    });

    server.listen(0, '127.0.0.1', () => {
      const { port } = server.address();
      resolve({ server, port, baseUrl: `http://127.0.0.1:${port}` });
    });
    server.on('error', reject);
  });
}

// ────────────────────────────────────────────────────────────────────────
// SELF-HOSTED FONTS (fetched + base64-embedded once, then served from an
// in-memory/on-disk cache — avoids flaky third-party network stalls
// during the actual timed recording while still using the site's real
// Montserrat/Poppins brand fonts instead of a fallback sans-serif)
// ────────────────────────────────────────────────────────────────────────

function httpsGet(url, redirects = 0) {
  return new Promise((resolve, reject) => {
    if (redirects > 5) { reject(new Error('Too many redirects: ' + url)); return; }
    https
      .get(url, {
        agent: proxyAgent,
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; EdenAdGenerator/1.0)' },
        timeout: 15000,
      }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          res.resume();
          resolve(httpsGet(res.headers.location, redirects + 1));
          return;
        }
        if (res.statusCode !== 200) {
          reject(new Error(`HTTP ${res.statusCode} for ${url}`));
          return;
        }
        const chunks = [];
        res.on('data', (c) => chunks.push(c));
        res.on('end', () => resolve(Buffer.concat(chunks)));
        res.on('error', reject);
      })
      .on('error', reject)
      .on('timeout', function () {
        this.destroy(new Error(`Timed out fetching ${url}`));
      });
  });
}

async function getEmbeddedFontsCss() {
  const cacheFile = path.join(FONT_CACHE_DIR, 'fonts-embedded.css');
  if (fs.existsSync(cacheFile)) {
    return fs.readFileSync(cacheFile, 'utf8');
  }
  try {
    const cssBuf = await httpsGet(GOOGLE_FONTS_CSS_URL);
    let css = cssBuf.toString('utf8');
    const urls = [...new Set([...css.matchAll(/url\((https:\/\/fonts\.gstatic\.com\/[^)]+)\)/g)].map((m) => m[1]))];
    for (const url of urls) {
      const fontBuf = await httpsGet(url);
      css = css.split(url).join(`data:font/ttf;base64,${fontBuf.toString('base64')}`);
    }
    fs.mkdirSync(FONT_CACHE_DIR, { recursive: true });
    fs.writeFileSync(cacheFile, css);
    return css;
  } catch (err) {
    console.warn(`[fonts] Could not fetch Google Fonts (${err.message}). Falling back to system sans-serif.`);
    return '';
  }
}

// ────────────────────────────────────────────────────────────────────────
// NETWORK: block third-party domains (payment SDK, video embeds, maps,
// analytics, social widgets) so the recording is fast and deterministic;
// the Google Fonts CSS request is instead fulfilled from our embedded cache.
// ────────────────────────────────────────────────────────────────────────

async function setupNetworkInterception(context, embeddedFontsCss) {
  await context.route('**/*', (route) => {
    const url = route.request().url();
    if (url.startsWith('http://127.0.0.1') || url.startsWith('http://localhost')) {
      return route.continue();
    }
    if (url.includes('fonts.googleapis.com')) {
      return route.fulfill({ contentType: 'text/css; charset=utf-8', body: embeddedFontsCss });
    }
    return route.abort();
  });
}

// ────────────────────────────────────────────────────────────────────────
// PAGE OVERLAY (captions, cross-fade cover, smooth scroll) — injected
// fresh after every navigation since a real page.goto() wipes the DOM.
// ────────────────────────────────────────────────────────────────────────

async function injectOverlay(page, embeddedFontsCss) {
  await page.evaluate(
    ({ fontsCss, brand }) => {
      document.getElementById('eden-ad-style')?.remove();
      document.getElementById('eden-ad-cover')?.remove();
      document.getElementById('eden-ad-scrim')?.remove();
      document.getElementById('eden-ad-caption')?.remove();

      const style = document.createElement('style');
      style.id = 'eden-ad-style';
      style.textContent = `
        ${fontsCss}
        #eden-ad-cover {
          position: fixed; inset: 0; z-index: 2147483000; pointer-events: none;
          background: radial-gradient(120% 120% at 50% 25%, ${brand.bg2} 0%, ${brand.bg0} 70%);
          opacity: 0; transition: opacity 480ms ease;
        }
        /* A broadcast-style "lower third" scrim behind the caption — the
           real page keeps scrolling underneath, and its content varies
           scene to scene, so the caption needs a guaranteed-dark backdrop
           of its own rather than trusting whatever happens to be behind it. */
        #eden-ad-scrim {
          position: fixed; left: 0; right: 0; bottom: 0; height: 34%; z-index: 2147483001;
          background: linear-gradient(to top, ${brand.bg0} 0%, rgba(8,15,14,.88) 45%, rgba(8,15,14,0) 100%);
          opacity: 0; transition: opacity 550ms ease; pointer-events: none;
        }
        #eden-ad-caption {
          position: fixed; left: 50%; bottom: 7%; transform: translateX(-50%) translateY(14px);
          text-align: center; z-index: 2147483002; pointer-events: none; max-width: 82vw;
          opacity: 0; transition: opacity 550ms ease, transform 550ms ease;
        }
        #eden-ad-caption .kicker {
          display: block; font-family: ${brand.fontBody}; font-size: 17px; font-weight: 600;
          letter-spacing: .28em; text-transform: uppercase; color: ${brand.eden}; margin-bottom: 12px;
          min-height: 17px;
        }
        #eden-ad-caption .line {
          font-family: ${brand.fontDisplay}; font-weight: 800; font-size: 50px; color: ${brand.textHi};
          letter-spacing: -.02em; line-height: 1.1; text-shadow: 0 8px 40px rgba(0,0,0,.65);
        }
      `;
      document.head.appendChild(style);

      const cover = document.createElement('div');
      cover.id = 'eden-ad-cover';
      document.body.appendChild(cover);

      const scrim = document.createElement('div');
      scrim.id = 'eden-ad-scrim';
      document.body.appendChild(scrim);

      const caption = document.createElement('div');
      caption.id = 'eden-ad-caption';
      caption.innerHTML = '<span class="kicker"></span><div class="line"></div>';
      document.body.appendChild(caption);

      const wait = (ms) => new Promise((r) => setTimeout(r, ms));

      window.__edenAd = {
        async coverOn() {
          cover.style.opacity = '1';
          await wait(500);
        },
        async coverOff() {
          cover.style.opacity = '0';
          await wait(500);
        },
        async showCaption(kicker, line) {
          caption.querySelector('.kicker').textContent = kicker || '';
          caption.querySelector('.line').textContent = line || '';
          scrim.style.opacity = '1';
          caption.style.opacity = '1';
          caption.style.transform = 'translateX(-50%) translateY(0)';
          await wait(560);
        },
        async hideCaption() {
          scrim.style.opacity = '0';
          caption.style.opacity = '0';
          caption.style.transform = 'translateX(-50%) translateY(14px)';
          await wait(560);
        },
        scrollToOverTime(targetY, durationMs) {
          return new Promise((resolve) => {
            const startY = window.scrollY;
            const delta = targetY - startY;
            if (Math.abs(delta) < 2 || durationMs <= 0) {
              window.scrollTo(0, targetY);
              resolve();
              return;
            }
            const start = performance.now();
            const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
            function step(now) {
              const t = Math.min(1, (now - start) / durationMs);
              window.scrollTo(0, startY + delta * ease(t));
              if (t < 1) requestAnimationFrame(step);
              else resolve();
            }
            requestAnimationFrame(step);
          });
        },
      };
    },
    { fontsCss: embeddedFontsCss, brand: BRAND }
  );
}

async function waitForImages(page, selector) {
  await page.evaluate((sel) => {
    const root = (sel && document.querySelector(sel)) || document.body;
    const imgs = Array.from(root.querySelectorAll('img'));
    return Promise.race([
      Promise.all(
        imgs.map((img) =>
          img.complete
            ? Promise.resolve()
            : new Promise((res) => {
                img.addEventListener('load', res, { once: true });
                img.addEventListener('error', res, { once: true });
              })
        )
      ),
      new Promise((res) => setTimeout(res, 2500)),
    ]);
  }, selector);
}

async function showIntroCard(page, logoUrl, siteName) {
  await page.evaluate(
    ({ logoUrl, siteName, brand }) => {
      const intro = document.createElement('div');
      intro.id = 'eden-ad-intro';
      intro.style.cssText = `
        position:fixed; inset:0; z-index:2147483002; display:flex; flex-direction:column;
        align-items:center; justify-content:center; text-align:center;
        background:radial-gradient(120% 120% at 50% 20%, ${brand.bg2} 0%, ${brand.bg0} 65%);
        opacity:0; transition:opacity 600ms ease;
      `;
      intro.innerHTML = `
        <img src="${logoUrl}" style="width:96px;height:96px;border-radius:22px;object-fit:cover;box-shadow:0 30px 80px rgba(94,201,87,.18);margin-bottom:34px;">
        <span style="font-family:${brand.fontBody};font-size:17px;font-weight:600;letter-spacing:.32em;text-transform:uppercase;color:${brand.eden};margin-bottom:18px;">${siteName}</span>
        <div style="font-family:${brand.fontDisplay};font-weight:900;font-size:56px;color:${brand.textHi};letter-spacing:-.03em;line-height:1.1;max-width:74vw;">Take a Look Inside <em style="color:${brand.eden};font-style:normal;">Our Church.</em></div>
      `;
      document.body.appendChild(intro);
      requestAnimationFrame(() => {
        intro.style.opacity = '1';
      });
    },
    { logoUrl, siteName, brand: BRAND }
  );
}

async function hideIntroCard(page) {
  await page.evaluate(() => {
    const el = document.getElementById('eden-ad-intro');
    if (el) {
      el.style.opacity = '0';
      setTimeout(() => el.remove(), 650);
    }
  });
  await page.waitForTimeout(650);
}

async function showOutroCard(page, logoUrl, canonicalUrl, qrDataUri) {
  await page.evaluate(
    ({ logoUrl, canonicalUrl, qrDataUri, brand }) => {
      const displayUrl = canonicalUrl.replace(/^https?:\/\//, '').replace(/\/$/, '');
      const outro = document.createElement('div');
      outro.id = 'eden-ad-outro';
      outro.style.cssText = `
        position:fixed; inset:0; z-index:2147483003; display:flex; flex-direction:column;
        align-items:center; justify-content:center; text-align:center;
        opacity:0; transition:opacity 700ms ease;
      `;
      outro.innerHTML = `
        <img src="${logoUrl}" style="width:88px;height:88px;border-radius:20px;object-fit:cover;margin-bottom:30px;">
        <div style="font-family:${brand.fontDisplay};font-weight:900;font-size:48px;color:${brand.textHi};letter-spacing:-.02em;">Ready to Visit <em style="color:${brand.eden};font-style:normal;">Us?</em></div>
        <div style="margin-top:26px;font-family:${brand.fontDisplay};font-weight:700;font-size:32px;color:${brand.eden};letter-spacing:-.01em;padding:14px 34px;border:2px solid ${brand.edenGlow};border-radius:100px;">${displayUrl}</div>
        <img src="${qrDataUri}" style="position:fixed;right:80px;bottom:80px;width:150px;height:150px;background:#fff;border-radius:14px;padding:10px;">
      `;
      document.body.appendChild(outro);
      requestAnimationFrame(() => {
        outro.style.opacity = '1';
      });
    },
    { logoUrl, canonicalUrl, qrDataUri, brand: BRAND }
  );
}

// ────────────────────────────────────────────────────────────────────────
// ANALYSIS PASS — visits the real site and measures what's actually there
// ────────────────────────────────────────────────────────────────────────

async function analyzeHomeSection(page, selector) {
  return page.evaluate((sel) => {
    const el = document.querySelector(sel);
    if (!el) return null;
    const rect = el.getBoundingClientRect();
    const kickerEl = el.querySelector('.section-label, .hero-pre');
    const headingEl = el.querySelector('h1, h2');
    const clean = (s) => (s || '').replace(/\s+/g, ' ').trim();
    return {
      top: Math.round(rect.top + window.scrollY),
      kicker: clean(kickerEl && kickerEl.innerText),
      heading: clean(headingEl && headingEl.innerText),
      textLength: clean(el.innerText).length,
    };
  }, selector);
}

async function analyzeSubpage(page) {
  return page.evaluate(() => {
    const h1 = document.querySelector('h1');
    const kickerEl = document.querySelector('.section-label, .hero-pre');
    const hero = document.querySelector('.page-hero');
    const clean = (s) => (s || '').replace(/\s+/g, ' ').trim();
    const mainEl = document.querySelector('main') || document.body;
    return {
      title: clean(document.title.split('|')[0]),
      heading: clean(h1 && h1.innerText) || clean(document.title.split('|')[0]),
      kicker: clean(kickerEl && kickerEl.innerText),
      heroHeight: hero ? hero.getBoundingClientRect().height : window.innerHeight * 0.7,
      textLength: Math.min(clean(mainEl.innerText).length, 900),
    };
  });
}

// Water-filling proportional allocation: scenes with more real content (by
// visible text length) get more of the 60s budget, but every scene is kept
// within [MIN_SCENE_MS, MAX_SCENE_MS] by freezing any scene that hits a
// bound and re-distributing the remaining budget across the rest — a plain
// "scale everything to hit the total" pass (the previous approach) can
// silently push frozen scenes back below the floor, which is what this
// avoids.
function allocateProportionalDurations(scenes) {
  const n = scenes.length;
  const weights = scenes.map((s) => Math.max(0.8, Math.min(2.4, s.textLength / 220)));
  const durations = new Array(n).fill(0);
  const frozen = new Array(n).fill(false);

  for (let iter = 0; iter < n; iter++) {
    const remainingBudget = CONTENT_BUDGET_MS - durations.reduce((sum, d, i) => sum + (frozen[i] ? d : 0), 0);
    const remainingWeightSum = weights.reduce((sum, w, i) => sum + (frozen[i] ? 0 : w), 0);
    if (remainingWeightSum <= 0) break;

    let changed = false;
    for (let i = 0; i < n; i++) {
      if (frozen[i]) continue;
      const share = remainingBudget * (weights[i] / remainingWeightSum);
      if (share < MIN_SCENE_MS) {
        durations[i] = MIN_SCENE_MS;
        frozen[i] = true;
        changed = true;
      } else if (share > MAX_SCENE_MS) {
        durations[i] = MAX_SCENE_MS;
        frozen[i] = true;
        changed = true;
      } else {
        durations[i] = share;
      }
    }
    if (!changed) break;
  }

  const rounded = durations.map((d) => Math.round(d));
  const drift = CONTENT_BUDGET_MS - rounded.reduce((a, b) => a + b, 0);
  rounded[rounded.length - 1] += drift;
  scenes.forEach((s, i) => {
    s.durationMs = rounded[i];
  });
}

async function analyzeSite(baseUrl, browser, embeddedFontsCss) {
  const context = await browser.newContext({ viewport: VIEWPORT, deviceScaleFactor: DEVICE_SCALE_FACTOR });
  await setupNetworkInterception(context, embeddedFontsCss);
  const page = await context.newPage();
  await page.emulateMedia({ reducedMotion: 'reduce' });

  console.log('\n[analyze] Loading homepage…');
  await page.goto(`${baseUrl}/index.html`, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(300);

  const canonicalUrl = await page.evaluate(
    () =>
      document.querySelector('link[rel="canonical"]')?.href ||
      document.querySelector('meta[property="og:url"]')?.content ||
      location.href
  );
  const siteName = await page.evaluate(() => document.title.split('|')[0].trim());

  const scenes = [];

  for (const section of HOME_SECTIONS) {
    const info = await analyzeHomeSection(page, section.selector);
    if (!info) {
      console.warn(`[analyze] Section not found, skipping: ${section.key} (${section.selector})`);
      continue;
    }
    scenes.push({
      type: 'home-section',
      key: section.key,
      selector: section.selector,
      scrollTarget: Math.max(0, info.top - 40),
      kicker: info.kicker,
      heading: info.heading,
      textLength: info.textLength,
      noCaption: !!section.noCaption,
    });
    console.log(`[analyze] home section "${section.key}" → kicker="${info.kicker}" heading="${info.heading}" (${info.textLength} chars)`);
  }

  for (const sub of SUBPAGES) {
    console.log(`[analyze] Loading ${sub.path}…`);
    await page.goto(`${baseUrl}${sub.path}`, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(250);
    const info = await analyzeSubpage(page);
    const scrollTarget = Math.round(Math.max(0, info.heroHeight - VIEWPORT.height * 0.15));
    scenes.push({
      type: 'subpage',
      key: sub.key,
      path: sub.path,
      scrollTarget,
      kicker: info.kicker,
      heading: info.heading,
      textLength: info.textLength,
    });
    console.log(`[analyze] subpage "${sub.key}" → kicker="${info.kicker}" heading="${info.heading}" (${info.textLength} chars)`);
  }

  await context.close();

  allocateProportionalDurations(scenes);

  return { canonicalUrl, siteName, scenes };
}

// ────────────────────────────────────────────────────────────────────────
// RENDER PASS — the actual timed, recorded run
// ────────────────────────────────────────────────────────────────────────

// Deadline-driven, not sub-duration-composed: page-load time (variable,
// depends on network/disk) and caption fade time (fixed, but blocks the
// event loop while it runs) both eat into a scene's allotment as real wall
// clock passes. Pre-computing a scroll/hold/caption split up front and
// hoping the pieces add up to scene.durationMs drifts — instead we just
// keep checking "how much time is left until this scene's deadline?" and
// wait exactly that long, so the actual recorded time tracks the planned
// duration regardless of how any individual step performed.
async function runScene(page, baseUrl, scene, embeddedFontsCss) {
  const sceneDeadline = Date.now() + scene.durationMs;

  if (scene.type === 'subpage') {
    await page.evaluate(() => window.__edenAd.coverOn());
    await page.goto(`${baseUrl}${scene.path}`, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await injectOverlay(page, embeddedFontsCss);
    await waitForImages(page, '.page-hero');
    await page.evaluate(() => window.__edenAd.coverOff());
  } else {
    await waitForImages(page, scene.selector);
  }

  const timeLeft = (reserveMs) => Math.max(0, sceneDeadline - reserveMs - Date.now());

  if (scene.noCaption) {
    // No caption/scrim for this scene (its real on-page copy already does
    // the job) — just a slow reveal scroll held for the full duration.
    const scrollDurationMs = Math.min(1500, Math.max(600, timeLeft(0) * 0.5));
    await page.evaluate(
      ({ y, d }) => window.__edenAd.scrollToOverTime(y, d),
      { y: scene.scrollTarget, d: scrollDurationMs }
    );
    await page.waitForTimeout(timeLeft(0));
    return;
  }

  // Reserve time for the two caption transitions (~560ms each, blocking)
  // and a short trailing gap before the scene ends.
  const scrollDurationMs = Math.min(1500, Math.max(600, timeLeft(1400) * 0.4));

  const scrollPromise = page.evaluate(
    ({ y, d }) => window.__edenAd.scrollToOverTime(y, d),
    { y: scene.scrollTarget, d: scrollDurationMs }
  );
  await page.waitForTimeout(Math.min(400, scrollDurationMs));
  await page.evaluate(({ k, l }) => window.__edenAd.showCaption(k, l), { k: scene.kicker, l: scene.heading });
  await scrollPromise;

  await page.waitForTimeout(timeLeft(760)); // hold, minus what hideCaption + tail still need
  await page.evaluate(() => window.__edenAd.hideCaption());
  await page.waitForTimeout(timeLeft(0));
}

async function renderVideo(baseUrl, scenes, canonicalUrl, siteName, embeddedFontsCss, browser) {
  fs.rmSync(RAW_VIDEO_DIR, { recursive: true, force: true });
  fs.mkdirSync(RAW_VIDEO_DIR, { recursive: true });

  const context = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: DEVICE_SCALE_FACTOR,
    recordVideo: { dir: RAW_VIDEO_DIR, size: VIDEO_SIZE },
  });
  await setupNetworkInterception(context, embeddedFontsCss);
  const page = await context.newPage();
  await page.emulateMedia({ reducedMotion: 'reduce' });

  console.log('\n[render] Loading homepage…');
  await page.goto(`${baseUrl}/index.html`, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await injectOverlay(page, embeddedFontsCss);
  await waitForImages(page, 'section.hero');

  const logoUrl = `${baseUrl}/assets/logo.jpg`;
  console.log('[render] Intro card…');
  const INTRO_FADE_OUT_MS = 650; // matches hideIntroCard's own transition wait
  await showIntroCard(page, logoUrl, siteName);
  await page.waitForTimeout(Math.max(500, INTRO_DURATION_MS - INTRO_FADE_OUT_MS));
  await hideIntroCard(page);

  for (const scene of scenes) {
    console.log(`[render] Scene "${scene.key}" — ${(scene.durationMs / 1000).toFixed(1)}s`);
    await runScene(page, baseUrl, scene, embeddedFontsCss);
  }

  console.log('[render] Outro card…');
  await page.evaluate(() => window.__edenAd.coverOn());
  const qrDataUri = await QRCode.toDataURL(canonicalUrl, {
    margin: 1,
    width: 400,
    color: { dark: '#0d1917', light: '#ffffff' },
  });
  await showOutroCard(page, logoUrl, canonicalUrl, qrDataUri);
  await page.waitForTimeout(OUTRO_DURATION_MS);

  const video = page.video();
  await context.close();
  return video.path();
}

// ────────────────────────────────────────────────────────────────────────
// ENCODE
// ────────────────────────────────────────────────────────────────────────

async function convertToMp4(rawDir, outputFile) {
  const files = fs.readdirSync(rawDir).filter((f) => f.endsWith('.webm'));
  if (!files.length) throw new Error('No recorded video found in ' + rawDir);
  const inputFile = path.join(rawDir, files[0]);
  fs.mkdirSync(path.dirname(outputFile), { recursive: true });

  console.log(
    `\n[encode] Upscaling 1080p capture to ${OUTPUT_RESOLUTION.width}x${OUTPUT_RESOLUTION.height} H.264 MP4 (this can take a couple of minutes)…`
  );
  await new Promise((resolve, reject) => {
    execFile(
      ffmpegPath,
      [
        '-y',
        '-i', inputFile,
        '-vf', `scale=${OUTPUT_RESOLUTION.width}:${OUTPUT_RESOLUTION.height}:flags=lanczos`,
        '-c:v', 'libx264',
        '-pix_fmt', 'yuv420p',
        '-profile:v', 'high',
        '-crf', '16',
        '-preset', 'medium',
        '-r', String(FPS),
        '-movflags', '+faststart',
        outputFile,
      ],
      (err, _stdout, stderr) => {
        if (err) {
          reject(new Error(stderr || err.message));
          return;
        }
        resolve();
      }
    );
  });
}

// ────────────────────────────────────────────────────────────────────────
// MAIN
// ────────────────────────────────────────────────────────────────────────

async function main() {
  console.log('Eden Life — 60-second ad generator');
  console.log('='.repeat(64));

  console.log(`[server] Starting static file server for ${SITE_ROOT}…`);
  const { server, port, baseUrl } = await startStaticServer(SITE_ROOT);
  console.log(`[server] Serving on ${baseUrl} (auto-selected free port ${port})`);

  const browser = await chromium.launch();

  try {
    console.log('[fonts] Preparing self-hosted Montserrat/Poppins (embedded — no external requests during capture)…');
    const embeddedFontsCss = await getEmbeddedFontsCss();

    const { canonicalUrl, siteName, scenes } = await analyzeSite(baseUrl, browser, embeddedFontsCss);

    console.log('\n' + '='.repeat(64));
    console.log('SCENES SELECTED FOR THE 60-SECOND AD');
    console.log('='.repeat(64));
    console.log(`Intro card${' '.repeat(30)}${(INTRO_DURATION_MS / 1000).toFixed(1)}s`);
    scenes.forEach((s, i) => {
      const label = `${i + 1}. [${s.type}] ${s.key}`;
      console.log(`${label.padEnd(40)}${(s.durationMs / 1000).toFixed(1)}s   "${s.heading}"`);
    });
    console.log(`Outro card (CTA + QR)${' '.repeat(19)}${(OUTRO_DURATION_MS / 1000).toFixed(1)}s`);
    const total = INTRO_DURATION_MS + scenes.reduce((a, s) => a + s.durationMs, 0) + OUTRO_DURATION_MS;
    console.log('-'.repeat(64));
    console.log(`TOTAL${' '.repeat(35)}${(total / 1000).toFixed(1)}s`);
    console.log('='.repeat(64) + '\n');

    const rawVideoPath = await renderVideo(baseUrl, scenes, canonicalUrl, siteName, embeddedFontsCss, browser);
    console.log(`[render] Raw capture complete: ${rawVideoPath}`);

    await convertToMp4(RAW_VIDEO_DIR, OUTPUT_FILE);
    fs.rmSync(RAW_VIDEO_DIR, { recursive: true, force: true });

    console.log(`\n✔ Done. Video saved to: ${OUTPUT_FILE}`);
  } finally {
    await browser.close();
    server.close();
  }
}

main().catch((err) => {
  console.error('\n[FATAL]', err);
  process.exitCode = 1;
});
