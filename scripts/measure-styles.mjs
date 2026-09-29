// 実描画の computed style を集計し、画面に実在する値の種類と件数を出す（DESIGN.md「検証」）。
// 使い方: npm run build && npm run preview  （別端末で）  →  npm run measure:styles -- <ラベル>
// 結果は reports/styles-<ラベル>.json に保存する（コミットしない）。外部サイト・YouTube はスタブに差し替える。

import { mkdirSync, writeFileSync } from 'node:fs';
import { chromium } from '@playwright/test';

const label = process.argv[2] ?? 'current';
const baseURL = process.env.BASE_URL ?? 'http://localhost:4321/';
const viewports = [
  { name: 'desktop', width: 1280, height: 900 },
  { name: 'mobile', width: 390, height: 844 },
];

const browser = await chromium.launch();
const report = {};

for (const theme of ['light', 'dark']) {
  for (const vp of viewports) {
    const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
    await page.addInitScript((t) => localStorage.setItem('theme', t), theme);
    await page.route(/img\.youtube\.com/, (r) => r.fulfill({ path: 'src/assets/gallery/image_photo_sky1.jpg' }));
    await page.route(/netlify\.app/, (r) =>
      r.fulfill({ contentType: 'text/html; charset=utf-8', body: '<!doctype html><meta charset="utf-8"><p>stub</p>' }),
    );
    await page.goto(baseURL);
    await page.waitForFunction(() => getComputedStyle(document.getElementById('loading-screen')).display === 'none');
    // ドロップダウン・メニューも開いた状態で数える
    await page.locator('[data-multiselect-box]').click();

    report[`${theme}-${vp.name}`] = await page.evaluate(() => {
      const count = (map, key) => map.set(key, (map.get(key) ?? 0) + 1);
      const toObj = (map) => Object.fromEntries([...map].sort((a, b) => b[1] - a[1]));
      const fontSize = new Map();
      const radius = new Map();
      const padding = new Map();
      const color = new Map();
      const background = new Map();
      const controlHeight = new Map();
      const visible = (el) => {
        const r = el.getBoundingClientRect();
        const cs = getComputedStyle(el);
        return r.width > 0 && r.height > 0 && cs.visibility !== 'hidden' && cs.display !== 'none';
      };
      for (const el of document.querySelectorAll('body *')) {
        if (!visible(el)) continue;
        const cs = getComputedStyle(el);
        const hasText = [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
        if (hasText) {
          count(fontSize, cs.fontSize);
          count(color, cs.color);
        }
        if (cs.borderTopLeftRadius !== '0px') count(radius, cs.borderTopLeftRadius);
        if (cs.padding !== '0px') count(padding, cs.padding);
        if (cs.backgroundColor !== 'rgba(0, 0, 0, 0)') count(background, cs.backgroundColor);
        if (el.matches('button:not([data-embed-activate]):not([data-video-play]):not([data-lightbox-trigger]), select, input, a[class]')) {
          count(controlHeight, `${Math.round(el.getBoundingClientRect().height)}px ${el.tagName.toLowerCase()}.${el.className.split(' ')[0]}`);
        }
      }
      return {
        fontSize: toObj(fontSize),
        borderRadius: toObj(radius),
        padding: toObj(padding),
        textColor: toObj(color),
        backgroundColor: toObj(background),
        controlHeight: toObj(controlHeight),
      };
    });
    await page.close();
  }
}
await browser.close();

mkdirSync('reports', { recursive: true });
const out = `reports/styles-${label}.json`;
writeFileSync(out, JSON.stringify(report, null, 2));
const d = report['light-desktop'];
console.log(`saved ${out}`);
console.log('font-size', d.fontSize);
console.log('border-radius', d.borderRadius);
console.log('control height', d.controlHeight);
console.log('text colors', Object.keys(d.textColor).length, 'background colors', Object.keys(d.backgroundColor).length);
