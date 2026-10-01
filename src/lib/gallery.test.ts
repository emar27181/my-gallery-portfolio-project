import { existsSync, readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { images } from '../data/image';
import {
  DEFAULT_SORT,
  SORT_OPTIONS,
  isSortKey,
  matchesAllTags,
  sortItems,
  tagsByUsage,
  filterTagsByUsage,
  HIDDEN_FILTER_TAGS,
  type SortableItem,
} from './gallery';

const items: SortableItem[] = [
  { index: 0, title: 'Banana', date: '2024-01-02', tags: ['写真'] },
  { index: 1, title: 'Apple', date: '2024-03-01', tags: ['イラスト', '猫'] },
  { index: 2, title: 'Cherry', date: '2023-12-31', tags: ['イラスト'] },
];

const titles = (list: SortableItem[]) => list.map((item) => item.title);

describe('sortItems', () => {
  it('カスタム順はデータの並び順', () => {
    expect(titles(sortItems([...items].reverse(), 'custom'))).toEqual(['Banana', 'Apple', 'Cherry']);
  });

  it('日付順', () => {
    expect(titles(sortItems(items, 'date-desc'))).toEqual(['Apple', 'Banana', 'Cherry']);
    expect(titles(sortItems(items, 'date-asc'))).toEqual(['Cherry', 'Banana', 'Apple']);
  });

  it('タイトル順', () => {
    expect(titles(sortItems(items, 'title-asc'))).toEqual(['Apple', 'Banana', 'Cherry']);
    expect(titles(sortItems(items, 'title-desc'))).toEqual(['Cherry', 'Banana', 'Apple']);
  });

  it('カテゴリ順は先頭タグで分け、同カテゴリ内は新しい順', () => {
    expect(titles(sortItems(items, 'category'))).toEqual(['Apple', 'Cherry', 'Banana']);
  });

  it('元の配列を変更しない', () => {
    const copy = [...items];
    sortItems(items, 'title-desc');
    expect(items).toEqual(copy);
  });
});

describe('matchesAllTags', () => {
  it('未選択なら全件一致', () => {
    expect(matchesAllTags(['猫'], [])).toBe(true);
  });

  it('選択タグをすべて持つときだけ一致（AND）', () => {
    expect(matchesAllTags(['猫', 'イラスト'], ['猫', 'イラスト'])).toBe(true);
    expect(matchesAllTags(['猫', '写真'], ['猫', 'イラスト'])).toBe(false);
  });
});

describe('tagsByUsage', () => {
  it('使用数の多い順、同数は初出順', () => {
    expect(tagsByUsage(items)).toEqual(['イラスト', '写真', '猫']);
  });

  it('詳細メタデータタグはフィルター候補に出さない', () => {
    const withMetadata = [
      ...items,
      { index: 3, title: 'Clip', date: '2026-10-01', tags: ['動画', 'VALORANT', 'ascent', 'clove', 'vandal'] },
    ];
    expect(filterTagsByUsage(withMetadata)).toContain('VALORANT');
    expect(filterTagsByUsage(withMetadata)).toContain('動画');
    for (const tag of ['ascent', 'clove', 'vandal']) {
      expect(HIDDEN_FILTER_TAGS.has(tag as never)).toBe(true);
      expect(filterTagsByUsage(withMetadata)).not.toContain(tag);
    }
  });
});

describe('並び替えの選択肢', () => {
  it('既定値は選択肢に含まれる', () => {
    expect(isSortKey(DEFAULT_SORT)).toBe(true);
    expect(isSortKey('unknown')).toBe(false);
  });

  it('表示ラベルを固定する（CLAUDE.md「日本語ローカライゼーション」）', () => {
    expect(SORT_OPTIONS.map((option) => option.label)).toEqual([
      'カスタム順',
      '日付 (新しい順)',
      '日付 (古い順)',
      'タイトル (あ-ん)',
      'タイトル (ん-あ)',
      'カテゴリ',
    ]);
  });
});

describe('作品データ', () => {
  it('評価下位50%の取り込みVALORANT動画は非表示で保持する', () => {
    const hiddenIds = new Set(["oe8jBlS6ojk","0oLw64DxEww","1eNG96G7AEE","46a0f7dNVW4","471RvqnX2b0","5vqrKEoRYUI","7w6fo0I36LI","89-XDPmumUE","8fKkBfd_St0","Bx_StGqEbps","EWMlL4fZrDA","G0v9xTi48Gs","HiuCIyQBTuA","O52Jtotu4i8","bT70Au5LD6I","fJZP_eAKJvo","ooJdHWZ3KyU","qPOMfYDTVBg","u5yhldgN1i4","vU79pWsoA-I","wnhM3KOPWHM","it45ShfTm4M"]);
    for (const work of images) {
      if (work.type === 'video' && hiddenIds.has(work.videoId)) {
        expect(work.visible, work.videoId).toBe(false);
      }
    }
  });

  it('表示OFFの作品は visible: false で保持できる', () => {
    const hiddenTitles = images.filter((work) => work.visible === false).map((work) => work.title);
    expect(hiddenTitles).toEqual(expect.arrayContaining(['Way Point Map', 'VALORANT Point Viewer', 'Card Pocket（デモ）', '色相・トーン推薦アプリ']));
  });

  it('日付は YYYY-MM-DD で解釈できる', () => {
    for (const work of images) {
      expect(work.date, work.title).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(Number.isNaN(Date.parse(work.date)), work.title).toBe(false);
    }
  });

  it('タグが1つ以上ある（先頭タグをカテゴリとして使う）', () => {
    for (const work of images) {
      expect(work.tags.length, work.title).toBeGreaterThan(0);
    }
  });

  it('動画には videoId がある', () => {
    for (const work of images) {
      if (work.type === 'video') expect(work.videoId, work.title).toBeTruthy();
    }
  });

  it('画像は src/assets/gallery/ に実在する', () => {
    for (const work of images) {
      if (work.type === 'image') expect(existsSync(`src/assets/gallery/${work.src}`), work.src).toBe(true);
    }
  });

  it('Web サイトの画面写真（poster）は src/assets/sites/ に実在する', () => {
    for (const work of images) {
      if (work.type === 'site' && work.poster) expect(existsSync(`src/assets/sites/${work.poster}`), work.poster).toBe(true);
    }
  });

  it('使っているタグは docs/DATA-EDITING.md のタグ一覧に載っている（AI に渡すマニュアルを古くしない）', () => {
    const manual = readFileSync('docs/DATA-EDITING.md', 'utf8');
    const section = manual.slice(manual.indexOf('## 4. タグ'), manual.indexOf('## 5.'));
    const documented = new Set([...section.matchAll(/^\|\s*`([^`]+)`\s*\|/gm)].map((m) => m[1]));
    const missing = [...new Set(images.flatMap((work) => work.tags))].filter((tag) => !documented.has(tag));
    expect(missing).toEqual([]);
  });

  it('Web サイトの URL は https で、重複しない', () => {
    const urls = images.flatMap((work) => (work.type === 'site' ? [work.url] : []));
    for (const url of urls) expect(new URL(url).protocol, url).toBe('https:');
    expect(new Set(urls).size).toBe(urls.length);
  });
});
