import { expect, test, type Page } from '@playwright/test';
import { images } from '../src/data/image';
import { SORT_OPTIONS, matchesAllTags, sortItems } from '../src/lib/gallery';

const data = images.map((image, index) => ({ ...image, index }));

// 外部（YouTube サムネイル）への通信に結果を左右されないよう、ローカル画像で代替する
// 埋め込む Web サイトも、押すと文言が変わるボタンだけの HTML で代替する
const SITE_STUB = `<!doctype html><meta charset="utf-8"><button id="b" onclick="this.textContent='押された'">押す</button>`;

test.beforeEach(async ({ page }) => {
  await page.route(/img\.youtube\.com/, (route) => route.fulfill({ path: 'src/assets/gallery/image_photo_sky1.jpg' }));
  for (const work of images) {
    if (work.type === 'site') {
      await page.route(work.url, (route) => route.fulfill({ contentType: 'text/html; charset=utf-8', body: SITE_STUB }));
    }
  }
});

const SHOWN = '.gallery-item:not([hidden])';

async function openGallery(page: Page) {
  await page.goto('/');
  await expect(page.locator('#loading-screen')).toBeHidden({ timeout: 10_000 });
}

/** 表示中アイテムの位置 */
async function shownRects(page: Page) {
  return page.locator(SHOWN).evaluateAll((items) =>
    items.map((el) => {
      const { left, top, right, bottom } = el.getBoundingClientRect();
      const e = el as HTMLElement;
      return { title: e.dataset.title!, span: Number(e.dataset.span), left, top, right, bottom };
    }),
  );
}

/**
 * 期待どおりの順に「最短列へ詰めた」配置になっているか。
 * 1列幅のアイテムは詰めた順に上端が下がっていくので、読み順（上→下、左→右）が期待順と一致する。
 * 複数列にまたがる動画は揃う位置まで下がることがあるため、全件が表示されていることだけを見る
 */
async function expectPlacedInOrder(page: Page, expected: typeof data) {
  const rects = await shownRects(page);
  expect(rects.map((r) => r.title).sort()).toEqual(expected.map((item) => item.title).sort());

  const readingOrder = rects
    .filter((r) => r.span === 1)
    .sort((a, b) => a.top - b.top || a.left - b.left)
    .map((r) => r.title);
  const single = new Set(rects.filter((r) => r.span === 1).map((r) => r.title));
  expect(readingOrder).toEqual(expected.filter((item) => single.has(item.title)).map((item) => item.title));
}

async function selectTag(page: Page, tag: string) {
  if (!(await page.locator('#filter-dropdown').isVisible())) await page.locator('#filter-tags').click();
  await page.locator(`.filter-option[data-value="${tag}"]`).click();
}

test('初期表示はカスタム順で全件', async ({ page }) => {
  await openGallery(page);
  await expectPlacedInOrder(page, data);
});

for (const { value, label } of SORT_OPTIONS) {
  test(`並び替え「${label}」の順に表示される`, async ({ page }) => {
    await openGallery(page);
    await page.selectOption('#sort-select', value);
    await expectPlacedInOrder(page, sortItems(data, value));
  });
}

test('タグは AND で絞り込み、「全て」で全件に戻る', async ({ page }) => {
  await openGallery(page);
  const selected = ['猫', 'イラスト'];
  for (const tag of selected) await selectTag(page, tag);

  const expected = data.filter((item) => matchesAllTags(item.tags, selected));
  expect(expected.length).toBeGreaterThan(0);
  await expectPlacedInOrder(page, expected);
  await expect(page.locator('.selected-tag')).toHaveCount(2);

  await page.locator('.filter-option[data-value=""]').click();
  await expect(page.locator(SHOWN)).toHaveCount(data.length);
  await expect(page.locator('.selected-tag')).toHaveCount(0);
});

test('並び替え後に絞り込み・解除しても並び順が保たれる', async ({ page }) => {
  await openGallery(page);
  await page.selectOption('#sort-select', 'title-asc');
  await selectTag(page, '写真');
  await page.locator('.remove-tag').click();
  await expectPlacedInOrder(page, sortItems(data, 'title-asc'));
});

test('ドロップダウンは外側クリックで閉じる', async ({ page }) => {
  await openGallery(page);
  await page.locator('#filter-tags').click();
  await expect(page.locator('#filter-dropdown')).toBeVisible();
  await page.locator('.sort-label').click();
  await expect(page.locator('#filter-dropdown')).toBeHidden();
});

test('画像クリックでモーダル表示、×と Escape で閉じる', async ({ page }) => {
  await openGallery(page);
  const first = data.find((item) => item.type === 'image')!;
  const modal = page.locator('#image-modal');

  await page.locator(`.gallery-item[data-index="${first.index}"] img`).click();
  await expect(modal).toHaveClass(/open/);
  // 一覧の縮小版ではなく、モーダル用の大きい画像を表示する
  const full = await page.locator(`.gallery-item[data-index="${first.index}"] img`).getAttribute('data-full');
  expect(full).toMatch(/\.webp$/);
  await expect(page.locator('#image-modal-img')).toHaveAttribute('src', full!);
  await page.locator('#image-modal-close').click();
  await expect(modal).not.toHaveClass(/open/);

  await page.locator(`.gallery-item[data-index="${first.index}"] img`).click();
  await page.keyboard.press('Escape');
  await expect(modal).not.toHaveClass(/open/);
});

test('動画クリックでその場に YouTube プレイヤーを埋め込む', async ({ page }) => {
  await openGallery(page);
  const video = data.find((item) => item.type === 'video')!;
  const item = page.locator(`.gallery-item[data-index="${video.index}"]`);

  await item.locator('.video-thumbnail').click();
  await expect(item.locator('iframe')).toBeVisible();
  await expect(item.locator('iframe')).toHaveAttribute('src', new RegExp(`youtube\\.com/embed/${video.videoId}`));
  await expect(item.locator('.video-thumbnail')).toBeHidden();
});

test('テーマ切り替えは保存され、再読み込み後も維持される', async ({ page }) => {
  await openGallery(page);
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await page.locator('#navbar-theme-toggle').click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await openGallery(page);
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
});

test('詰めて配置: 重なりがなく、各アイテムの上に余計な隙間がない', async ({ page }) => {
  await openGallery(page);
  const rects = await shownRects(page);
  const gap = await page.locator('#gallery').evaluate((el) => parseFloat(getComputedStyle(el).getPropertyValue('--gallery-gap')));
  const overlaps = (a: (typeof rects)[number], b: (typeof rects)[number]) =>
    a.left < b.right - 1 && b.left < a.right - 1 && a.top < b.bottom - 1 && b.top < a.bottom - 1;

  const gridTop = Math.min(...rects.map((r) => r.top));
  for (const [i, a] of rects.entries()) {
    for (const b of rects.slice(i + 1)) expect(overlaps(a, b), `${a.title} と ${b.title}`).toBe(false);
    // 最上段でなければ、真上のどれかのアイテムの下端 + 間隔にぴったり接している
    if (a.top - gridTop > 1) {
      const above = rects.filter((b) => b.left < a.right - 1 && a.left < b.right - 1 && b.bottom <= a.top + 1);
      const nearest = Math.max(...above.map((b) => b.bottom));
      expect(a.top - nearest, a.title).toBeCloseTo(gap, 0);
    }
  }
});

test('ローディング画面が閉じた時点で、画面内の画像はすべて読み込み済み', async ({ page }) => {
  await page.goto('/');
  // 最大待ち時間（index.astro の MAX_LOADING_TIME = 6000ms）で閉じたのでは意味がない
  await expect(page.locator('#loading-screen')).toBeHidden({ timeout: 4_000 });

  const inView = await page.evaluate(() =>
    [...document.querySelectorAll<HTMLImageElement>('.gallery-item:not([hidden]) img')]
      .filter((img) => {
        const r = img.closest('.gallery-item')!.getBoundingClientRect();
        return r.top < innerHeight && r.bottom > 0;
      })
      .map((img) => ({ src: img.currentSrc, loaded: img.complete && img.naturalWidth > 0 && img.classList.contains('is-loaded') })),
  );
  expect(inView.length).toBeGreaterThan(0);
  expect(inView.filter((img) => !img.loaded)).toEqual([]);
});

test('Web サイトは大きな枠に埋め込まれ、クリックするとその場で操作できる', async ({ page }) => {
  const site = data.find((item) => item.type === 'site');
  test.skip(!site, 'Web サイトの作品が無い');
  if (site?.type !== 'site') return;

  await openGallery(page);
  const item = page.locator(`.gallery-item[data-index="${site.index}"]`);
  const frame = item.locator('iframe.site-frame');
  await expect(frame).toHaveAttribute('src', site.url);
  await expect(item.locator('.site-open')).toHaveAttribute('href', site.url);
  await expect(item.locator('.site-open')).toHaveAttribute('target', '_blank');

  // 1列ぶんより大きく取る（モバイル 2 列では全幅）
  const [itemWidth, gridWidth, columns] = await item.evaluate((el) => {
    const grid = el.parentElement!;
    return [
      el.getBoundingClientRect().width,
      grid.clientWidth,
      parseFloat(getComputedStyle(grid).getPropertyValue('--gallery-columns')),
    ];
  });
  expect(itemWidth).toBeGreaterThan(gridWidth / columns);

  // 操作前はサイトにクリックが届かない
  await expect(frame).toHaveCSS('pointer-events', 'none');
  await item.locator('.site-activate').click();
  await expect(item).toHaveClass(/is-active/);
  await expect(frame).toHaveCSS('pointer-events', 'auto');

  const button = page.frameLocator(`.gallery-item[data-index="${site.index}"] iframe`).locator('#b');
  await button.click();
  await expect(button).toHaveText('押された');

  // サイト内を操作した後でも「操作を終える」で抜けられる（Escape はサイト側に届くため）
  await item.locator('.site-deactivate').click();
  await expect(item).not.toHaveClass(/is-active/);
  await expect(frame).toHaveCSS('pointer-events', 'none');

  // 外側のクリックでも終える
  await item.locator('.site-activate').click();
  await expect(item).toHaveClass(/is-active/);
  await page.locator('.sort-label').click();
  await expect(item).not.toHaveClass(/is-active/);
});
